import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: '#FFCCF1',
        charcoal: '#25261F',
        mist: '#F0F2F4',
        lavender: '#E2E0E6',
      },
      fontFamily: {
        mattone:    ['var(--font-mattone)', 'sans-serif'],
        cormorant:  ['var(--font-cormorant)', 'serif'],
        poppins:    ['var(--font-poppins)', 'sans-serif'],
        instrument: ['var(--font-instrument)', 'serif'],
      },
      screens: {
        md: { max: '768px' },
      },
    },
  },
  plugins: [],
}

export default config
