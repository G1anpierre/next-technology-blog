import React from 'react'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import {Icon} from './Icon'
import {ValuesSchema} from '@/types'

const query = gql`
  query {
    about {
      data {
        attributes {
          values {
            title
            description
            valuesList {
              id
              title
              description
              icon
            }
          }
        }
      }
    }
  }
`
export const HeroValues = async () => {
  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })

  const validatedValues = ValuesSchema.safeParse(
    data.about.data.attributes.values,
  )

  if (!validatedValues.success) {
    console.log('error :', validatedValues.error)
    return null
  }

  const {title, description, valuesList} = validatedValues.data

  return (
    <div className="mx-auto mt-32 max-w-7xl px-6 sm:my-40 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-900">{description}</p>
      </div>
      <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-900 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
        {valuesList.map(value => (
          <div key={value.id} className="relative pl-9">
            <dt className="inline font-semibold text-gray-900">
              <Icon icon={value.icon} />
              {value.title}
            </dt>{' '}
            <dd className="inline">{value.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
