import React from 'react'
import {CardPost} from './CardPost'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import {PostsSchema} from '@/types'

const query = gql`
  query {
    posts(
      sort: "date:desc"
      filters: {featured: {eq: false}}
      pagination: {page: 1, pageSize: 6}
    ) {
      data {
        attributes {
          title
          author
          body
          author
          subtitle
          slug
          categories {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`

export const RecentPosts = async () => {
  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })
  const validatedRecentPosts = PostsSchema.parse(data.posts.data)

  return (
    <div className="py-8 container mx-auto p-2">
      <h2 className="font-semibold text-4xl mb-8">Recent Posts</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {validatedRecentPosts.map(post => (
          <div key={post.attributes.title} className="grid gap-2">
            <CardPost {...post} />
          </div>
        ))}
      </div>
    </div>
  )
}
