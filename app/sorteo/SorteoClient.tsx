"use client";

import {
  ArrowLeft,
  Check,
  Download,
  ExternalLink,
  Link2,
  LoaderCircle,
  RotateCcw,
  Shuffle,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { useMemo, useState } from "react";

type CommentEntry = {
  id: string;
  username: string | null;
  text: string;
};

function isInstagramPost(value: string) {
  try {
    const url = new URL(value);
    return (
      ["instagram.com", "www.instagram.com"].includes(url.hostname) &&
      /^\/(p|reel|tv)\/[^/]+/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

function randomIndex(maxExclusive: number) {
  const range = 0x1_0000_0000;
  const limit = range - (range % maxExclusive);
  const value = new Uint32Array(1);
  do {
    crypto.getRandomValues(value);
  } while (value[0] >= limit);
  return value[0] % maxExclusive;
}

function pickWinners(entries: CommentEntry[], count: number) {
  const pool = [...entries];
  for (let index = 0; index < count; index += 1) {
    const winnerIndex = index + randomIndex(pool.length - index);
    [pool[index], pool[winnerIndex]] = [pool[winnerIndex], pool[index]];
  }
  return pool.slice(0, count);
}

export default function SorteoClient() {
  const [postUrl, setPostUrl] = useState("");
  const [comments, setComments] = useState<CommentEntry[]>([]);
  const [loadedPostUrl, setLoadedPostUrl] = useState("");
  const [oneChancePerPerson, setOneChancePerPerson] = useState(false);
  const [winners, setWinners] = useState<CommentEntry[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const eligibleComments = useMemo(() => {
    if (!oneChancePerPerson) return comments;
    const seenUsers = new Set<string>();
    return comments.filter((comment) => {
      if (!comment.username) return true;
      const username = comment.username.toLowerCase();
      if (seenUsers.has(username)) return false;
      seenUsers.add(username);
      return true;
    });
  }, [comments, oneChancePerPerson]);

  function runDraw() {
    setError("");
    setWinners([]);

    if (!isInstagramPost(postUrl.trim())) {
      setError("Ingresá un enlace válido a una publicación, reel o video de Instagram.");
      return;
    }
    if (loadedPostUrl !== postUrl.trim()) {
      setError("Primero cargá los comentarios de esta publicación.");
      return;
    }
    if (eligibleComments.length < 5) {
      setError(`Se necesitan al menos 5 comentarios elegibles. Hay ${eligibleComments.length}.`);
      return;
    }

    setWinners(pickWinners(eligibleComments, 5));
  }

  function resetDraw() {
    setWinners([]);
    setError("");
  }

  async function loadComments() {
    resetDraw();
    setComments([]);
    setLoadedPostUrl("");

    const permalink = postUrl.trim();
    if (!isInstagramPost(permalink)) {
      setError("Ingresá un enlace válido a una publicación, reel o video de Instagram.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/sorteo/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permalink }),
      });
      const result = (await response.json()) as {
        data?: CommentEntry[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "No se pudieron cargar los comentarios.");
      }

      setComments(result.data ?? []);
      setLoadedPostUrl(permalink);
      if (!result.data?.length) {
        setError("La publicación no tiene comentarios disponibles para el sorteo.");
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "No se pudieron cargar los comentarios de Instagram.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f0e6] text-[#27342b]">
      <header className="border-b border-white/15 bg-[#26372d] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[#e7d7b0]">
            <ArrowLeft aria-hidden="true" size={18} />
            Volver al Ateneo
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Logo del Ateneo Rural" width={48} height={44} className="h-11 w-12 object-contain" />
            <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-[#e7d7b0] sm:inline">
              Sociedad Rural Esquel
            </span>
          </Link>
        </div>
      </header>

      <section className="bg-[#26372d] px-6 pb-14 pt-12 text-white md:pb-20 md:pt-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#e7d7b0]">
              <FaInstagram aria-hidden="true" size={16} /> Sorteo en Instagram
            </p>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Cinco comentarios. <span className="text-[#e7d7b0]">Cinco ganadores.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#d9e0d6]">
              Cargá la publicación y sus comentarios para elegir cinco al azar, de forma clara y en un solo lugar.
            </p>
          </div>
          <div className="flex items-center gap-3 border-t border-[#e7d7b0]/40 pt-5 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <Trophy aria-hidden="true" className="text-[#e7d7b0]" size={24} />
            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs uppercase tracking-[0.16em] text-[#c8d0c5]">ganadores</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] md:gap-16 md:py-16">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-[#bd6d3b] font-mono text-sm font-bold text-white">01</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#bd6d3b]">Prepará el sorteo</p>
              <h2 className="mt-1 text-2xl font-bold">Datos de la publicación</h2>
            </div>
          </div>

          <label htmlFor="post-url" className="mb-2 block text-sm font-semibold">Enlace del post de Instagram</label>
          <div className="flex items-center gap-3 border border-[#b7c0b2] bg-white px-4 focus-within:border-[#bd6d3b]">
            <Link2 aria-hidden="true" className="shrink-0 text-[#657d68]" size={19} />
            <input
              id="post-url"
              type="url"
              inputMode="url"
              placeholder="https://www.instagram.com/p/..."
              value={postUrl}
              disabled={isLoading}
              onChange={(event) => {
                setPostUrl(event.target.value);
                resetDraw();
                setComments([]);
                setLoadedPostUrl("");
              }}
              className="min-w-0 flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-[#8a948a]"
            />
            {isInstagramPost(postUrl.trim()) && (
              <a href={postUrl.trim()} target="_blank" rel="noreferrer" aria-label="Abrir publicación" className="text-[#657d68] hover:text-[#bd6d3b]">
                <ExternalLink aria-hidden="true" size={18} />
              </a>
            )}
          </div>

          <button
            type="button"
            onClick={loadComments}
            disabled={isLoading}
            className="mt-4 inline-flex w-full items-center justify-center gap-3 border border-[#26372d] px-5 py-3 text-sm font-bold text-[#26372d] transition hover:bg-[#26372d] hover:text-white disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {isLoading ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
            ) : (
              <Download aria-hidden="true" size={18} />
            )}
            {isLoading ? "Cargando comentarios..." : "Traer comentarios"}
          </button>

          <div className="mt-8 flex items-end justify-between gap-4">
            <span className="block text-sm font-semibold">Comentarios participantes</span>
            <span className="shrink-0 text-xs text-[#657064]">
              {loadedPostUrl === postUrl.trim() ? `${comments.length} cargados` : "Aún no cargados"}
            </span>
          </div>
          <p className="mt-3 border-l-2 border-[#aebcad] pl-4 text-sm leading-relaxed text-[#657064]">
            {loadedPostUrl === postUrl.trim() && comments.length > 0
              ? `Se cargaron ${comments.length} comentarios y respuestas desde esta publicación.`
              : "Traé la lista completa desde Instagram antes de realizar el sorteo."}
          </p>

          <label className="mt-6 flex cursor-pointer items-start gap-3 border-y border-[#d4d8ce] py-4">
            <input
              type="checkbox"
              checked={oneChancePerPerson}
              onChange={(event) => {
                setOneChancePerPerson(event.target.checked);
                resetDraw();
              }}
              className="mt-0.5 h-4 w-4 accent-[#bd6d3b]"
            />
            <span>
              <span className="block text-sm font-semibold">Una chance por persona</span>
              <span className="mt-1 block text-xs text-[#657064]">Si se repite un usuario identificado, solo cuenta su primer comentario.</span>
            </span>
          </label>

          {error && <p role="alert" className="mt-5 border-l-4 border-[#bd443b] bg-[#f8e7e2] px-4 py-3 text-sm text-[#802e27]">{error}</p>}

          <button
            type="button"
            onClick={runDraw}
            disabled={isLoading || loadedPostUrl !== postUrl.trim() || eligibleComments.length < 5}
            className="mt-6 inline-flex w-full items-center justify-center gap-3 bg-[#bd6d3b] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#a85a2e] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Shuffle aria-hidden="true" size={18} />
            Sortear 5 ganadores
          </button>
        </div>

        <aside className="border-t-4 border-[#657d68] bg-[#e5e9df] p-6 md:p-7">
          <div className="flex items-center gap-3">
            <Users aria-hidden="true" className="text-[#526b56]" size={21} />
            <h2 className="text-lg font-bold">Antes de empezar</h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#526158]">
            La carga usa la API oficial de Meta. La cuenta profesional conectada debe ser dueña de la publicación y tener permiso para leer comentarios.
          </p>
          <div className="mt-6 border-t border-[#c5cdbf] pt-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#526b56]">Tu lista</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <span className="text-4xl font-bold tabular-nums">{eligibleComments.length}</span>
              <span className="pb-1 text-right text-xs leading-relaxed text-[#657064]">comentarios<br />con chance</span>
            </div>
            <div className="mt-3 h-1.5 bg-[#d1d8cc]">
              <div className="h-full bg-[#657d68] transition-all" style={{ width: `${Math.min(eligibleComments.length / 5, 1) * 100}%` }} />
            </div>
            <p className="mt-3 text-xs text-[#657064]">
              {loadedPostUrl === postUrl.trim()
                ? "Se incluyen comentarios y respuestas visibles para la API."
                : "Cargá los comentarios de Instagram para ver cuántas chances hay."}
            </p>
          </div>
        </aside>
      </section>

      {winners.length > 0 && (
        <section aria-live="polite" className="border-y border-[#d4d8ce] bg-white px-6 py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#bd6d3b]">
                  <Check aria-hidden="true" size={16} /> Sorteo realizado
                </p>
                <h2 className="text-3xl font-bold md:text-4xl">Estos son los ganadores</h2>
              </div>
              <a href={postUrl.trim()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#526b56] hover:text-[#bd6d3b]">
                Ver publicación <ExternalLink aria-hidden="true" size={16} />
              </a>
            </div>
            <ol className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-5">
              {winners.map((winner, index) => (
                <li key={`${winner.id}-${index}`} className="border-t-2 border-[#bd6d3b] py-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#bd6d3b]">Ganador {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-3 wrap-break-word text-sm font-bold text-[#27342b]">{winner.username ? `@${winner.username}` : `Comentario #${winner.id}`}</p>
                  <p className="mt-2 wrap-break-word text-sm leading-relaxed text-[#526158]">{winner.text}</p>
                </li>
              ))}
            </ol>
            <button type="button" onClick={resetDraw} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#526b56] hover:text-[#bd6d3b]">
              <RotateCcw aria-hidden="true" size={16} /> Volver a sortear
            </button>
          </div>
        </section>
      )}

      <footer className="bg-[#26372d] px-6 py-7 text-sm text-[#c8d0c5]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 sm:flex-row">
          <p>© {new Date().getFullYear()} Ateneo Rural Esquel</p>
          <Link href="/" className="transition hover:text-[#e7d7b0]">ateneosresquel@gmail.com</Link>
        </div>
      </footer>
    </main>
  );
}