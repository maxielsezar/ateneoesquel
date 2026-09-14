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
    url: "/",
    title: "Ateneo Sociedad Rural Esquel",
    description:
      "El Ateneo Rural Esquel reúne a jóvenes, familias y productores para compartir proyectos, trabajo y futuro desde el campo patagónico.",
    siteName: "Ateneo Sociedad Rural Esquel",
    images: [
      {
        url: "/logo.png",
        width: 640,
        height: 640,
        type: "image/jpeg",
        alt: "Logo del Ateneo de la Sociedad Rural de Esquel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ateneo Rural Esquel",
    description:
      "Jóvenes, familias y productores construyendo comunidad, proyectos y futuro desde el campo patagónico.",
    images: [
      {
        url: "/logo.png",
        alt: "Logo del Ateneo de la Sociedad Rural de Esquel",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
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
