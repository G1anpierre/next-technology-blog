import React from 'react'

const Blog = ({params}: {params: {blogSlug: string}}) => {
  console.log('params :', params.blogSlug)
  return <div>Blog: {params.blogSlug}</div>
}

export default Blog
