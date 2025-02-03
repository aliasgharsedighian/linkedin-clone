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
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Image from "next/image";

interface PageProps {
  images: string[] | undefined;
  setCurrentIndex?: any;
  edit: boolean;
  removeFiles: any;
  setRemoveFiles: any;
}

function PostFormImages({
  images,
  setCurrentIndex,
  edit,
  removeFiles,
  setRemoveFiles,
}: PageProps) {
  const [showMoreImg, setShowMoreImg] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

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
                className="flex items-start justify-center w-full basis-[100%] p-0 mx-auto my-auto h-full"
              >
                <div className="relative h-full w-full">
                  {edit && (
                    <X
                      onClick={() => {
                        // console.log(i);
                        setCurrentIndex(undefined);
                        setTimeout(() => {
                          setCurrentIndex(i);
                        }, 100);
                        if (i === images.length) {
                          api?.scrollTo(i - 1);
                        }
                        if (i === 0) {
                          api?.scrollTo(0);
                        }
                        setOpenDialog(false);
                        setRemoveFiles((prev: any) => {
                          const updatedImages = [...prev, image];
                          const uniqueImages = Array.from(
                            new Set(updatedImages)
                          );
                          return uniqueImages;
                        });
                      }}
                      className="absolute w-5 h-5 p-0.5 rounded-md right-3 top-2 cursor-pointer bg-white text-black opacity-60 z-10"
                    />
                  )}
                  <Image
                    className="w-full object-contain flex items-center justify-center h-full"
                    src={image}
                    alt={`upload images ${i + 1}`}
                    width={400}
                    height={800}
                    // priority={i === 0 ? true : false}
                    // loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
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
