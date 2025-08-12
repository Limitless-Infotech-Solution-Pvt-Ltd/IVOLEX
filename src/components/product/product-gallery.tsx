"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = React.useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect) };
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((src, index) => (
              <div key={index} className="relative flex-[0_0_100%] aspect-square">
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      src={src}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover cursor-zoom-in"
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-auto">
                    <Image
                      src={src}
                      alt={`Product image ${index + 1}`}
                      width={1200}
                      height={1200}
                      className="object-contain"
                    />
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </div>
        <Button onClick={scrollPrev} variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80">
          <ChevronLeft />
        </Button>
        <Button onClick={scrollNext} variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/50 hover:bg-background/80">
          <ChevronRight />
        </Button>
      </div>
      <div className="flex gap-4 justify-center">
        {images.map((src, index) => (
          <button
            key={index}
            className={cn(
              "relative w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors",
              index === selectedIndex ? "border-primary" : "border-transparent"
            )}
            onClick={() => scrollTo(index)}
          >
            <Image
              src={src}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
