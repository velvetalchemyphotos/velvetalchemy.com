'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import TestimonialSlider from '@/components/ui/TestimonialSlider'
import Marquee from '@/components/ui/Marquee'
import { testimonials, blogPosts, heroImages, galleryImages, heroSmallImages } from '@/lib/data'
import { fadeIn, slideInUp } from '@/lib/animations'
import type { Variants } from 'framer-motion'


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


const HERO_MARQUEE_TEXT = 'VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ VELVET ALCHEMY ✦ '

// Scattered image positions for stage 3
const SMALL_IMAGE_POSITIONS = [
  { top: '5%', left: '3%', width: 250, height: 170 },
  { top: '8%', right: '5%', width: 200, height: 280 },
  { bottom: '15%', left: '8%', width: 280, height: 200 },
  { bottom: '10%', right: '3%', width: 220, height: 300 },
  { top: '35%', left: '1%', width: 180, height: 240 },
  { bottom: '5%', left: '38%', width: 200, height: 150 },
  { top: '3%', right: '30%', width: 170, height: 220 },
]

// Hero: 3-stage scroll animation
// Stage 1: Portrait card on black + marquee
// Stage 2: Large background image fades in behind portrait
// Stage 3: Background fades out, scattered small images fade in
function HeroSection() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Marquee text — visible throughout
  const marqueeOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

  // Portrait card — slight shrink over time
  const portraitScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  // Stage 2: Large background image fades in then out
  const bgImageOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.5, 0.58], [0, 1, 1, 0])

  // Stage 3: Scattered small images fade in
  const smallImagesOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1])

  // Entire content fades out at the very end
  const contentOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0])

  return (
    <section ref={heroRef} className="relative hero-height">
      {/* Black background that fades to white at the bottom */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, #000 85%, #fff 100%)',
      }} />

      {/* Sticky container — stays fixed while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: 1 }}>
        <motion.div className="w-full h-full relative" style={{ opacity: contentOpacity }}>

          {/* Layer 1 (z:1): Scattered small images — stage 3 */}
          <motion.div
            className="absolute inset-0 pointer-events-none md:hidden"
            style={{ zIndex: 1, opacity: smallImagesOpacity }}
          >
            {heroSmallImages.map((src, i) => {
              const pos = SMALL_IMAGE_POSITIONS[i]
              return (
                <div
                  key={i}
                  className="absolute overflow-hidden rounded-lg"
                  style={{
                    ...pos,
                    width: pos.width,
                    height: pos.height,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Detail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes={`${pos.width}px`}
                  />
                </div>
              )
            })}
          </motion.div>

          {/* Layer 2 (z:2): Full-viewport background image — stage 2 */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 2, opacity: bgImageOpacity }}
          >
            <Image
              src={heroImages[3]}
              alt="Background hero"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* Layer 3 (z:3): Marquee text */}
          <motion.div
            className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
            style={{ zIndex: 3, opacity: marqueeOpacity }}
          >
            <div className="flex animate-marquee-left whitespace-nowrap">
              <span
                className="font-mattone text-white uppercase leading-none select-none hero-marquee-text"
              >
                {HERO_MARQUEE_TEXT}
              </span>
            </div>
          </motion.div>

          {/* Layer 4 (z:4): Portrait card — centered, static */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 4 }}>
            <motion.div
              className="relative"
              style={{ scale: portraitScale, width: 'clamp(260px, 70vw, 503px)', height: 'clamp(354px, 95vw, 683px)' }}
            >
              <Image
                src={heroImages[0]}
                alt="Hero portrait"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 70vw, 503px"
                priority
              />
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

// Gallery horizontal strip — tall portrait images, auto-scrolling
function GalleryStrip() {
  const allImages = [...galleryImages, ...galleryImages]
  return (
    <div className="overflow-hidden">
      <div className="flex gap-3 animate-gallery-scroll" style={{ width: 'max-content' }}>
        {allImages.map((src, i) => (
          <div key={i} className="relative flex-shrink-0 h-[550px] md:h-[380px] w-[300px] md:w-[210px]">
            <Image
              src={src}
              alt={`Gallery ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 210px, 300px"
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
      <HeroSection />

      {/* 2. INTRO — Authentic Style — white bg, text + button only */}
      <section className="bg-white flex flex-col items-center text-center px-8 md:px-5 pt-16 md:pt-10 pb-24 md:pb-16 gap-8 md:gap-6">
        <AnimatedSection>
          <h1
            className="font-mattone uppercase text-black leading-[0.9]"
            style={{ fontSize: 'clamp(44px, 10vw, 120px)', letterSpacing: '0.15em' }}
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
      <section className="relative w-full overflow-hidden fullwidth-section-height">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&h=700&fit=crop&q=80"
          alt="Film & Digital showcase"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mattone text-white uppercase leading-none overlay-heading">
            FILM &amp; DIGITAL
          </span>
        </div>
      </section>

      {/* 4. PHOTOGRAPHY — full-width image with centered text overlay */}
      <section className="relative w-full overflow-hidden fullwidth-section-height">
        <Image
          src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1600&h=600&fit=crop&q=80"
          alt="Photography showcase"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mattone text-white uppercase leading-none overlay-heading">
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
      <section className="flex md:flex-col-reverse meet-section">
        {/* Left — black */}
        <div
          className="flex flex-col justify-center px-16 md:px-6 py-20 gap-6 bg-black meet-left"
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
        <div className="relative md:h-[400px] meet-right">
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
              <h3 className="font-cormorant text-[28px] md:text-[22px] text-black border-b border-black pb-3">
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
                <h3 className="font-cormorant text-[28px] md:text-[22px] text-black border-b border-black pb-3">
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
