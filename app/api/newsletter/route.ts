// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : ''
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)

    if (!isValidEmail) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const { data: existingSubscriber, error: lookupError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (lookupError) throw lookupError

    const query = existingSubscriber
      ? supabase
          .from('newsletter_subscribers')
          .update({ source: 'homepage', status: 'active' })
          .eq('id', existingSubscriber.id)
      : supabase
          .from('newsletter_subscribers')
          .insert({ email: normalizedEmail, source: 'homepage', status: 'active' })

    const { error: saveError } = await query

    if (saveError) throw saveError
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Newsletter subscription failed:', error)
    return NextResponse.json({ error: 'Subscribe failed' }, { status: 500 })
  }
}
