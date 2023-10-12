export const POST = async (req: Request) => {
  const {email} = await req.json()
  const API_KEY = process.env.MAILCHIMP_API_KEY
  const API_SERVER = process.env.MAILCHIMP_API_SERVER
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
  return fetch(
    `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
    {
      method: 'POST',
      body: JSON.stringify({email, status: 'subscribed'}),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${API_KEY}`,
      },
    },
  )
}
