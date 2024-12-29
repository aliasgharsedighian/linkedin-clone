"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/imageCarousel";

interface PageProps {
  images: string[] | undefined;
}

function PostFormImages({ images }: PageProps) {
  const [showMoreImg, setShowMoreImg] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setSelectedNumber(api.selectedScrollSnap());

    api.on("select", () => {
      setSelectedNumber(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (selectedNumber > 4) {
      setShowMoreImg(true);
    } else {
      return;
    }
  }, [selectedNumber]);
  return (
    <div className="flex-1 flex flex-col gap-3 items-center mt-3">
      <div className="flex items-center justify-center">
        {/* <ImageMagnifier width={"334px"} src={images[selectedNumber]} /> */}

        <Carousel
          setApi={setApi}
          className=""
          opts={{
            align: "start",
            loop: false,
          }}
        >
          <CarouselContent className="mx-auto">
            {images?.map((image, i) => (
              <CarouselItem
                key={i}
                className="flex items-start justify-center w-full basis-[100%] p-0 mx-auto my-auto"
              >
                <img
                  className="w-full object-contain"
                  src={image}
                  alt={`upload images ${i + 1}`}
                  width={400}
                  height={800}
                  // priority={i === 0 ? true : false}
                  // loading={i === 0 ? "eager" : "lazy"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {images
        ? images?.length > 1 && (
            <div className="flex items-center justify-center gap-1.5">
              {images?.map((item, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    selectedNumber === i
                      ? "bg-blue-600 cursor-default"
                      : "bg-gray-300 cursor-pointer"
                  }`}
                  onClick={() => api?.scrollTo(i)}
                ></div>
              ))}
            </div>
          )
        : null}
    </div>
  );
}

export default PostFormImages;
