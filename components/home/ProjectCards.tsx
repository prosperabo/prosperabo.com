import React from "react";
import Image from "next/image";
import StatusBadge from "@/components/shared/utils/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Project } from "@/lib/definitions";
import { Progress } from "@/components/ui/progress";
interface Props {
  projects: Project[];
}
const ProjectCards: React.FC<Props> = ({ projects }) => {
  console.log("{projects.length}", projects.length);
  const projectsQty = projects.length;
  const skeletonQty = projectsQty === 0 ? 1 : projectsQty;
  return (
    <div className="grid max-w-3xl  grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-1 md:grid-rows-2 lg:h-[400px] lg:grid-flow-col lg:grid-cols-none ">
      <div className="xs:col-span-1 bg-trasparent flex min-w-min items-center justify-center rounded-md p-2 text-white sm:col-span-2 md:row-span-2 lg:max-w-max">
        <section
          id="image-project"
          className="relative flex h-full w-full max-w-72 border-spacing-3 flex-col items-center justify-center rounded-xl border-4 bg-black px-3 transition-opacity duration-300 hover:opacity-80"
          // className="flex h-full w-full max-w-96 border-spacing-3 flex-col items-center justify-center rounded-xl border-4 bg-black px-3 "
        >
          {projects[0] ? (
            <section className="flex h-full w-full flex-col items-center justify-center"> 
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <button className="-mt-5 flex w-36 justify-center rounded-md border-2 border-gray-300 bg-gray-950 px-3 py-3 transition-all duration-75 hover:border-white focus:outline-none active:bg-accent">
                  <Link
                    href={`/project/${projects[0].id}`}
                    className="font-semibold text-gray-50"
                  >
                    INVERTIR
                  </Link>
                </button>
              </div>
              <Image
                src={projects[0]?.Company?.logoFile || ""}
                alt={`Slide ${projects[0].title}`}
                width={300}
                height={200}
                className="h-30 w-[75%] rounded-full object-cover"
              />
              <div className="mb-2 flex w-full max-w-96 items-center justify-center text-center text-xl font-bold text-white">
                {projects[0].title}
              </div>
              <Progress
                value={
                  // (projects[0].availablePortions / projects[0].qtyPortions) * 100
                  projects[0].availablePortions === 0
                    ? 100
                    : Math.min(
                        (projects[0].availablePortions /
                          projects[0].qtyPortions) *
                          100,
                        100,
                      )
                }
                className="my-4 w-[180px]"
              />
              <StatusBadge status={parseInt(projects[0].status)} />
            </section>
          ) : (
            <div key={"project-skeleton"} className="text-white">
              <div className="flex flex-col space-y-3">
                <Skeleton
                  className="h-64 w-full rounded-xl lg:h-[125px]"
                  title="Próximamente"
                />
                <div className="space-y-2">
                  <Skeleton className="h-4 sm:w-8 md:w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
      <div className="xs:col-span-1 min-w-min px-4 md:row-span-2">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-2">
          {projects.splice(1, 4).map((project) => (
            <div
              key={project.id}
              className="border-1 h-80 rounded-md text-white sm:col-span-1 lg:h-52 "
            >
              <section
                id="image-project-v2"
                // className="flex flex-col space-y-3"
                className="relative flex w-full flex-col items-center justify-center space-y-3 rounded-xl bg-black transition-opacity duration-300 hover:opacity-80"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-10 transition-opacity duration-300 hover:opacity-100">
                  <button className="-mt-5 flex justify-center rounded-md border-2 border-gray-300 bg-gray-950 px-3 py-3 transition-all duration-75 hover:border-white focus:outline-none active:bg-teal-300 md:w-36">
                    <Link
                      href={`/project/${project.id}`}
                      className="font-semibold text-gray-50"
                    >
                      INVERTIR
                    </Link>
                  </button>
                </div>
                {/* // src='https://www.services.prosperabo.com/api/v1/profile/1720031451727-logo-childfund.png' */}
                <Image
                  // src={project.financialInfoFile || "https://www.services.prosperabo.com/api/v1/profile/1720031451727-logo-childfund.png"}
                  src={project.Company?.logoFile || ""}
                  alt={`Slide ${project.title}`}
                  width={250}
                  height={250}
                  className="h-64 w-full rounded-xl object-cover lg:h-[125px]"
                />
                <div className="space-y-2">
                  <Progress
                    value={
                      project.availablePortions === 0
                        ? 100
                        : Math.min(
                            (project.availablePortions / project.qtyPortions) *
                              100,
                            100,
                          )
                    }
                    className="w-[180px]"
                    // (project.availablePortions / project.qtyPortions) * 100
                  />
                  <p className="h-4 w-full text-ellipsis px-1">
                    {project.title}
                  </p>
                  {/* <Skeleton className="h-4 w-16" /> */}
                </div>
              </section>
            </div>
          ))}
          {/* SCOPE: Skeleton */}
          {Array.from({ length: 5 - skeletonQty }, (_, index) => (
            <div key={index} className="text-white">
              <div className="flex flex-col space-y-3">
                <Skeleton
                  className="h-64 w-full rounded-xl lg:h-[125px]"
                  title="Próximamente"
                />
                <div className="space-y-2">
                  <Skeleton className="h-4 sm:w-8 md:w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCards;
