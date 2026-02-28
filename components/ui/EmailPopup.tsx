'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function EmailPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('va-popup-seen')) {
      const timer = setTimeout(() => setVisible(true), 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    localStorage.setItem('va-popup-seen', '1')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setVisible(false)
      localStorage.setItem('va-popup-seen', '1')
    }, 2000)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
          <div className="relative bg-pink rounded-[50px] p-12 max-w-md w-full text-center">
            <button
              onClick={handleClose}
              className="absolute top-6 right-8 font-poppins text-black text-sm uppercase tracking-[0.2em]"
            >
              ✕
            </button>
            {submitted ? (
              <p className="font-cormorant italic text-2xl text-black">
                Thank you for joining!
              </p>
            ) : (
              <>
                <h3 className="font-mattone uppercase text-[32px] text-black mb-4">
                  Join Our List
                </h3>
                <p className="font-poppins text-sm text-black/70 mb-6">
                  You can embed an email signup form in this cute pop up by pasting the code for one in a blank embed box.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-[40px] border border-black/20 bg-white/60 font-poppins text-sm text-black placeholder:text-black/40 outline-none"
                  />
                  <button type="submit" className="btn-primary">
                    Subscribe
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
