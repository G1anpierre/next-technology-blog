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
}) => (
  <div>
    <h1>
      Notification, {firstName}, {lastName}!
    </h1>
    <p></p>
  </div>
)

export default EmailTemplate
