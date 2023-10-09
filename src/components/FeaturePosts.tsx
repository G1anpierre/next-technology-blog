import React from 'react'
import {FeatureCard} from './FeatureCard'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'
import {PostsSchema} from '@/types'

const query = gql`
  query {
    posts(filters: {featured: {eq: true}}) {
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

export const FeaturePosts = async () => {
  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })

  const validatedPosts = PostsSchema.safeParse(data.posts.data)

  if (!validatedPosts.success) {
    console.log('error on FeaturePosts: ', validatedPosts.error)
    return null
  }

  const [featureCard, firstCardPost, secondCardPost] = validatedPosts.data

  return (
    <div className="py-8 container mx-auto p-2">
      <h2 className="font-semibold text-4xl mb-8 ">Featured Posts</h2>
      <div className="grid gap-5 grid-rows-[400px_400px_400px] md:grid-cols-2 md:grid-rows-[300px_300px]">
        {featureCard && (
          <>
            <FeatureCard {...featureCard} />
          </>
        )}
        <div className="md:col-start-1 md:col-span-1 md:row-start-2 xl:col-start-2 xl:row-start-1 grid xl:grid-flow-col gap-2">
          {firstCardPost && <FeatureCard {...firstCardPost} />}
        </div>
        <div className="md:col-start-2 md:row-start-2 xl:col-start-2 xl:row-start-2 grid xl:grid-flow-col gap-2">
          {secondCardPost && <FeatureCard {...secondCardPost} />}
        </div>
      </div>
    </div>
  )
}
