import React from 'react'
import {CardPost} from './CardPost'

export const RecentPosts = () => {
  const arrayOfSix = Array.from(Array(6).keys())
  return (
    <div className="py-8 container mx-auto p-2">
      <h2 className="font-semibold text-2xl mb-8">RecentPosts</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {arrayOfSix.map(element => (
          <div key={element}>
            <CardPost />
          </div>
        ))}
      </div>
    </div>
  )
}
