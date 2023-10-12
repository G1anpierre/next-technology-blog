'use server'
import {SubscriptionResponseSchema, SubscriptionSchema} from '@/types'
import mailchimp from '@mailchimp/mailchimp_marketing'

export const createSubscription = async (formData: FormData) => {
  const API_KEY = process.env.MAILCHIMP_API_KEY
  const API_SERVER = process.env.MAILCHIMP_API_SERVER
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID

  const email = formData.get('email-address')
  const firstname = formData.get('firstname')
  const lastname = formData.get('lastname')

  const subscriptionDataValidated = SubscriptionSchema.safeParse({
    email,
    firstname,
    lastname,
  })

  if (!subscriptionDataValidated.success) {
    console.log(
      'error on subscriptionDataValidated: ',
      subscriptionDataValidated.error,
    )

    return {
      error: subscriptionDataValidated.error,
    }
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
      `Successfully added contact as an audience member. The contact's Name is ${subscriptionSchema.full_name}.`,
    )
  } catch (e) {
    console.log('error :', e)
    return {
      error: e,
    }
  }
}
