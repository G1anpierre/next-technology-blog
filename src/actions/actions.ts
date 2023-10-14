'use server'
import {
  SendEmailSchema,
  SendEmailType,
  SubscriptionResponseSchema,
  SubscriptionSchema,
} from '@/types'
import mailchimp from '@mailchimp/mailchimp_marketing'
import {Resend} from 'resend'
import EmailTemplate from '@/components/EmailTemplate'

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
    return {
      success: true,
      data: subscriptionSchema,
    }
  } catch (e) {
    return {
      success: false,
      error: e,
    }
  }
}

export const sendEmail = async (formData: SendEmailType) => {
  console.log('formData: ', formData)
  const resend = new Resend(process.env.RESEND_API_KEY)

  const validatedData = SendEmailSchema.safeParse(formData)
  console.log('validatedData :', validatedData)

  if (validatedData.success) {
    const {
      firstName,
      lastName,
      email,
      company,
      phone = '',
      message,
    } = validatedData.data
    try {
      const data = await resend.emails.send({
        from: 'DevNotebook <onboarding@resend.dev>',
        to: ['fgianpierre@gmail.com'],
        subject: 'Contact Form Submission',
        react: EmailTemplate({
          firstName,
          lastName,
          email,
          company,
          phone,
          message,
        }) as React.ReactElement,
      })

      return {success: true, data}
    } catch (error) {
      return {success: false, error}
    }
  } else {
    return {success: false, error: validatedData.error}
  }
}
