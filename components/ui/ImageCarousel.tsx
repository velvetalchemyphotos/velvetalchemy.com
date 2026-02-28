'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

interface ImageCarouselProps {
  images: string[]
  autoplay?: boolean
  filmstrip?: boolean
  className?: string
  loop?: boolean
  imageClassName?: string
}

export default function ImageCarousel({
  images,
  autoplay = true,
  filmstrip = false,
  className = '',
  loop = true,
  imageClassName = 'object-cover',
}: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop },
    autoplay ? [Autoplay({ delay: 3000, stopOnInteraction: false })] : []
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  if (filmstrip) {
    return (
      <div className={`overflow-hidden ${className}`} ref={emblaRef}>
        <div className="flex gap-3 items-end">
          {images.map((src, i) => (
            <div
              key={i}
              onClick={() => scrollTo(i)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 ${
                i === selectedIndex
                  ? 'w-[430px] h-[280px]'
                  : 'w-[200px] h-[200px] opacity-60'
              }`}
            >
              <Image
                src={src}
                alt={`Gallery ${i + 1}`}
                fill
                className={imageClassName}
                sizes="(max-width: 768px) 200px, 430px"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${className}`} ref={emblaRef}>
      <div className="flex">
        {images.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 w-full">
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              className={imageClassName}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
