import React from 'react'
import Image from 'next/image'
import {PostType} from '@/types'
import Link from 'next/link'

export const FeatureCard = ({
  attributes: {subtitle, categories, image},
}: PostType) => {
  return (
    <div className="relative md:col-start-1 md:col-span-2 md:row-start-1 md:row-span-1 xl:row-span-2 xl:col-end-2">
      <div className="absolute inset-0 border rounded-xl overflow-hidden">
        <Image
          src={image.data.attributes.url ?? 'https://picsum.photos/400/300'}
          alt="placeholder image"
          width={400}
          height={300}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <div className="flex flex-col gap-4">
            {categories.data.map(({attributes}) => (
              <Link
                href={`/categories/${attributes.name}`}
                key={attributes.name}
                className="bg-black border-white border-2 rounded-full py-2 px-4 self-start text-xs uppercase"
              >
                {attributes.name}
              </Link>
            ))}
            <p className="font-semibold">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
