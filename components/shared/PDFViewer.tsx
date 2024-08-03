"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

// if (typeof window !== "undefined") {
//   pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
//   // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   //   "pdfjs-dist/build/pdf.worker.min.mjs",
//   //   import.meta.url,
//   // ).toString();
// }

// const options = {
//   cMapUrl: "/cmaps/",
//   standardFontDataUrl: "/standard_fonts/",
// };
interface PDFViewerProps {
  fileUrl: string;
}
//  type PDFFile = string | File | null;
const maxWidth = 1920;
const resizeObserverOptions = {};

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [workerLoaded, setWorkerLoaded] = useState(false);

  // const [file, setFile] = useState<PDFFile>(fileUrl);
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(380);

  const options = useMemo(
    () => ({
      cMapUrl: "/cmaps/",
      // standardFontDataUrl: "/standard_fonts/",
      cMapPacked: true,
    }),
    [],
  );
  useEffect(() => {
    const loadWorker = async () => {
      if (typeof window !== "undefined") {
        try {
          // Intenta cargar el worker desde unpkg.com
          pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
          await pdfjs.getDocument(fileUrl).promise; // Verifica si el worker funciona
          setWorkerLoaded(true);
        } catch (error) {
          console.error("Error al cargar el worker desde unpkg.com:", error);
          // Si falla, intenta cargar el worker localmente
          pdfjs.GlobalWorkerOptions.workerSrc =
            "/_next/static/worker/pdf.worker.min.js"; // Ajusta la ruta si es necesario
          await pdfjs.getDocument(fileUrl).promise; // Verifica si el worker funciona
          setWorkerLoaded(true);
        }
      }
    };

    loadWorker();
  }, [fileUrl]);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;
    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  return (
    <div
      className="w-full items-center justify-center overflow-scroll md:hidden lg:w-min lg:p-0"
      ref={setContainerRef}
    >
      {workerLoaded ? (
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          renderMode="canvas"
          loading={
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
            </div>
          }
          error={
            <div className="flex h-64 items-center justify-center text-red-500">
              Error al cargar el PDF
            </div>
          }
          noData={
            <div className="flex h-64 items-center justify-center text-gray-500">
              No se encontró el PDF
            </div>
          }
          className="h-svh w-full lg:w-[900px]"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={
                containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
              }
              canvasBackground="white"
              // className={`h-screen`}
              height={
                containerWidth ? containerWidth * 1.414 : maxWidth * 1.414
              }
            />
          ))}
        </Document>
      ) : (
        <div className="flex flex-col items-center justify-center text-white">
          <b>Cargando PDF... </b>
          <p>
            Si esto tarda demasiado, opta por utilizar otro navegador. Puede que
            tu navegador no sea compatible con la versión del lector PDF
            utilizada en esta aplicación. O descarga el PDF y ábrelo en tu visor
            de PDF local.
          </p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
