import React from 'react'
import Image from 'next/image'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import {HeroSchema} from '@/types'

const query = gql`
  query {
    about {
      data {
        attributes {
          hero {
            title
            description
            image {
              data {
                attributes {
                  url
                  width
                  height
                  size
                }
              }
            }
          }
        }
      }
    }
  }
`

export const HeroAbout = async () => {
  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })

  const validatedHero = HeroSchema.safeParse(data.about.data.attributes.hero)

  if (!validatedHero.success) {
    console.log('error :', validatedHero.error)
    return null
  }

  const {title, image, description} = validatedHero.data
  return (
    <div className="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
      <div
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
            {title}
          </h1>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-lg leading-8 text-gray-600">{description}</p>
          </div>
          <Image
            src={
              image.data.attributes.url ??
              'https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80'
            }
            alt="image hero"
            width={200}
            height={200}
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36 object-center"
          />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t text-gray-900 sm:h-32" />
    </div>
  )
}
