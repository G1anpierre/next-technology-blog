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
            <a key={attributes.name}>{attributes.name}</a>
          ))}
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <sub>{author}</sub>
        </div>
      </div>
    </>
  )
}
