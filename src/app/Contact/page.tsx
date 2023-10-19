import {ContactForm} from '@/components/ContactForm'
import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'Contact',
  description: 'Contact us',
}

export default async function Contact() {
  return (
    <div className="relative bg-white">
      <div className="lg:absolute lg:inset-0 lg:left-1/2">
        <Image
          className="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full"
          src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80"
          alt="people working on laptops"
          width={1920}
          height={2560}
        />
      </div>
      <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
        <div className="px-6 lg:px-8">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Lets work together
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              We are passionate about helping businesses of all sizes succeed in
              the digital age. Whether you are looking to develop a new software
              product, improve your existing technology infrastructure, or
              simply get some expert advice, we are here to help.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
