import React from 'react'
import Image from 'next/image'
import {AttributesType} from '@/types'
import Link from 'next/link'
import {formatDates} from '@/utils/date'

export const CardPost = ({
  attributes: {title, author, slug, subtitle, categories, image, date},
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
              <Link
                href={`/categories/${attributes.name}`}
                key={attributes.name}
              >
                <h2 className="uppercase text-primary font-medium hover:text-secondary">
                  {attributes.name}
                </h2>
              </Link>
            ))}
            <h3 className="font-bold underline underline-offset-4 decoration-secondary decoration-2 mb-3">
              {title}
            </h3>
            <Link href={`/blog/${slug}/${id}`}>
              <p className="font-semibold hover:underline hover:decoration-2 hover:underline-offset-4 hover:decoration-secondary text-ellipsis">
                {subtitle}
              </p>
            </Link>
            <div className="flex justify-between items-center w-full">
              <sub className="text-gray-500">Author: {author}</sub>
              <span className="text-xs text-gray-500">{formatDates(date)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
