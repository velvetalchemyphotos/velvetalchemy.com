'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLeft = [
  { label: 'About', href: '/about' },
  { label: 'Info', href: '/investment' },
  { label: 'Mentorship', href: '/mentorship' },
  { label: 'Blog', href: '/blog' },
]

const navRight = [
  { label: 'Portfolio', href: '/galleries' },
  { label: 'Experience', href: '/experience' },
  { label: 'Inquire', href: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white">
        <div className="flex items-center justify-between px-8 md:px-4 h-[60px]">
          {/* Left nav — desktop */}
          <nav className="flex gap-8 md:hidden">
            {navLeft.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-poppins text-[13px] uppercase tracking-[0.2em] text-black transition-colors hover:text-pink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Center logo */}
          <Link
            href="/"
            className="font-mattone text-[22px] uppercase tracking-[0.25em] text-black absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
          >
            Velvet Alchemy
          </Link>

          {/* Right nav — desktop */}
          <nav className="flex gap-8 md:hidden items-center">
            {navRight.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-poppins text-[13px] uppercase tracking-[0.2em] text-black transition-colors hover:text-pink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Hamburger — mobile */}
          <button
            className="hidden md:flex flex-col gap-1.5 ml-auto"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block w-6 h-px bg-black"
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 text-white font-poppins text-[11px] uppercase tracking-[0.2em]"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
            {[...navLeft, ...navRight].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="font-poppins text-white text-[11px] uppercase tracking-[0.3em] hover:text-pink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
