import type { Metadata } from "next";
import SorteoClient from "./SorteoClient";

export const metadata: Metadata = {
  title: "Sorteo de Instagram",
  description: "Elegí cinco comentarios ganadores de una publicación de Instagram.",
};

export default function SorteoPage() {
  return <SorteoClient />;
}
