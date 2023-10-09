import React from 'react'
import Image from 'next/image'
import {AttributesType} from '@/types'
import Link from 'next/link'

export const CardPost = ({
  attributes: {title, author, slug, subtitle, categories, image},
  id,
}: AttributesType) => {
  return (
    <>
      <div className="grid grid-rows-[400px_150px] gap-2">
        <div className="border rounded-xl overflow-hidden w-full h-full">
          <Image
            src={image?.data?.attributes.url ?? 'https://picsum.photos/400/300'}
            alt="placeholder image"
            width={400}
            height={300}
            className="w-full h-full object-cover shadow-lg"
          />
        </div>
        <div>
          <div>
            {categories.data.map(({attributes}) => (
              <h2
                key={attributes.name}
                className="uppercase text-indigo-500 font-medium"
              >
                {attributes.name}
              </h2>
            ))}
            <h3 className="font-bold underline underline-offset-4 decoration-indigo-500 decoration-2 mb-3">
              {title}
            </h3>
            <Link href={`/blog/${slug}/${id}`}>
              <p className="font-semibold hover:underline hover:underline-offset-4 hover:decoration-indigo-500 text-ellipsis">
                {subtitle}
              </p>
            </Link>
            <sub className="text-gray-500">Author: {author}</sub>
          </div>
        </div>
      </div>
    </>
  )
}
