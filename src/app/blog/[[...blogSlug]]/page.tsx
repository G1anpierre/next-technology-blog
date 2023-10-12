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

  const info = {
    title: 'Blog',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.',
  }

  return (
    <div>
      <Banner info={info} />
      <BlogContent {...data.post.data.attributes} />
    </div>
  )
}

export default Blog
