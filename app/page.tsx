"use client";

import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Menu,
  Mountain,
  Sprout,
  Tractor,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const fotos = {
  campo:
    "/vacas.jpeg",
  ovejas:
    "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=1200&q=85",
  joven:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
};

const propuestas = [
  {
    numero: "01",
    titulo: "Ronda de campo",
    descripcion:
      "Nos juntamos a compartir herramientas, ideas y lo que aprendemos haciendo.",
    icono: Users,
  },
  {
    numero: "02",
    titulo: "Manos a la tierra",
    descripcion:
      "Talleres prácticos para producir mejor, cuidar el suelo y abrir nuevos caminos.",
    icono: Sprout,
  },
  {
    numero: "03",
    titulo: "Red joven rural",
    descripcion:
      "Conectamos proyectos, oficios y sueños para que quedarse en el campo sea una elección.",
    icono: Tractor,
  },
];

const agenda = [
  ["8 OCT", "14 a 18 hs: Ingreso de animales", "Sociedad Rural Esquel"],
  ["9 OCT", "Jura de Razas Angus y Hereford", "Sociedad Rural Esquel"],
  ["9 OCT", "21:00: Peña folklórica: La Muda", "Sociedad Rural Esquel"],
  ["10 OCT", "Jura de Razas Angus y Hereford", "Sociedad Rural Esquel"],
  ["10 OCT", "21:00: Peña folklórica: El Entrevero", "Sociedad Rural Esquel"],
  ["11 OCT", "13:00: Asado Tradicional", "Sociedad Rural Esquel"],
  ["11 OCT", "14:30: Remate", "Sociedad Rural Esquel"],
];

const directiva = [
  {
    cargo: "Presidente",
    nombre: "Fermin Baracat",
    foto: "/fermin.jpeg",
    descripcion: "Representa y coordina la gestión institucional.",
  },
  {
    cargo: "Vicepresidente",
    nombre: "Joaquina Gonzalo",
    foto: "/joaquina.jpeg",
    descripcion: "Acompaña la conducción y fortalece la articulación del equipo.",
  },
  {
    cargo: "Secretario",
    nombre: "Santiago Gough",
    foto: "/santiago.jpeg",
    descripcion: "Maneja la documentación, actas y comunicación interna.",
  },
  {
    cargo: "Prosecretario",
    nombre: "Leon Mansilla",
    foto: "/leon.jpeg",
    descripcion: "Asiste al secretario y aporta apoyo operativo en la gestión.",
  },
  {
    cargo: "Tesorero",
    nombre: "Maximiliano Elsezar",
    foto: "/maxi.jpeg",
    descripcion: "Administra los recursos y asegura la sostenibilidad del proyecto.",
  },
  {
    cargo: "Protesorero",
    nombre: "Franco Ríos",
    foto: "/franco.jpeg",
    descripcion: "Colabora en la administración financiera y el control de gastos.",
  },  
  {
    cargo: "Vocal",
    nombre: "Nicolas",
    foto: "/nicolas.jpeg",
    descripcion: "Aportan propuestas, acompañamiento y visión colectiva.",
  }, 
  {
    cargo: "Vocal",
    nombre: "Nia Jones",
    foto: "/nia.jpeg",
    descripcion: "Aportan propuestas, acompañamiento y visión colectiva.",
  },
  {
    cargo: "Vocal",
    nombre: "Luna",
    foto: "/luna.jpeg",
    descripcion: "Aportan propuestas, acompañamiento y visión colectiva.",
  },
];

