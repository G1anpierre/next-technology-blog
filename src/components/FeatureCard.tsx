import React from 'react'
import Image from 'next/image'

export const FeatureCard = () => {
  return (
    <div className="relative md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1 xl:row-span-2 xl:col-end-2">
      <div className="absolute inset-0 border rounded-xl overflow-hidden">
        <Image
          src="https://picsum.photos/400/300"
          alt="placeholder image"
          width={400}
          height={300}
          className="w-full h-full brightness-50"
        />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex flex-col gap-4">
            <a className="bg-black border-white border rounded-full py-2 px-4 self-start text-xs">
              Productivity
            </a>
            <p className="font-semibold text-xl">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
