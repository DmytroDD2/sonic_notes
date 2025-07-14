import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, UserJSON } from '@clerk/nextjs/server'
import prisma from '@/app/lib/db'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.SIGNING_SECRET!
  const headerPayload = await headers()

  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  const payload = await req.json()
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    return new Response('Error verifying webhook', { status: 400 })
  }

  // Handle user.created events
  if (evt.type === 'user.created') {
    const userData = evt.data as UserJSON

    const { id, email_addresses } = userData
    const email = email_addresses?.[0]?.email_address

    if (!id) {
      return new Response('User id missing in webhook event', { status: 400 })
    }

    await prisma.user.create({
      data: {
        clerkUserId: id,
        email: email,
        credits: 2
      }
    })
  }

  return new Response('', { status: 200 })
}
