import { NextRequest, NextResponse } from 'next/server'
import { calculateQuotes, QuoteRequest } from '@/lib/quote-calculator'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { zipCode, insuranceType, email, phoneNumber } = body

    if (!zipCode || !insuranceType || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: zipCode, insuranceType, and email are required' },
        { status: 400 }
      )
    }

    // Validate ZIP code (5 digits)
    if (!/^\d{5}$/.test(zipCode)) {
      return NextResponse.json(
        { error: 'Invalid ZIP code. Please enter a 5-digit ZIP code.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format' },
        { status: 400 }
      )
    }

    // Validate insurance type
    const validTypes = ['auto', 'farm', 'home', 'renters', 'life']
    if (!validTypes.includes(insuranceType)) {
      return NextResponse.json(
        { error: `Invalid insurance type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Prepare quote request
    const quoteRequest: QuoteRequest = {
      zipCode,
      insuranceType,
      email,
      phoneNumber: phoneNumber || undefined,
      // Optional fields with defaults
      driverAge: body.driverAge,
      vehicleType: body.vehicleType,
      vehicleYear: body.vehicleYear,
      farmSize: body.farmSize,
      farmType: body.farmType,
      equipmentValue: body.equipmentValue,
      homeValue: body.homeValue,
      homeAge: body.homeAge,
      coverageLevel: body.coverageLevel || 'standard',
      deductible: body.deductible || 500,
      claimsInPast5Years: body.claimsInPast5Years || 0,
    }

    // Calculate quotes
    const quotes = calculateQuotes(quoteRequest)

    // Log the request (without PII in production)
    console.log(`Quote request generated for ${insuranceType} insurance in ${zipCode}`)

    // Return quotes
    return NextResponse.json({
      success: true,
      quotes,
      requestId: crypto.randomUUID(),
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error generating quotes:', error)
    return NextResponse.json(
      { error: 'Failed to generate quotes. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET endpoint for available insurance types
export async function GET() {
  return NextResponse.json({
    insuranceTypes: [
      { value: 'auto', label: 'Auto Insurance', description: 'Protect your vehicle on and off the road' },
      { value: 'farm', label: 'Farm Insurance', description: 'Comprehensive coverage for farms and agriculture' },
      { value: 'home', label: 'Home Insurance', description: 'Protect your home and belongings' },
      { value: 'renters', label: 'Renters Insurance', description: 'Coverage for renters and tenants' },
      { value: 'life', label: 'Life Insurance', description: 'Financial protection for your loved ones' },
    ],
  })
}
