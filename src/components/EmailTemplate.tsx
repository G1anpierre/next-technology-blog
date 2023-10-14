import * as React from 'react'

interface EmailTemplateProps {
  firstName: string
  lastName: string
  email: string
  company: string
  phone: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  company,
  phone,
  message,
}) => (
  <div>
    <h1>
      Notification from, {firstName}, {lastName}!
    </h1>
    <p>{email}</p>
    <p>{company}</p>
    <p>{phone}</p>
    <p>{message}</p>
  </div>
)

export default EmailTemplate
