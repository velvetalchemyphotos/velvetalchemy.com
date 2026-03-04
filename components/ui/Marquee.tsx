'use client'

export default function Marquee() {
  const text1 = 'OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ '
  const text2 = 'NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ '

  return (
    <div className="bg-black overflow-hidden py-6 md:py-4">
      <div className="overflow-hidden mb-1">
        <div className="flex animate-marquee-left whitespace-nowrap">
          <span className="font-mattone text-pink uppercase text-[120px] md:text-[42px] leading-none tracking-[0.05em] pr-8 md:pr-4">
            {text1}{text1}
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-marquee-right whitespace-nowrap">
          <span className="font-mattone text-white/20 uppercase text-[120px] md:text-[42px] leading-none tracking-[0.05em] pr-8 md:pr-4">
            {text2}{text2}
          </span>
        </div>
      </div>
    </div>
  )
}
