import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Ateneo Rural Esquel",
    template: "%s | Ateneo Rural Esquel",
  },
  description:
    "Una comunidad de jóvenes rurales que produce, comparte y construye futuro desde Esquel, Chubut.",
  keywords: [
    "Ateneo Rural",
    "Esquel",
    "jóvenes rurales",
    "comunidad rural",
    "campo patagónico",
    "Chubut",
  ],
  authors: [{ name: "Ateneo Rural Esquel" }],
  creator: "Ateneo Rural Esquel",
  publisher: "Ateneo Rural Esquel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    title: "Ateneo Rural Esquel",
    description:
      "Comunidad, proyectos y encuentros para jóvenes que eligen construir futuro en el campo.",
    siteName: "Ateneo Rural Esquel",
    images: [
      {
        url: "/logonuevo.png",
        width: 640,
        height: 640,
        alt: "Logo de Ateneo Rural Esquel",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ateneo Rural Esquel",
    description:
      "Una comunidad joven que produce, comparte y construye futuro desde el campo.",
    images: ["/logonuevo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logonuevo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
