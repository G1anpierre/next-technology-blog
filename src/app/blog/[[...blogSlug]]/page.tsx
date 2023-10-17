import React from 'react'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import {BlogContent} from '@/components/BlogContent'
import {Banner} from '@/components/Banner'

const query = gql`
  query Post($id: ID!) {
    post(id: $id) {
      data {
        id
        attributes {
          title
          date
          author
          image {
            data {
              attributes {
                size
                name
                caption
                height
                width
                url
              }
            }
          }
          body
          subtitle
        }
      }
    }
  }
`

const Blog = async ({params}: {params: any}) => {
  const id = params?.blogSlug[1]

  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
    variables: {
      id,
    },
  })

  return (
    <div>
      <Banner info={{...data.post.data.attributes}} />
      <BlogContent {...data.post.data.attributes} />
    </div>
  )
}

export default Blog
