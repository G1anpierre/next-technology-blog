import React from 'react'
import mailchimp from '@mailchimp/mailchimp_marketing'
import {SubscriptionResponseSchema, SubscriptionSchema} from '@/types'

export const Subscribe = () => {
  const createSubscription = async (formData: FormData) => {
    'use server'
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const API_SERVER = process.env.MAILCHIMP_API_SERVER
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID

    const email = formData.get('email-address')
    const firstName = formData.get('first-name')
    const lastName = formData.get('lastname-name')

    const subscriptionDataValidated = SubscriptionSchema.safeParse({
      email,
      firstName,
      lastName,
    })

    if (!subscriptionDataValidated.success) {
      console.log(
        'error on subscriptionDataValidated: ',
        subscriptionDataValidated.error,
      )
      return null
    }

    const {
      email: emailValidated,
      firstname: firstNameValidated,
      lastname: lastNameValidated,
    } = subscriptionDataValidated.data

    mailchimp.setConfig({
      apiKey: API_KEY,
      server: API_SERVER,
    })

    try {
      const response = await mailchimp.lists.addListMember(
        AUDIENCE_ID as string,
        {
          email_address: emailValidated,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstNameValidated,
            LNAME: lastNameValidated,
          },
        },
      )

      const subscriptionSchema = SubscriptionResponseSchema.parse(response)

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${subscriptionSchema.full_name}.`,
      )
    } catch (e) {
      console.log('error :', e)
    }
  }

  return (
    <form
      className="mt-6 sm:flex lg:mt-0 flex flex-col sm:flex-row gap-2"
      action={createSubscription}
    >
      <label htmlFor="first-name" className="sr-only">
        First name
      </label>
      <input
        type="text"
        name="first-name"
        id="first-name"
        autoComplete="given-name"
        placeholder="*Enter your first name"
        className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
      />
      <label htmlFor="lastname-name" className="sr-only">
        lastname name
      </label>
      <input
        type="text"
        name="lastname-name"
        id="lastname-name"
        autoComplete="given-name"
        placeholder="*Enter your lastname name"
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
      <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
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