export default function Home() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f0e6] text-[#27342b]">
      <header className="fixed top-0 z-50 w-full border-b border-white/20 bg-[#26372d]/90 text-white backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#inicio" className="flex items-center gap-3">
            <Image
              src="/logonuevo.png"
              alt="Logo del Ateneo Rural"
              width={52}
              height={52}
              className="h-12 w-14 object-contain"
            />
            <div>
              <p className="font-bold leading-none tracking-tight">ATENEO</p>
              <span className="text-xs uppercase tracking-[0.3em] text-[#e7d7b0]">
                Sociedad Rural Esquel
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#nosotros" className="transition hover:text-[#e7d7b0]">La comunidad</a>
            <a href="#comision-directiva" className="transition hover:text-[#e7d7b0]">Comisión directiva</a>
            <a href="#propuestas" className="transition hover:text-[#e7d7b0]">Qué hacemos</a>
            <a href="#agenda" className="transition hover:text-[#e7d7b0]">Agenda</a>
            <a href="#contacto" className="border border-[#e7d7b0] px-4 py-2 text-[#e7d7b0] transition hover:bg-[#e7d7b0] hover:text-[#26372d]">Sumate</a>
          </nav>

          <button
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {menuAbierto ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {menuAbierto && (
          <nav className="border-t border-white/10 bg-[#26372d] px-6 py-5 md:hidden">
            <div className="flex flex-col gap-5 text-sm">
              <a href="#nosotros" onClick={() => setMenuAbierto(false)}>La comunidad</a>
              <a href="#comision-directiva" onClick={() => setMenuAbierto(false)}>Comisión directiva</a>
              <a href="#propuestas" onClick={() => setMenuAbierto(false)}>Qué hacemos</a>
              <a href="#agenda" onClick={() => setMenuAbierto(false)}>Agenda</a>
              <a href="#contacto" onClick={() => setMenuAbierto(false)} className="text-[#e7d7b0]">Sumate</a>
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative min-h-[720px] overflow-hidden bg-[#26372d] pt-28 text-white md:min-h-screen">
        <div className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: `url(${fotos.campo})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#16251d] via-[#26372d]/75 to-transparent" />
        <div className="relative mx-auto flex min-h-[590px] max-w-7xl items-end px-6 pb-24 md:items-center md:pb-0">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-[#e7d7b0]"><MapPin size={16} /> Esquel, Chubut</div>
            <h1 className="max-w-3xl text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">El campo también es <span className="text-[#e7d7b0]">futuro.</span></h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#f5f1e8] md:text-xl">Somos una comunidad de jóvenes rurales que produce, comparte y arma proyectos para seguir haciendo crecer nuestro lugar.</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#propuestas" className="inline-flex items-center gap-3 bg-[#e7d7b0] px-6 py-4 font-semibold text-[#26372d] transition hover:bg-white">Conocé la movida <ArrowDownRight size={19} /></a>
              <a href="#nosotros" className="inline-flex items-center gap-3 border border-white/60 px-6 py-4 font-semibold transition hover:bg-white/10">Nuestra historia <ArrowUpRight size={19} /></a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-16 w-full bg-[#f4f0e6] [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]" />
      </section>

      <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-14 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#bd6d3b]">Una comunidad en movimiento</p>
            <h2 className="text-4xl font-bold leading-tight md:text-6xl">Acá las ideas se ponen las botas.</h2>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-[#526158]">Ateneo Rural nace del encuentro entre personas que aman el territorio y quieren construir una vida posible en él. Sin recetas: con trabajo, creatividad y ganas de hacer red.</p>
            <div className="mt-9 flex items-center gap-5 border-t border-[#c9c3b5] pt-6"><Mountain className="text-[#bd6d3b]" size={31} /><p className="max-w-xs text-sm font-semibold leading-relaxed">Desde Esquel, para cada rincón que elige quedarse.</p></div>
          </div>
          <div className="relative min-h-[430px]">
            <div className="absolute right-0 top-0 h-72 w-[72%] bg-cover bg-center" style={{ backgroundImage: `url(${fotos.joven})` }} />
            <div className="absolute bottom-0 left-0 h-72 w-[62%] border-[10px] border-[#f4f0e6] bg-cover bg-center" style={{ backgroundImage: `url(${fotos.ovejas})` }} />
            <p className="absolute right-3 top-5 bg-[#e7d7b0] px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#26372d]">Trabajo real</p>
          </div>
        </div>
      </section>

      <section id="comision-directiva" className="bg-[#f8f4eb] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#bd6d3b]">Comisión directiva</p>
            <h2 className="text-4xl font-bold leading-tight md:text-6xl">La conducción que acompaña cada paso.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {directiva.map(({ cargo, nombre, foto, descripcion }) => (
              <article key={cargo} className="overflow-hidden rounded-2xl border border-[#d8d1c1] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="h-100 w-full overflow-hidden bg-[#eae3d6]">
                  <img
                    src={foto}
                    alt={nombre}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-full bg-[#e7d7b0] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#26372d]">
                      {cargo}
                    </span>
                    <Users className="text-[#bd6d3b]" size={22} />
                  </div>

                  <h3 className="text-2xl font-bold text-[#26372d]">{nombre}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#526158]">{descripcion}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="propuestas" className="bg-[#dce4d5] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#bd6d3b]">Lo que nos mueve</p><h2 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">Hacer comunidad es hacer futuro.</h2></div><p className="max-w-xs text-sm leading-relaxed text-[#526158]">Encuentros, talleres y proyectos para aprender haciendo y acompañarnos en el camino.</p></div>
          <div className="mt-14 grid gap-px bg-[#9eae9d] md:grid-cols-3">
            {propuestas.map(({ numero, titulo, descripcion, icono: Icono }) => (
              <article key={numero} className="group bg-[#dce4d5] p-8 transition hover:bg-[#26372d] hover:text-white md:p-10"><div className="flex items-start justify-between"><Icono className="text-[#bd6d3b]" size={34} strokeWidth={1.5} /><span className="font-mono text-sm text-[#7d8c7d] group-hover:text-[#e7d7b0]">{numero}</span></div><h3 className="mt-16 text-2xl font-bold">{titulo}</h3><p className="mt-4 leading-relaxed text-[#526158] group-hover:text-[#d7dfd5]">{descripcion}</p><ArrowUpRight className="mt-9 text-[#bd6d3b] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-[0.7fr_1.3fr]"><div><p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#bd6d3b]">Agenda abierta</p><h2 className="text-4xl font-bold leading-tight md:text-6xl">Nos vemos en el campo.</h2><p className="mt-6 text-[#526158]">Traé mate, preguntas y ganas de cruzarte con gente que está en la misma.</p></div><div className="border-t-2 border-[#26372d]">{agenda.map(([fecha, titulo, lugar]) => (<article key={titulo} className="grid gap-3 border-b border-[#c9c3b5] py-6 md:grid-cols-[110px_1fr_auto] md:items-center"><p className="font-mono text-sm font-bold text-[#bd6d3b]">{fecha}</p><div><h3 className="text-xl font-bold">{titulo}</h3><p className="mt-1 text-sm text-[#718077]">{lugar}</p></div><CalendarDays className="hidden text-[#bd6d3b] md:block" size={22} /></article>))}</div></div>
      </section>

      <section id="contacto" className="bg-[#bd6d3b] px-6 py-24 text-[#fffaf0] md:py-28"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end"><div><p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#f4e5c3]">¿Te sumás?</p><h2 className="max-w-3xl text-5xl font-bold leading-none md:text-7xl">El próximo proyecto puede ser el tuyo.</h2></div><div><p className="mb-7 leading-relaxed text-[#fae9d5]">Escribinos para conocer la agenda, proponer una actividad o simplemente venir a compartir una ronda.</p><a href="mailto:ateneosresquel@gmail.com" className="inline-flex items-center gap-3 bg-[#26372d] px-6 py-4 font-semibold transition hover:bg-white hover:text-[#26372d]">ateneosresquel@gmail.com <ArrowUpRight size={19} /></a></div></div></section>

      <footer className="bg-[#26372d] px-6 py-8 text-sm text-[#c8d0c5]"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 md:flex-row"><p>© {new Date().getFullYear()} Ateneo Rural Esquel</p><p>Territorio · Comunidad · Futuro</p></div></footer>
    </main>
  );
}
