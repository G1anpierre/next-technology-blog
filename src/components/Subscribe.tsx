'use client'
import {createSubscription} from '@/actions/actions'
import {toast} from 'react-toastify'
import React from 'react'

export const Subscribe = () => {
  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      className="mt-6 sm:flex flex flex-col sm:flex-row gap-2"
      action={async formData => {
        formRef.current?.reset()
        ;('use server')
        const result = await createSubscription(formData)

        // TODO Add confirmation message Toast
        if (result.success) {
          toast.success(`${result.data?.full_name}, successfully subscribed`)
        } else {
          toast.error('Error subscribing')
        }
      }}
    >
      <label htmlFor="firstname" className="sr-only">
        First name
      </label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        autoComplete="given-name"
        placeholder="*Enter your first name"
        required
        className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
      />
      <label htmlFor="lastname" className="sr-only">
        lastname name
      </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        autoComplete="given-name"
        placeholder="*Enter your lastname name"
        required
        className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
      />
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        name="email-address"
        id="email-address"
        autoComplete="email"
        required
        className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
        placeholder="*Enter your email"
      />
      <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0 ">
        <button
          type="submit"
          className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Subscribe
        </button>
      </div>
    </form>
  )
}
