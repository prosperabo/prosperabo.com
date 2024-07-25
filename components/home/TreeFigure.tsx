"use client";
import React from "react";
import { Check } from "lucide-react";
import { useInView } from "react-intersection-observer";

const TreeFigure = () => {
  const [ref, inView] = useInView({
    threshold: 0.5, // Activar la animación cuando el 50% del componente esté visible
    triggerOnce: true, // Ejecutar la animación solo una vez
  });
  const textList = [
    "Eficiencia y facilidad en el proceso",
    "Transparencia en la información",
    "Innovación y prosperidad",
    "Oportunidad de inversión",
    "100% online",
  ];
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="relative h-[400px] w-[480px] md:w-[500px]" ref={ref}>
        <div className="absolute left-1/2 top-1/3 h-full w-2 -translate-x-1/2 -translate-y-1/2 transform bg-white"></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="relative">
            {/* Ramas */}
            <div
              className={`animate-branch-1 absolute -top-[192px] right-0 h-2 w-8 bg-white opacity-0 md:w-10`}
            />
            <div className="animate-branch-2 absolute -top-[128px] left-full h-2 w-8 -translate-x-full transform bg-white opacity-0 md:w-10"></div>
            <div
              className={`${
                inView ? "" : ""
              } animate-branch-3 absolute -top-[64px] right-0 h-2 w-8 -translate-y-full transform bg-white opacity-0 md:w-10 `}
            ></div>
            <div className="animate-branch-4 absolute -top-[0px] left-full h-2 w-8 -translate-x-full -translate-y-full transform bg-white opacity-0 md:w-10"></div>
            <div className="animate-branch-5 absolute right-0 top-[64px] h-2 w-8 bg-white opacity-0 md:w-10"></div>
            {/* <div className="absolute top-[320px] left-full transform -translate-x-full md:w-12 h-2 bg-black animate-branch-6 opacity-0"></div> */}

            {/* Textos */}

            <div className="relative h-full w-full text-base">
              <div
                className={`absolute -top-[192px] right-0 transform ${
                  inView ? "animate-text-1" : ""
                } w-[100px] items-center gap-1 opacity-0 md:w-auto md:flex-row md:text-nowrap`}
              >
                {textList[0]}
              </div>

              <div
                className={`absolute -top-[128px] left-full -translate-x-full transform ${
                  inView ? "animate-text-2 " : ""
                } flex flex-col opacity-0 md:flex-row md:text-nowrap`}
              >
                {textList[1]}
              </div>
              <div
                className={`absolute -top-[64px] right-0 -translate-y-full transform ${
                  inView ? "animate-text-3" : ""
                }  flex flex-col items-center opacity-0 md:flex-row`}
              >
                {textList[2].split(" ").map((word, index) => (
                  <span key={index} className="text-left">
                    {word}&nbsp;
                  </span>
                ))}
              </div>
              <div
                className={` absolute -top-[0px] left-full -translate-x-full -translate-y-full transform ${
                  inView ? "animate-text-4" : ""
                } flex flex-col opacity-0 md:flex-row`}
              >
                {textList[3].split(" ").map((word, index) => (
                  <span key={index} className="text-left">
                    {word}&nbsp;
                  </span>
                ))}
              </div>
              <div
                className={` absolute right-0 top-[64px] ${
                  inView ? "animate-text-5" : ""
                } opacity-0`}
              >
                {textList[4].split(" ").map((word, index) => (
                  <span key={index} className="text-left">
                    {word}&nbsp;
                  </span>
                ))}
              </div>
            </div>

            {/* Punto circular con icono */}
            <div className="absolute left-1/2 top-full flex h-[50px] w-[50px] -translate-x-1/2 -translate-y-72 transform items-center justify-center rounded-full bg-white">
              <Check
                className={`text-black ${inView ? "animate-icon-ready" : "absolute -top-[192px] right-0 transform"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeFigure;
