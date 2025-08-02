import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    // Validate input
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      )
    }

    // In a real application, you would:
    // 1. Save to database
    // 2. Send to email service (Mailchimp, ConvertKit, etc.)
    // 3. Send to CRM (HubSpot, Salesforce, etc.)
    // 4. Send welcome email
    // 5. Add to retargeting pixels

    console.log('New lead captured:', { name, email, phone, timestamp: new Date().toISOString() })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      data: { name, email, phone }
    })

  } catch (error) {
    console.error('Error capturing lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 