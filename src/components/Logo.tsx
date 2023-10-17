import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
    <>
      <span className="sr-only">Dev Notebook</span>
      <Image
        className="h-12 w-auto"
        src="/dev-notebook-high-resolution-logo-color-on-transparent-background.png"
        alt="Dev Logo"
        width={200}
        height={200}
      />
    </>
  )
}
