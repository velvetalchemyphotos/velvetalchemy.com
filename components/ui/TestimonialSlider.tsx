'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Testimonial {
  quote: string
  name: string
  role: string
}

interface TestimonialSliderProps {
  testimonials: Testimonial[]
}

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  return (
    <div className="flex flex-col items-center text-center py-24 md:py-14 px-8 md:px-5">
      <div className="font-cormorant text-[80px] md:text-[50px] leading-none text-charcoal mb-4 md:mb-2" aria-hidden>
        &#8220;
      </div>
      <div className="min-h-[160px] md:min-h-[120px] flex items-center justify-center max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="font-cormorant italic text-[36px] md:text-[22px] leading-snug text-charcoal"
          >
            &ldquo;{testimonials[current].quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={`attr-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-poppins text-[11px] uppercase tracking-[0.2em] text-charcoal mt-8"
        >
          &mdash;{testimonials[current].name}, {testimonials[current].role}
        </motion.p>
      </AnimatePresence>
      <div className="flex items-center gap-6 mt-10">
        <button
          onClick={prev}
          className="font-poppins text-[13px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.15em] text-charcoal hover:text-black transition-colors flex items-center gap-2"
        >
          <span>&#8592;</span> Previous
        </button>
        <div className="w-24 md:w-14 h-px bg-charcoal" />
        <button
          onClick={next}
          className="font-poppins text-[13px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.15em] text-charcoal hover:text-black transition-colors flex items-center gap-2"
        >
          Next <span>&#8594;</span>
        </button>
      </div>
    </div>
  )
}
