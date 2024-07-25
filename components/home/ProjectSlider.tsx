"use client";
import React, { useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import StatusBadge from "../shared/utils/StatusBadge";
import Link from "next/link";

// TODO: next use types from api or prisma
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  status: number;
  riskLevel: number;
  endDate: string;
};

interface SliderProps {
  projects: Project[];
}

// const ImageSlider = ({ images: [] }) => {
const ProjectSlider: React.FC<SliderProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [ref, inView] = useInView({
    threshold: 0.5, // Activar la carga cuando el 50% del componente esté visible
    triggerOnce: true, // Cargar el componente solo una vez
  });

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1,
    );
  };
  const getRiskLevelBadge = (riskLevel: number) => {
    const riskLevels = [
      { label: "Alto", color: "bg-red-500" },
      { label: "Medio-Alto", color: "bg-orange-500" },
      { label: "Medio", color: "bg-yellow-500" },
      { label: "Medio-Bajo", color: "bg-green-500" },
      { label: "Bajo", color: "bg-blue-500" },
    ];

    for (const { label, color } of riskLevels) {
      if (riskLevel <= 20) {
        return (
          <div className={`rounded-full px-3 py-0 text-white ${color}`}>
            {label}
          </div>
        );
      }
      riskLevel -= 20;
    }

    return null; // Valor predeterminado si no se encuentra un nivel de riesgo válido
  };

  /* const getRiskLevelBadge = (riskLevel:number) => {
    const riskLevels = {
      1: { label: "Alto", color: "red" },
      20: { label: "Medio-Alto", color: "orange" },
      40: { label: "Medio", color: "yellow" },
      60: { label: "Medio-Bajo", color: "green" },
      80: { label: "Bajo", color: "blue" },
    };

    for (const [level, { label, color }] of Object.entries(riskLevels)) {
      if (riskLevel <= level) {
        return (
          <div className={`rounded-full px-2 py-1 text-white ${color}`}>
            {label}
          </div>
        );
      }
    }
  }; */
  return (
    <div ref={ref}>
      {inView && (
        <div
          ref={sliderRef}
          className="relative h-[500px] w-full overflow-hidden"
          // className="relative h-screen w-full overflow-hidden"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className={`absolute left-0 top-0 h-full w-full transition-transform duration-500 ${
                index === currentIndex
                  ? "translate-x-0"
                  : `${
                      index < currentIndex
                        ? "-translate-x-full"
                        : "translate-x-full"
                    }`
              }`}
            >
              <section
                id="image-project"
                className="flex h-64 w-full max-w-96 border-spacing-3 items-center rounded-xl border-4 bg-black px-3 "
              >
                <Image
                  src={project.image}
                  alt={`Slide ${project.title}`}
                  width={400}
                  height={250}
                  className="h-56 w-full rounded-full object-cover"
                />
              </section>
              <p className="truncate pt-6 text-center">{project.description}</p>
              <section
                id="fields-project"
                className="flex flex-col items-center"
              >
                <div className="h-full flex-col items-center justify-center p-6 text-white">
                  {/* <h3 className="mb-2 text-2xl font-bold">{project.title}</h3> */}
                  <div className="mb-2 flex justify-center">
                    {/* <span className="mr-2">Status:</span> */}
                    <StatusBadge status={project.status} />
                  </div>
                  <div className="mb-2 flex items-center">
                    <span className="mr-2">riskLevel:</span>
                    {getRiskLevelBadge(project.riskLevel)}
                  </div>
                  <div className="mb-2 flex items-center">
                    <span className="mr-2">Finaliza:</span>
                    {project.endDate}
                  </div>
                </div>
                <button
                  onClick={() => console.log("INVERTIR")}
                  className="-mt-5 flex w-36 justify-center rounded-md border-2 border-gray-300 px-3 py-3 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-cyan-600"
                >
                  {/* <span className="font-semibold text-gray-50">INVERTIR</span> */}
                  <Link
                    href={`/project/${project.id}`}
                    className="font-semibold text-gray-50"
                  >
                    INVERTIR
                  </Link>
                  {/* <Link href={`/project/${project.id}`}>{project.title}</Link> */}
                </button>
              </section>
            </div>
          ))}
          <button
            onClick={handlePrevious}
            className="absolute left-2 top-2/4 -translate-y-1/2 transform rounded-full border-2 bg-black p-2 text-white shadow-md"
          >
            {"<"}
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full border-2 bg-black p-2 text-white shadow-md"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectSlider;
