import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { zipCode, insuranceType, email, firstName, lastName, phone, farmSize, propertyValue, vehicleMake, vehicleModel, vehicleYear, coverageAmount } = body

    // Validate required fields
    if (!zipCode || !insuranceType || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: zipCode, insuranceType, and email are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate zip code (basic US zip code validation)
    const zipRegex = /^\d{5}(-\d{4})?$/
    if (!zipRegex.test(zipCode)) {
      return NextResponse.json(
        { error: 'Invalid ZIP code format' },
        { status: 400 }
      )
    }

    // Create quote request
    const quoteRequest = await db.quoteRequest.create({
      data: {
        zipCode,
        insuranceType,
        email,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        farmSize: farmSize ? parseFloat(farmSize) : null,
        propertyValue: propertyValue ? parseFloat(propertyValue) : null,
        vehicleMake: vehicleMake || null,
        vehicleModel: vehicleModel || null,
        vehicleYear: vehicleYear ? parseInt(vehicleYear) : null,
        coverageAmount: coverageAmount ? parseFloat(coverageAmount) : null,
        status: 'processing',
      },
    })

    // Simulate generating quotes from multiple providers
    // In a real application, this would integrate with external insurance APIs
    const quotes = generateMockQuotes(quoteRequest.id, insuranceType)

    // Save the generated quotes
    for (const quote of quotes) {
      await db.insuranceQuote.create({
        data: quote,
      })
    }

    // Update quote request status
    await db.quoteRequest.update({
      where: { id: quoteRequest.id },
      data: { status: 'completed' },
    })

    // Fetch the created quotes
    const savedQuotes = await db.insuranceQuote.findMany({
      where: { quoteRequestId: quoteRequest.id },
    })

    return NextResponse.json({
      success: true,
      quoteRequestId: quoteRequest.id,
      quotes: savedQuotes,
      message: 'Quotes generated successfully',
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating quote request:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateMockQuotes(quoteRequestId: string, insuranceType: string) {
  const providers = [
    'FarmGuard Insurance',
    'AgriProtect',
    'CountryWide Farmers',
    'Rural Shield',
    'Harvest Insurance Co.',
  ]

  // Base premiums by insurance type
  const basePremiums: Record<string, { min: number; max: number }> = {
    farm: { min: 150, max: 450 },
    home: { min: 80, max: 250 },
    auto: { min: 60, max: 200 },
    life: { min: 30, max: 120 },
  }

  const range = basePremiums[insuranceType] || { min: 50, max: 300 }

  return providers.map((provider) => {
    const premium = Math.random() * (range.max - range.min) + range.min
    const deductible = [500, 1000, 1500, 2000][Math.floor(Math.random() * 4)]

    return {
      quoteRequestId,
      provider,
      premium: Math.round(premium * 100) / 100,
      deductible,
      coverageDetails: JSON.stringify({
        liability: 'Standard',
        comprehensive: true,
        collision: insuranceType === 'auto',
        medical: true,
        additional: ['Roadside Assistance', 'Rental Coverage'],
      }),
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')
    const quoteRequestId = searchParams.get('quoteRequestId')

    if (quoteRequestId) {
      // Get specific quote request
      const quoteRequest = await db.quoteRequest.findUnique({
        where: { id: quoteRequestId },
        include: {
          quotes: true,
        },
      })

      if (!quoteRequest) {
        return NextResponse.json(
          { error: 'Quote request not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ success: true, data: quoteRequest })
    }

    if (email) {
      // Get all quote requests for an email
      const quoteRequests = await db.quoteRequest.findMany({
        where: { email },
        include: {
          quotes: true,
        },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json({ success: true, data: quoteRequests })
    }

    // Get all quote requests (admin use)
    const quoteRequests = await db.quoteRequest.findMany({
      include: {
        quotes: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    })

    return NextResponse.json({ success: true, data: quoteRequests })
  } catch (error) {
    console.error('Error fetching quote requests:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
