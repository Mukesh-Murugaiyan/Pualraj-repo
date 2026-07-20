"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface LazyImageProps extends Omit<ImageProps, "onLoad"> {
  fallbackSrc?: string;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  fallbackSrc = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(src as string);

  // Sync internal state when src prop changes (e.g. gallery thumbnail clicks)
  useEffect(() => {
    setImgSrc(src as string);
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden group">
      {/* Skeleton Loading Placeholder Background */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center z-10">
          <div className="w-7 h-7 rounded-full border-2 border-brand-orange/40 border-t-brand-orange animate-spin" />
        </div>
      )}

      <Image
        src={imgSrc || fallbackSrc}
        alt={alt}
        loading={props.priority ? undefined : "lazy"}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          }
        }}
        className={`transition-all duration-700 ease-out ${
          isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
