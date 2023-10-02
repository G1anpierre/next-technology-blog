import React from 'react'
import Image from 'next/image'
import {PostType} from '@/types'

export const CardPost = ({
  attributes: {title, author, slug, subtitle, categories},
}: PostType) => {
  return (
    <>
      <div className="border rounded-xl overflow-hidden">
        <Image
          src="https://picsum.photos/400/300"
          alt="placeholder image"
          width={400}
          height={300}
          className="w-full h-full brightness-50"
        />
      </div>
      <div className="xl:flex items-center">
        <div>
          {categories.data.map(({attributes}) => (
            <a
              key={attributes.name}
              className="uppercase text-indigo-500 font-medium"
            >
              {attributes.name}
            </a>
          ))}
          <h3 className="font-bold underline underline-offset-4 decoration-indigo-500 decoration-2">
            {title}
          </h3>
          <p className="font-semibold">{subtitle}</p>
          <sub className="text-gray-500">Author: {author}</sub>
        </div>
      </div>
    </>
  )
}
