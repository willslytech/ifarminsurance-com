'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tractor, Home, Car, Building2, Heart, ArrowRight } from 'lucide-react'

export default function QuoteTypeSelection() {
  const insuranceTypes = [
    {
      type: 'farm',
      title: 'Farm Insurance',
      description: 'Protect your farm, equipment, livestock, and crops with comprehensive coverage designed for agricultural operations.',
      icon: Tractor,
      color: 'from-green-500 to-emerald-600',
      link: '/farm',
    },
    {
      type: 'home',
      title: 'Home Insurance',
      description: 'Safeguard your home and belongings with protection that covers your property, liability, and more.',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      link: '/home',
    },
    {
      type: 'auto',
      title: 'Auto Insurance',
      description: 'Get the right coverage for your vehicle at competitive rates. Protect yourself on the road with comprehensive options.',
      icon: Car,
      color: 'from-purple-500 to-purple-600',
      link: '/auto',
    },
    {
      type: 'renters',
      title: 'Renters Insurance',
      description: 'Protect your personal belongings and liability when renting. Affordable coverage for apartment and home renters.',
      icon: Building2,
      color: 'from-orange-500 to-orange-600',
      link: '/renter',
    },
    {
      type: 'life',
      title: 'Life Insurance',
      description: 'Secure your family\'s financial future with life insurance that provides peace of mind and long-term protection.',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      link: '/home',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      {/* Header */}
      <header className="bg-[#1e3a8a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity">
            <img
              src="/upload/logo.jpg"
              alt="iFarmInsurance"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold tracking-wide">
              iFARM INSURANCE
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
              What Would You Like to Insure?
            </h1>
            <p className="text-xl text-[#6E6E73] leading-relaxed">
              Select the type of insurance you need, and we'll guide you through getting a personalized quote in minutes.
            </p>
          </div>

          {/* Insurance Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insuranceTypes.map((insurance) => (
              <Card
                key={insurance.type}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white group"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${insurance.color} flex-shrink-0`}>
                      <insurance.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-2">
                        {insurance.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-[#6E6E73] text-base leading-relaxed mb-6">
                    {insurance.description}
                  </p>

                  <Link href={insurance.link}>
                    <Button className={`w-full bg-gradient-to-r ${insurance.color} hover:opacity-90 text-white font-medium h-12`}>
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Text */}
          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-[#6E6E73] text-base leading-relaxed">
              Not sure which type of insurance you need? 
              <Link href="#contact" className="text-[#007AFF] hover:underline ml-1 font-medium">
                Contact us
              </Link>
              {' '}and one of our insurance experts will help you find the right coverage.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-[#1D1D1F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 iFarmInsurance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
