"use client";

import { cva } from "class-variance-authority";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export type RoundedSize = "xl" | "lg" | "none";

interface BaseImageProps {
  src: string | StaticImageData;
  alt: string;
  rounded?: RoundedSize;
  className?: string;
}

const BaseImageVariants = cva("relative h-full w-full overflow-hidden", {
  variants: {
    rounded: {
      xl: "rounded-xl",
      lg: "rounded-lg",
      none: "rounded-sm",
    },
    defaultVariants: {
      rounded: "lg",
    },
  },
});

export default function BaseImage({ src, alt, rounded = "none", className }: BaseImageProps) {
  const [isError, setIsError] = useState(false);
  const handleError = () => setIsError(true);
  return (
    <div className={twMerge(BaseImageVariants({ rounded }), className)}>
      {!isError && (
        <Image
          src={src}
          sizes="100%"
          alt={alt}
          fill
          className="object-cover"
          onError={handleError}
        />
      )}
      {isError && (
        <Image
          alt="placeholder"
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          fill
          className="bg-custom-brown"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAA3NCSVQICAjb4U/gAAAAg0lEQVR4nO3BMQEAAADCoPdPbQ43oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB8C1FIAAGs7t8sAAAAASUVORK5CYII="
        />
      )}
    </div>
  );
}
