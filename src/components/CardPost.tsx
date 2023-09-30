import React from 'react'
import Image from 'next/image'

export const CardPost = () => {
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
          <a>Code Quality</a>
          <h3>Title</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            harum quos totam error expedita, eius minima saepe dolores
          </p>
        </div>
      </div>
    </>
  )
}
