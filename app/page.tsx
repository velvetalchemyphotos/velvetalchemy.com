'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TestimonialSlider from '@/components/ui/TestimonialSlider'
import Marquee from '@/components/ui/Marquee'
import { testimonials, blogPosts, heroImages, galleryImages } from '@/lib/data'
import { fadeIn, slideInUp } from '@/lib/animations'
import type { Variants } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'


function AnimatedSection({ children, className = '', variants = fadeIn, style }: {
  children: React.ReactNode
  className?: string
  variants?: Variants
  style?: React.CSSProperties
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}


// Portrait card dimensions — matched to reference site (503×683px at top:129px on 1728px viewport)
const CARD_W = 503
const CARD_H = 683
const CARD_TOP = 129
const HERO_MARQUEE_TEXT = 'VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ '

// Hero: static black section, portrait card centered, marquee running over it.
// A gradient at the bottom fades black → white into the next section.
function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  )

  return (
    <div className="relative bg-black overflow-hidden" style={{ height: `${CARD_TOP + CARD_H + 140}px` }}>

      {/* Portrait carousel card */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: CARD_TOP, width: CARD_W, height: CARD_H, zIndex: 1 }}
      >
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex h-full">
            {heroImages.map((src, i) => (
              <div key={i} className="relative flex-shrink-0 w-full h-full">
                <Image
                  src={src}
                  alt={`Hero slide ${i + 1}`}
                  fill
                  className="object-cover object-top"
                  sizes="503px"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee running in front of portrait */}
      <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <div className="flex animate-marquee-left whitespace-nowrap">
          <span
            className="font-mattone text-white uppercase leading-none select-none"
            style={{ fontSize: 'clamp(80px, 10vw, 140px)', letterSpacing: '0.3em' }}
          >
            {HERO_MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Gradient fade: black → white at the bottom, blending into the next section */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        style={{ height: 200, background: 'linear-gradient(to bottom, transparent, #ffffff)', zIndex: 3 }}
      />
    </div>
  )
}

// Gallery horizontal strip — tall portrait images, auto-scrolling
function GalleryStrip() {
  const allImages = [...galleryImages, ...galleryImages]
  return (
    <div className="overflow-hidden">
      <div className="flex gap-3 animate-gallery-scroll" style={{ width: 'max-content' }}>
        {allImages.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 h-[550px] w-[300px]">
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <main>
      {/* 1. HERO */}
      <HeroCarousel />

      {/* 2. INTRO — Authentic Style — white bg, text + button only */}
      <section className="bg-white flex flex-col items-center text-center px-8 pt-16 pb-24 gap-8">
        <AnimatedSection>
          <h1
            className="font-mattone uppercase text-black leading-[0.9]"
            style={{ fontSize: 'clamp(60px, 10vw, 120px)', letterSpacing: '0.15em' }}
          >
            Forever<br />Yours
          </h1>
        </AnimatedSection>
        <p
          className="font-cormorant text-black"
          style={{ fontSize: 'clamp(22px, 3vw, 41px)' }}
        >
          capturing love stories <em>the way they actually feel</em>
        </p>
        <p className="font-poppins text-[16px] text-black/70 max-w-xl leading-relaxed">
          We believe your wedding photos should feel like <em>you</em> — unposed, alive, and full of the little details that made the day yours. Shot on 35mm film and digital, every image is crafted to stand the test of time.
        </p>
        <Link href="/contact" className="btn-outline-black mt-2">
          Book Your Date
        </Link>
      </section>

      {/* 3. FILM & DIGITAL — full-width image with text overlay */}
      <section className="relative w-full overflow-hidden" style={{ height: 550 }}>
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=700&fit=crop&q=80"
          alt="Film & Digital showcase"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mattone text-white uppercase leading-none"
            style={{ fontSize: 'clamp(50px, 6vw, 65px)', letterSpacing: '0.3em' }}
          >
            FILM &amp; DIGITAL
          </span>
        </div>
      </section>

      {/* 4. PHOTOGRAPHY — full-width image with centered text overlay */}
      <section className="relative w-full overflow-hidden" style={{ height: 550 }}>
        <Image
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&h=600&fit=crop&q=80"
          alt="Photography showcase"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-mattone text-white uppercase leading-none"
            style={{ fontSize: 'clamp(50px, 6vw, 65px)', letterSpacing: '0.3em' }}
          >
            PHOTOGRAPHY
          </span>
        </div>
      </section>

      {/* 5. GALLERY STRIP */}
      <section className="bg-white">
        <div className="pt-6" />
        <GalleryStrip />
        <div className="flex justify-center py-12">
          <Link href="/galleries" className="btn-outline-black">
            Portfolio
          </Link>
        </div>
      </section>

      {/* 6. MEET THE PHOTOGRAPHER */}
      <section className="flex md:flex-col" style={{ minHeight: 845 }}>
        {/* Left — black */}
        <div
          className="flex flex-col justify-center px-16 md:px-8 py-20 gap-6 bg-black"
          style={{ flex: '0 0 54%' }}
        >
          <h2
            className="font-mattone text-white uppercase leading-[0.95]"
            style={{ fontSize: 'clamp(40px, 5.5vw, 75px)', letterSpacing: '0.05em' }}
          >
            Meet The<br />Photographer
          </h2>
          <p className="font-cormorant italic text-white" style={{ fontSize: 'clamp(22px, 2.5vw, 30px)' }}>
            Hi, I&apos;m Velvet
          </p>
          <p className="font-poppins text-[14px] text-white/80 max-w-lg leading-relaxed">
            Direct trade fixie chia ennui bespoke. Lyft raclette artisan dreamcatcher, lumbersexual kale chips austin. Banh mi DIY meggings four dollar toast readymade JOMO viral wolf williamsburg tattooed meh biodiesel put a bird on it organic. Intelligentsia vape hammock scenester fanny pack. Kickstarter pork belly cupping chillwave poke. Taxidermy kogi williamsburg, bicycle rights selvage authentic quinoa typewriter food truck knausgaard narwhal kitsch vegan. Put a bird on it godard portland cliche cardigan before they sold out.
          </p>
          <Link href="/about" className="btn-outline self-start mt-2">
            About Me
          </Link>
        </div>

        {/* Right — photo */}
        <div className="relative md:h-[400px]" style={{ flex: '0 0 46%' }}>
          <Image
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&h=1200&fit=crop&q=80"
            alt="Photographer portrait"
            fill
            className="object-cover"
            sizes="46vw"
          />
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="bg-mist">
        <TestimonialSlider testimonials={testimonials} />
      </section>

      {/* 8. FROM THE BLOG */}
      <section className="bg-white py-16">
        <AnimatedSection className="mb-10 px-8 md:px-4 max-w-5xl mx-auto">
          <h2
            className="font-mattone uppercase text-black"
            style={{ fontSize: 'clamp(36px, 5vw, 65px)', letterSpacing: '0.1em' }}
          >
            From the Blog
          </h2>
        </AnimatedSection>

        <div className="px-8 md:px-4 max-w-5xl mx-auto">
          {/* Featured post */}
          {blogPosts.filter(p => p.featured).map(post => (
            <AnimatedSection key={post.id} className="mb-12" variants={slideInUp}>
              <div className="relative w-full mb-4 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="100vw"
                />
              </div>
              <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-black mb-2">
                {post.category}
              </p>
              <h3 className="font-cormorant text-[28px] text-black border-b border-black pb-3">
                {post.title}
              </h3>
            </AnimatedSection>
          ))}

          {/* Two smaller posts */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-8 mb-12">
            {blogPosts.filter(p => !p.featured).map(post => (
              <AnimatedSection key={post.id} variants={slideInUp}>
                <div className="relative w-full mb-3 overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="50vw"
                  />
                </div>
                <p className="font-poppins text-[11px] uppercase tracking-[0.2em] text-black mb-2">
                  {post.category}
                </p>
                <h3 className="font-cormorant text-[28px] text-black border-b border-black pb-3">
                  {post.title}
                </h3>
              </AnimatedSection>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/blog" className="btn-outline-black">
              Read The Blog
            </Link>
          </div>
        </div>
      </section>

      {/* 9. MARQUEE */}
      <Marquee />
    </main>
  )
}
