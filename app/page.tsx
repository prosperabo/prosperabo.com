import Image from "next/image";
import AnimateText from "@/components/home/AnimateText";
import TreeFigure from "@/components/home/TreeFigure";
import ImInvestor from "@/components/home/ImInvestor";
import ProjectCards from "@/components/home/ProjectCards";

import { fetchInitialProjects } from "@/lib/data/projects";
import TeamMenbers from "@/components/home/TeamMenbers";

export default async function Home() {
  // TODO: pagination is ready, when this is required
  const { data, currentPage, nextPage, previousPage, totalItems, totalPages } =
    await fetchInitialProjects();
  interface SectionProps {
    className: string;
    children: React.ReactNode;
  }

  const Section: React.FC<SectionProps> = ({ className, children }) => (
    <section className={className}>{children}</section>
  );

  return (
    <>
      <div className="z-10 flex flex-col items-center justify-center py-28">
        <section
          id="banner"
          className="flex h-screen w-[360px] max-w-3xl animate-fade-up flex-col items-center justify-center px-5 pb-20 max-md:max-w-full sm:w-full xl:px-0"
        >
          <Image
            alt="image prospera"
            src="/prospera.svg"
            width={820}
            height={268}
            className=" aspect-[3.03] w-[350px] max-w-full self-center max-md:mt-10 sm:w-full md:w-[820px]"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          />

          <h3
            className="mt-12 text-base text-white lg:text-3xl"
            style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
          >
            Invierte con{" "}
            <span>
              <AnimateText />
            </span>
          </h3>
          <Section className="mb-20 mt-4 self-center text-center font-light text-white max-md:my-10 max-md:max-w-full lg:text-xl">
            ¡Juntos, construyamos un futuro financiero Próspero!
          </Section>
        </section>
        <section
          id="about"
          className="mt-24 flex h-screen w-[360px]  max-w-3xl animate-fade-up flex-col items-center justify-center align-middle text-white max-md:max-w-full sm:mt-0 sm:w-full xl:px-0 "
        >
          <h2 className="pb-10 text-3xl lg:mb-8 lg:text-5xl">
            ¿Quiénes somos?
          </h2>
          <p className="xs:text-sm text-center text-base">
            Somos un crowdfunding, arquitectos de un futuro financiero donde
            cada boliviano tiene la llave para desbloquear oportunidades
            ilimitadas. Conectamos a inversores audaces y visionarios con el
            vibrante mundo de las startups y PYMES bolivianas llenas de
            potencial, transformando el panorama financiero de Bolivia:
            empoderando la innovación y la prosperidad para todos.
          </p>
          <br />
          <p className="xs:text-sm text-center text-base">
            Nuestra misión es liderar la transformación del acceso al
            financiamiento en múltiples mercados, utilizando tecnología avanzada
            para crear oportunidades de crecimiento económico inclusivo y
            sostenible, más allá de las fronteras de Bolivia.
          </p>
          <section className="mt-32">
            <TreeFigure />
          </section>
        </section>
        <section
          id="banner-investor-company"
          className="mt-24 grid w-full max-w-3xl grid-cols-4 items-center justify-center gap-16 px-3 pb-20  align-middle text-white max-md:max-w-full max-md:pl-5 xl:px-0"
        >
          <h2 className=" col-span-4 text-center text-3xl lg:mb-16 lg:text-5xl">
            ¿Eres inversor o empresa?
          </h2>
          <ImInvestor />
          <div className="col-span-2 w-full bg-gradient-to-l from-black to-slate-400 px-16 py-24 text-center align-middle font-light uppercase text-white md:text-2xl lg:text-4xl">
            soy empresa
          </div>
        </section>

        <section
          id="projects"
          className="mt-24 max-w-3xl items-center justify-center gap-16 px-3 pb-20  align-middle text-white max-md:pl-5 xl:px-0 "
        >
          <h2 className="col-span-4 pb-10 text-center text-3xl text-white lg:mb-8 lg:text-5xl">
            Conoce las campañas
          </h2>
          <ProjectCards projects={data} />
        </section>

        <section
          id="team"
          className="mt-24 w-[360px] max-w-3xl items-center justify-center gap-16 px-3 pb-20 align-middle text-white max-md:max-w-full max-md:pl-5 sm:w-full xl:px-0"
        >
          <h2 className="col-span-4 pb-10 text-center text-3xl uppercase text-white lg:text-5xl">
            Nuestro Equipo
          </h2>
          <TeamMenbers />
          {/* <Team /> */}
        </section>
      </div>
    </>
  );
}
