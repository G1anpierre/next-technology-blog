import {SendEmailSchema, SendEmailType} from '@/types'

export const sendeEmailToServer = async (formData: SendEmailType) => {
  const validatedData = SendEmailSchema.safeParse(formData)

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
      const response = await fetch(
        new Request('/api/sendEmail', {
          method: 'POST',
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            company,
            phone,
            message,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      )

      const data = await response.json()

      return data.id ? data : {success: false, error: data.message}
    } catch (error) {
      return {success: false, error}
    }
  } else {
    return {success: false, error: validatedData.error}
  }
}
