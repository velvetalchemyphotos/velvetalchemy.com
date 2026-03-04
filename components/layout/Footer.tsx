import Image from 'next/image'
import Link from 'next/link'
import { instagramImages } from '@/lib/data'

const mainPages = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Investment', href: '/investment' },
  { label: 'Portfolio', href: '/galleries' },
  { label: 'Inquire', href: '/contact' },
]

const bonusPages = [
  { label: 'Mini Sales Page / Course', href: '#' },
  { label: 'Experience', href: '/experience' },
  { label: 'Opt-in', href: '#' },
  { label: 'Instagram Links', href: '#' },
  { label: 'Coming Soon', href: '/coming-soon' },
  { label: '404 Not found', href: '/not-found' },
]

const blogPages = [
  { label: 'Post List', href: '/blog' },
  { label: 'Category', href: '/blog' },
  { label: 'Search', href: '/blog' },
  { label: 'Single Post', href: '/blog' },
]

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Instagram Strip */}
      <div className="flex w-full overflow-hidden">
        {instagramImages.map((src, i) => (
          <div key={i} className="relative flex-1 h-[200px] md:h-[120px]">
            <Image
              src={src}
              alt={`Instagram ${i + 1}`}
              fill
              className="object-cover"
              sizes="14vw"
            />
          </div>
        ))}
      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-4 md:grid-cols-2 gap-12 md:gap-8 px-16 md:px-6 py-16 md:py-10">
        {/* Main Pages */}
        <div>
          <h4 className="font-poppins text-[11px] uppercase tracking-[0.2em] text-black font-500 mb-6">
            Main Pages
          </h4>
          <ul className="flex flex-col gap-3">
            {mainPages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="font-cormorant text-[16px] text-black hover:text-pink transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bonus Pages */}
        <div>
          <h4 className="font-poppins text-[11px] uppercase tracking-[0.2em] text-black font-500 mb-6">
            Bonus Pages
          </h4>
          <ul className="flex flex-col gap-3">
            {bonusPages.map((p) => (
              <li key={p.label}>
                <Link
                  href={p.href}
                  className="font-cormorant text-[16px] text-black hover:text-pink transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Pages */}
        <div>
          <h4 className="font-poppins text-[11px] uppercase tracking-[0.2em] text-black font-500 mb-6">
            Blog Pages
          </h4>
          <ul className="flex flex-col gap-3">
            {blogPages.map((p) => (
              <li key={p.label}>
                <Link
                  href={p.href}
                  className="font-cormorant text-[16px] text-black hover:text-pink transition-colors"
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Subscribe + Social */}
        <div className="flex flex-col gap-6">
          <button className="btn-outline-black self-start">Subscribe</button>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Pinterest" className="text-black hover:text-pink transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-black hover:text-pink transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok" className="text-black hover:text-pink transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-black hover:text-pink transition-colors">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-between items-center px-16 md:px-6 pb-8 md:flex-col md:gap-3 md:items-start">
        <p className="font-poppins text-[11px] text-black/50">
          @2025 Velvet Alchemy, all rights reserved
        </p>
        <a href="#" className="font-poppins text-[11px] uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors">
          Site Credit
        </a>
      </div>
    </footer>
  )
}
