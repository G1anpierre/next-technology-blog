import React from 'react'
import {CardPost} from './CardPost'
import {FeatureCard} from './FeatureCard'

export const FeaturePosts = () => {
  return (
    <div className="py-8 container mx-auto p-2">
      <h2 className="font-semibold text-2xl mb-8">Featured Posts</h2>
      <div className="grid gap-5 grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-[300px_300px]">
        <FeatureCard />
        <div className="md:col-start-1 md:col-span-1 md:row-start-2 xl:col-start-2 xl:row-start-1 grid xl:grid-flow-col gap-2">
          <CardPost />
        </div>
        <div className="md:col-start-2 md:row-start-2 xl:col-start-2 xl:row-start-2 grid xl:grid-flow-col gap-2">
          <CardPost />
        </div>
      </div>
    </div>
  )
}
