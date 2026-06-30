import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      phone,
      email,
      service,
      message,
      source = 'contact-page',
    } = body

    // Validate required fields
    if (!firstName || !phone || !email) {
      return NextResponse.json(
        { error: 'First name, phone, and email are required.' },
        { status: 400 }
      )
    }

    // Insert into Supabase leads table
    const { error } = await supabase.from('leads').insert([
      {
        first_name: firstName,
        last_name: lastName || '',
        phone,
        email,
        service: service || '',
        message: message || '',
        source,
        status: 'new',
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
