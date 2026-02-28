'use client'

export default function Marquee() {
  const text1 = 'OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ OUR DOORS ARE OPEN ✦ '
  const text2 = 'NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ NOW BOOKING ✦ '

  return (
    <div className="bg-black overflow-hidden py-6">
      <div className="overflow-hidden mb-1">
        <div className="flex animate-marquee-left whitespace-nowrap">
          <span className="font-mattone text-pink uppercase text-[120px] md:text-[60px] leading-none tracking-[0.05em] pr-8">
            {text1}{text1}
          </span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-marquee-right whitespace-nowrap">
          <span className="font-mattone text-white/20 uppercase text-[120px] md:text-[60px] leading-none tracking-[0.05em] pr-8">
            {text2}{text2}
          </span>
        </div>
      </div>
    </div>
  )
}
