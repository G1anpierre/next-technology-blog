import React from 'react'
import Image from 'next/image'
import {PostType} from '@/types'
import Link from 'next/link'

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
            <h2
              key={attributes.name}
              className="uppercase text-indigo-500 font-medium"
            >
              {attributes.name}
            </h2>
          ))}
          <h3 className="font-bold underline underline-offset-4 decoration-indigo-500 decoration-2">
            {title}
          </h3>
          <Link href={`/blog/${slug}`}>
            <p className="font-semibold hover:underline hover:underline-offset-4 hover:decoration-indigo-500 ">
              {subtitle}
            </p>
          </Link>
          <sub className="text-gray-500">Author: {author}</sub>
        </div>
      </div>
    </>
  )
}
