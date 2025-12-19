"use client"

import * as React from "react"
import Image from "next/image"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ImagePlaceholder } from "@/lib/placeholder-images"

interface InteractiveCarouselProps {
  images: ImagePlaceholder[];
  startIndex?: number;
}

export function InteractiveCarousel({ images, startIndex = 0 }: InteractiveCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex })
  const [selectedIndex, setSelectedIndex] = React.useState(startIndex)

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollTo = React.useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return

    const onSelect = (api: any) => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <div
              className="relative flex-[0_0_100%] aspect-video"
              key={image.id}
            >
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/50 hover:bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next image</span>
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  index === selectedIndex ? "bg-primary" : "bg-muted-foreground/50 hover:bg-muted-foreground"
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
