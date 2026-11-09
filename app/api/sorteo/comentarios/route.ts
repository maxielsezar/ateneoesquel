const API_BASE = "https://graph.instagram.com/v25.0/";
const INSTAGRAM_HOSTS = new Set([
  "instagram.com",
  "www.instagram.com",
  "m.instagram.com",
]);

type GraphPage<T> = {
  data?: T[];
  paging?: {
    cursors?: { after?: string };
    next?: string;
  };
  error?: { message?: string };
};

type InstagramMedia = {
  id: string;
  permalink: string;
};

type InstagramComment = {
  id: string;
  text?: string;
  username?: string;
  timestamp?: string;
  hidden?: boolean;
  replies?: GraphPage<InstagramComment>;
};

type GiveawayComment = {
  id: string;
  username: string | null;
  text: string;
};

class InstagramApiError extends Error {}

function parsePostUrl(value: unknown) {
  if (typeof value !== "string" || value.length > 2048) return null;

  try {
    const url = new URL(value);
    const match = url.pathname.match(/^\/(p|reel|tv)\/([^/]+)\/?$/);
    if (
      url.protocol !== "https:" ||
      !INSTAGRAM_HOSTS.has(url.hostname) ||
      !match
    ) {
      return null;
    }

    return {
      path: `/${match[1]}/${match[2]}/`,
      permalink: `https://www.instagram.com/${match[1]}/${match[2]}/`,
    };
  } catch {
    return null;
  }
}

function matchesPost(permalink: string, postPath: string) {
  try {
    const url = new URL(permalink);
    return (
      INSTAGRAM_HOSTS.has(url.hostname) &&
      url.pathname.replace(/\/?$/, "/") === postPath
    );
  } catch {
    return false;
  }
}

function nextCursor<T>(page: GraphPage<T>) {
  if (!page.paging?.next) return null;
  if (page.paging.cursors?.after) return page.paging.cursors.after;

  try {
    return new URL(page.paging.next).searchParams.get("after");
  } catch {
    return null;
  }
}

async function graphRequest<T>(
  path: string,
  params: URLSearchParams,
  accessToken: string,
) {
  const url = new URL(path, API_BASE);
  params.set("access_token", accessToken);
  url.search = params.toString();

  const response = await fetch(url, { cache: "no-store" });
  const result = (await response.json()) as GraphPage<T>;
  if (!response.ok || result.error) {
    throw new InstagramApiError(
      result.error?.message ||
        "Instagram rechazó la solicitud. Revisá los permisos de la cuenta conectada.",
    );
  }
  return result;
}

async function findMediaId(
  accountId: string,
  postPath: string,
  accessToken: string,
) {
  let after: string | null = null;
  const seenCursors = new Set<string>();

  while (true) {
    const params = new URLSearchParams({ fields: "id,permalink", limit: "100" });
    if (after) params.set("after", after);

    const page = await graphRequest<InstagramMedia>(
      `${encodeURIComponent(accountId)}/media`,
      params,
      accessToken,
    );
    const media = page.data?.find((item) => matchesPost(item.permalink, postPath));
    if (media) return media.id;

    after = nextCursor(page);
    if (!after || seenCursors.has(after)) return null;
    seenCursors.add(after);
  }
}

function addComment(target: GiveawayComment[], comment: InstagramComment) {
  const text = comment.text?.trim();
  if (!text || comment.hidden) return;

  target.push({
    id: comment.id,
    username: comment.username || null,
    text,
  });
}

async function getComments(mediaId: string, accessToken: string) {
  const comments: GiveawayComment[] = [];
  const commentFields =
    "id,text,username,timestamp,hidden,replies.limit(50){id,text,username,timestamp,hidden}";
  const replyFields = "id,text,username,timestamp,hidden";
  const seenCommentCursors = new Set<string>();
  let page = await graphRequest<InstagramComment>(
    `${encodeURIComponent(mediaId)}/comments`,
    new URLSearchParams({ fields: commentFields, limit: "50" }),
    accessToken,
  );

  while (true) {
    for (const comment of page.data ?? []) {
      addComment(comments, comment);

      let replies = comment.replies;
      const seenReplyCursors = new Set<string>();
      while (replies) {
        for (const reply of replies.data ?? []) addComment(comments, reply);

        const after = nextCursor(replies);
        if (!after || seenReplyCursors.has(after)) break;
        seenReplyCursors.add(after);
        replies = await graphRequest<InstagramComment>(
          `${encodeURIComponent(comment.id)}/replies`,
          new URLSearchParams({ fields: replyFields, limit: "50", after }),
          accessToken,
        );
      }
    }

    const after = nextCursor(page);
    if (!after || seenCommentCursors.has(after)) return comments;
    seenCommentCursors.add(after);
    page = await graphRequest<InstagramComment>(
      `${encodeURIComponent(mediaId)}/comments`,
      new URLSearchParams({ fields: commentFields, limit: "50", after }),
      accessToken,
    );
  }
}

export async function POST(request: Request) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_USER_ID;
  if (!accessToken || !accountId) {
    return Response.json(
      { error: "Falta configurar INSTAGRAM_USER_ID e INSTAGRAM_ACCESS_TOKEN en el servidor." },
      { status: 503 },
    );
  }
  if (!/^\d+$/.test(accountId)) {
    return Response.json({ error: "INSTAGRAM_USER_ID no es válido." }, { status: 503 });
  }

  let body: { permalink?: unknown };
  try {
    body = (await request.json()) as { permalink?: unknown };
  } catch {
    return Response.json({ error: "La solicitud no contiene un enlace válido." }, { status: 400 });
  }

  const post = parsePostUrl(body.permalink);
  if (!post) {
    return Response.json(
      { error: "Ingresá un enlace válido a una publicación, reel o video de Instagram." },
      { status: 400 },
    );
  }

  try {
    const mediaId = await findMediaId(accountId, post.path, accessToken);
    if (!mediaId) {
      return Response.json(
        { error: "No encontramos ese post entre las publicaciones accesibles de la cuenta conectada." },
        { status: 404 },
      );
    }

    const comments = await getComments(mediaId, accessToken);
    return Response.json(
      { data: comments, total: comments.length, permalink: post.permalink },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof InstagramApiError
            ? error.message
            : "No se pudo conectar con Instagram. Volvé a intentar en unos minutos.",
      },
      { status: 502 },
    );
  }
}