import { Instagram, MailOpen, Music2, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="absolute mb-0 w-full py-5 text-center lg:px-4">
      <div className="my-10 flex flex-col items-center justify-center gap-4 border-cyan-950 bg-transparent px-5 md:px-12 xl:flex-row lg:justify-between xl:mx-auto xl:max-w-screen-xl">
        <section className="flex flex-col items-center justify-center gap-4 text-slate-50 md:flex-row md:gap-12 md:text-left">
          <div className="font-['Inter', 'system-ui', 'sans-serif'] text-2xl md:text-4xl">
            Contáctanos
          </div>
          <span className="text-lg md:text-xl">Redes Sociales</span>
          <span className="hidden text-4xl text-accent md:block">|</span>
        </section>
        <section className="flex flex-col items-center justify-center gap-4 text-white md:flex-row md:gap-12 md:text-left">
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/prospera.bo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={32} className="md:size-12" />
            </a>
            <a
              href="https://www.linkedin.com/company/prosperafunding/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={32} className="md:size-12" />
            </a>

            <Music2 size={32} className="md:size-12" />
          </div>
          <a href="mailto:info@prosperabo.com" className="text-lg md:text-xl">
            info@prosperabo.com
          </a>
          <span className="hidden text-4xl text-accent md:block">|</span>
        </section>
        <section className="flex items-center justify-center text-white">
          <MailOpen size={32} className="md:size-12" />
          <Link
            href={`/terms/`}
            target="blank"
            className="text-lg hover:text-blue-500  md:text-xl "
          >
            Términos y Condiciones
          </Link>
        </section>
      </div>
      ;
    </div>
  );
}
