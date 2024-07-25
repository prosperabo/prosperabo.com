"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  link: string;
  imageUrl: string;
  delay?: string;
  className?: string;
}
const LinkImage = ({ link, imageUrl, delay = "0.3s", className }: Props) => {
  return (
    <span
      className={cn("cursor-pointer", className)}
      onClick={() => window.open(link, "_blank")}
    >
      <Image
        alt="image prospera"
        src={imageUrl}
        width={58}
        height={58}
        style={{
          animationDelay: delay,
          animationName: "fadeIn",
          animationDuration: "1s",
          animationFillMode: "forwards",
        }}
      />
    </span>
  );
};

export default LinkImage;
