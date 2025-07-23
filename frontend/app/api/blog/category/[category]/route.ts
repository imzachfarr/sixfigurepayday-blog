import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001'

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const queryString = searchParams.toString()
    
    const response = await fetch(`${BACKEND_URL}/api/blog/category/${params.category}?${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch category posts')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching category posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category posts' },
      { status: 500 }
    )
  }
} 