import {FeaturePosts} from '@/components/FeaturePosts'
import {Hero} from '@/components/Hero'
import {RecentPosts} from '@/components/RecentPosts'
import {getClient} from '@/lib/client'
import {gql} from '@apollo/client'

const query = gql`
  query {
    posts {
      data {
        attributes {
          title
          author
          body
          author
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

export default async function Home() {
  const client = getClient()
  const {data} = await client.query({
    query,
    context: {
      fetchOptions: {
        next: {revalidate: 5},
      },
    },
  })

  return (
    <main>
      <Hero />
      <FeaturePosts />
      <RecentPosts />
    </main>
  )
}
