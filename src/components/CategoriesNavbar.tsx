import React from 'react'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import Link from 'next/link'
import {Categories, CategoriesSchema} from '@/types'

const queryCategories = gql`
  query {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`

export const CategoriesNavbar = async () => {
  const client = getClient()
  const {data: dataCategories} = await client.query({
    query: queryCategories,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })

  const validatedCategories = Categories.safeParse(
    dataCategories.categories.data,
  )

  if (!validatedCategories.success) {
    console.log('error on CategoriesNavbar: ', validatedCategories.error)
    return null
  }

  return (
    <ul className="py-8 container mx-auto p-2 flex flex-wrap gap-5 border-b-4 border-indigo-500">
      {validatedCategories.data.map(element => (
        <li
          key={element.id}
          className="px-4 py-2 border-neutral-950 rounded-full border-2 hover:border-indigo-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          <Link href={`/categories/${element.attributes.name}`}>
            {element.attributes.name.toUpperCase()}
          </Link>
        </li>
      ))}
    </ul>
  )
}
