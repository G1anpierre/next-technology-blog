import React from 'react'
import {CheckCircleIcon, InformationCircleIcon} from '@heroicons/react/20/solid'
import {PostType} from '@/types'
import MarkDown from 'react-markdown'
import {formatDates} from '@/utils/date'

export const BlogContent = (attributes: PostType) => {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-primary">
          {formatDates(attributes.date)}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {attributes.title}
        </h1>
        <div className="mt-10">
          <article className="prose prose-img:rounded-xl prose-headings:underline max-w-none">
            <MarkDown>{attributes.body}</MarkDown>
          </article>
        </div>
      </div>
    </div>
  )
}
