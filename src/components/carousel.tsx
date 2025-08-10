"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Product } from "@/lib/definitions";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  products: Product[];
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export function Carousel({ products }: CarouselProps) {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const [isHovered, setIsHovered] = React.useState(false);

  const productIndex = page % products.length;

  const paginate = React.useCallback((newDirection: number) => {
    setPage(([currentPage, _]) => [currentPage + newDirection, newDirection]);
  }, []);

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 1500);
    return () => clearInterval(interval);
  }, [page, isHovered, paginate]);

  return (
    <div
      className="relative h-[600px] w-full flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute"
        >
          <ProductCard product={products[productIndex]} className="w-[400px]" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute left-4 z-10">
        <Button size="icon" onClick={() => paginate(-1)}>
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute right-4 z-10">
        <Button size="icon" onClick={() => paginate(1)}>
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
