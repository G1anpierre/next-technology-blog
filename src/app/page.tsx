import {FeaturePosts} from '@/components/FeaturePosts'
import {Hero} from '@/components/Hero'
import {RecentPosts} from '@/components/RecentPosts'

export default async function Home() {
  return (
    <main>
      <Hero />
      <FeaturePosts />
      <RecentPosts />
    </main>
  )
}
