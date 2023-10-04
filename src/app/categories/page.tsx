import React from 'react'

export const Categories = ({params}: {params: {categorySlug: string}}) => {
  console.log('params :', params.categorySlug)
  return <div>Categories {params.categorySlug}</div>
}
