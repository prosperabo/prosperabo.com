"use client";
import {
  FileUpIcon,
  FileArchive,
  FileArchiveIcon,
  RefreshCwIcon,
} from "lucide-react";
import Card from "@/components/shared/Card";
import { useEffect, useState } from "react";
import useLoadingStore from "@/stores/loading.store";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Props {
  loadingId: string; // identificador único para identificar el estado de carga de cada componente de carga individualmente
  onFileUpload: (file: File, id: string) => void;
  title: string;
  description?: string;
  buttonText?: string;
  fileUrl?: string;
}

const UploadFile = ({
  loadingId,
  onFileUpload,
  title,
  description,
  buttonText = "Guardar Ahora",
  fileUrl,
}: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isLoading = useLoadingStore((state) => state.isLoading(loadingId));
  const [previewUrl, setPreviewUrl] = useState<string | null>(fileUrl || null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (fileUrl) {
      setPreviewUrl(fileUrl);
      const fileType = fileUrl.split(".").pop();
      if (fileType) {
        setFileType(fileType);
      }
    }
  }, [fileUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      const fileType = file.name.split(".").pop();
      if (fileType) {
        setFileType(fileType);
      }
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileType(null);
    }
    // setSelectedFile(file);
    // setPreviewUrl(URL.createObjectURL(file));
    // setFileType(file.name.split(".").pop());
  };
  const renderPreview = () => {
    if (!previewUrl || !fileType)
      return (
        <FileUpIcon className="text-[80px] text-slate-400 dark:text-white" />
      );

    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    if (imageExtensions.includes(fileType.toLowerCase())) {
      return (
        typeof previewUrl !== null &&
        previewUrl !== undefined && (
          <Image
            src={previewUrl}
            alt={`Preview`}
            width={250}
            height={300}
            style={{ transition: "transform 0.3s" }}
            className="container mb-2 max-h-40 *:transition-transform *:duration-300 *:ease-in-out hover:scale-105"
          />
        )
      );
    }

    if (fileType.toLowerCase() === "pdf") {
      return (
        <FileArchiveIcon className="text-[80px] text-red-500 dark:text-red-400" />
      );
    }

    return (
      <FileArchive className="text-navy-200 text-[80px] dark:text-white" />
    );
  };

  const uploadHandler = (event: React.FormEvent<HTMLButtonElement>): void => {
    if (selectedFile) {
      onFileUpload(selectedFile, loadingId);
    }
  };

  return (
    <Card className="font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 dark:shadow-none">
      <div
        id={`input-preview-${loadingId}`}
        className="bg-lightPrimary dark:!bg-navy-700 col-span-5 h-full w-full rounded-xl"
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="ml-4">
            <label
              htmlFor={`pdfFile-${loadingId}`}
              className="dark:!border-navy-700 flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 lg:pb-0"
            >
              {renderPreview()}

              <p className="mt-2 flex flex-col text-sm font-medium text-gray-600">
                {selectedFile ? "File selected" : " Click to select a file "}

                {selectedFile && (
                  <b className="text-navy-200 text-xl font-bold dark:text-white">
                    {selectedFile.name}
                  </b>
                )}
              </p>
              <input
                id={`pdfFile-${loadingId}`}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="dark:!bg-navy-800 col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pb-4 pl-3">
        <h5 className="text-navy-700 text-center text-xl font-bold leading-9 dark:text-white">
          {title}
        </h5>
        <p className="leading-1 mt-2 text-base font-normal text-gray-600">
          {description}
        </p>
        <Image
          src="/pago_qr.jpg"
          alt="Pago QR"
          width={250}
          height={300}
          className="mx-auto my-4"
        />
        <Button
          size={"custom"}
          variant={"custom"}
          onClick={uploadHandler}
          disabled={!selectedFile || isLoading}
          className={`mt-4  font-medium ${selectedFile && !isLoading ? "linear" : "bg-gray-500 text-white"
            }`}
        >
          {isLoading ? (
            <span className="flex justify-center align-middle">
              <RefreshCwIcon className="animate-spin" />
              {"Procesando..."}
            </span>
          ) : (
            buttonText
          )}
        </Button>

        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
          >
            <Button variant="link"> Ver archivo actual </Button>
          </a>
        )}
      </div>
    </Card>
  );
};

export default UploadFile;
