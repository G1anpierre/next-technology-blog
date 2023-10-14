import EmailTemplate from '@/components/EmailTemplate'
import {SendEmailSchema, SendEmailType} from '@/types'
import {Resend} from 'resend'
import {NextResponse} from 'next/server'

export const POST = async (request: Request) => {
  const formData = await request.json()
  const resend = new Resend(process.env.RESEND_API_KEY)

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
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json(error)
    }
  } else {
    return NextResponse.json(validatedData.error)
  }
}
