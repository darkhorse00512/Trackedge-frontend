import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
  setIsShowFull: (value: boolean) => void;
}

export default function ImageCarousel({
  images,
  setIsShowFull,
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((img, i) => (
              <div className="min-w-full" key={i}>
                <img
                  src={img}
                  className="w-full h-auto object-contain cursor-pointer rounded-md"
                  onClick={() => setIsShowFull(true)}
                />
              </div>
            ))}
          </div>
        </div>
        {images.length !== 1 && (
          <div>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/60 hover:bg-white text-gray-800 shadow-md backdrop-blur transition text-2xl"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-white/60 hover:bg-white text-gray-800 shadow-md backdrop-blur transition text-2xl"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* {isModalOpen && (
        <div
          className="absolute inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="overflow-hidden w-full h-full max-w-full max-h-full"
            ref={modalEmblaRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full">
              {images.map((img, i) => (
                <div className="min-w-full flex items-center justify-center" key={i}>
                  <img
                    src={img}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>
      )} */}
    </>
  );
}
