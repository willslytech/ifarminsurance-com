'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Menu, X, Shield, Clock, DollarSign, CheckCircle2, Star, ChevronRight, Tractor, Home as HomeIcon, Zap, Heart, ChevronDown, Phone, User } from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    zipCode: '',
    insuranceType: '',
    email: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [quotes, setQuotes] = useState<any[]>([])
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quotes')
      }

      setQuotes(data.quotes)
      setShowResults(true)

      // Scroll to results
      setTimeout(() => {
        document.getElementById('quotes-results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)

    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const insuranceTypes = [
    { value: 'farm', label: 'Farm Insurance', icon: Tractor },
    { value: 'home', label: 'Home Insurance', icon: HomeIcon },
    { value: 'auto', label: 'Auto Insurance', icon: Zap },
    { value: 'life', label: 'Life Insurance', icon: Heart },
  ]

  const features = [
    {
      icon: Shield,
      title: 'Comprehensive Coverage',
      description: 'Protect your farm, home, and family with complete insurance solutions tailored to your needs.',
    },
    {
      icon: Clock,
      title: 'Quick Quotes',
      description: 'Get competitive quotes in minutes, not hours. Compare multiple insurers instantly.',
    },
    {
      icon: DollarSign,
      title: 'Best Rates',
      description: 'We work with top carriers to find you the best rates without compromising coverage.',
    },
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Tell Us About Your Needs',
      description: 'Share some basic information about what you want to insure.',
    },
    {
      step: '02',
      title: 'Compare Quotes',
      description: 'Review personalized quotes from multiple trusted insurers.',
    },
    {
      step: '03',
      title: 'Choose & Save',
      description: 'Select the best coverage for you and start saving today.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Iowa',
      quote: 'iFarmInsurance made finding the right coverage for our family farm so easy. We saved 40% compared to our previous provider!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      location: 'Nebraska',
      quote: 'The comparison process was seamless. I found better coverage for my farm equipment in just a few minutes.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      location: 'Kansas',
      quote: 'Finally, an insurance platform that understands farmers. The quotes were accurate and the savings were real.',
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      {/* Navigation - Insurify Style */}
      <nav className="sticky top-0 z-50 bg-[#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Primary Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <img
                  src="/upload/logo.jpg"
                  alt="iFarmInsurance"
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-white tracking-wide">
                  iFARM INSURANCE
                </span>
              </Link>

              {/* Desktop Navigation Menu */}
              <div className="hidden lg:flex items-center gap-6">
                <Link href="/auto" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Auto
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </Link>
                <Link href="/home" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Home
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </Link>
                <Link href="/renter" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Renters
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </Link>
                <Link href="/farm" className="flex items-center gap-1 text-[#ff6600] text-sm font-bold hover:text-[#ff8533] transition-colors group">
                  Farm
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff8533]" />
                </Link>
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  More Coverage
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Reports
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
                <a href="#about" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  About
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
              </div>
            </div>

            {/* Right Side - Phone and Sign In */}
            <div className="flex items-center gap-4">
              {/* Phone Number */}
              <div className="hidden md:flex items-center gap-2 text-white text-sm font-medium">
                <Phone className="h-4 w-4" />
                <span>843-858-3415</span>
              </div>

              {/* Sign In Button */}
              <Button className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-medium text-sm px-6 h-9 rounded-full">
                Sign In
              </Button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-blue-800/50 text-white"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#1e3a8a] border-t border-blue-700/50">
            <div className="px-4 py-4 space-y-2">
              <Link href="/auto" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Auto <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </Link>
              <Link href="/home" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Home <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </Link>
              <Link href="/renter" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Renters <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </Link>
              <Link href="/farm" className="flex items-center justify-between text-[#ff6600] py-2 text-sm font-bold">
                Farm <ChevronDown className="h-4 w-4" />
              </Link>
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                More Coverage <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Reports <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <a href="#about" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                About <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <div className="pt-3 border-t border-blue-700/50 flex items-center gap-2 text-white text-sm font-medium">
                <Phone className="h-4 w-4" />
                <span>843-858-3415</span>
              </div>
              <div className="pt-2">
                <Button className="w-full bg-white text-[#1e3a8a] hover:bg-gray-100 font-medium text-sm h-9 rounded-full">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#1D1D1F] tracking-tight leading-[1.1]">
              Farm Insurance,
              <br />
              <span className="text-[#007AFF]">Simplified.</span>
            </h1>
            <p className="mt-6 text-xl text-[#6E6E73] max-w-2xl mx-auto leading-relaxed">
              Compare quotes from top insurers in minutes. Protect what matters most with coverage designed for farmers.
            </p>
          </div>

          {/* Quote Form Card */}
          <Card className="mt-12 max-w-2xl mx-auto shadow-2xl border-0">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium text-[#1D1D1F]">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    type="text"
                    placeholder="Enter your ZIP code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="h-12 text-base"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceType" className="text-sm font-medium text-[#1D1D1F]">
                    Insurance Type
                  </Label>
                  <Select
                    value={formData.insuranceType}
                    onValueChange={(value) => setFormData({ ...formData, insuranceType: value })}
                    required
                  >
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select insurance type" />
                    </SelectTrigger>
                    <SelectContent>
                      {insuranceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="flex items-center gap-2">
                          <type.icon className="h-4 w-4 mr-2" />
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-[#1D1D1F]">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 text-base"
                    required
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-base font-medium bg-[#007AFF] hover:bg-[#0051D5] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Generating Quotes...' : 'Compare Free Quotes'}
                  {!isSubmitting && <ChevronRight className="ml-2 h-5 w-5" />}
                </Button>

                <p className="text-xs text-center text-[#6E6E73]">
                  By clicking above, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-sm text-[#6E6E73]">
            Trusted by over 50,000 farmers nationwide
          </p>
        </div>

        {/* Quotes Results Section */}
        {showResults && (
          <div id="quotes-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight">
                Your Personalized Quotes
              </h2>
              <p className="mt-4 text-xl text-[#6E6E73]">
                Compare quotes from top insurance providers
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quotes.map((quote, index) => {
                const coverageDetails = JSON.parse(quote.coverageDetails || '{}')
                return (
                  <Card
                    key={index}
                    className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-[#F5F5F7]"
                  >
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">
                          {quote.provider}
                        </h3>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-[#007AFF]">
                            ${quote.premium}
                          </span>
                          <span className="text-[#6E6E73]">/month</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#007AFF]" />
                          <span className="text-sm text-[#1D1D1F]">Deductible: ${quote.deductible}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#007AFF]" />
                          <span className="text-sm text-[#1D1D1F]">Liability: {coverageDetails.liability || 'Standard'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#007AFF]" />
                          <span className="text-sm text-[#1D1D1F]">Comprehensive: {coverageDetails.comprehensive ? 'Yes' : 'No'}</span>
                        </div>
                        {coverageDetails.medical && (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-[#007AFF]" />
                            <span className="text-sm text-[#1D1D1F]">Medical Coverage: Included</span>
                          </div>
                        )}
                      </div>

                      <Button className="w-full bg-[#007AFF] hover:bg-[#0051D5] text-white">
                        Get This Quote
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false)
                  setQuotes([])
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="border-2 border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF] hover:text-white"
              >
                Get New Quotes
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight">
              Why Us
            </h2>
            <p className="mt-4 text-xl text-[#6E6E73]">
              We make insurance simple, fast, and affordable for farmers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#F5F5F7]"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#007AFF]/10 mb-6">
                    <feature.icon className="h-8 w-8 text-[#007AFF]" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[#6E6E73] leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-[#6E6E73]">
              Get covered in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-8xl font-bold text-[#007AFF]/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#6E6E73] leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight">
              What Farmers Say
            </h2>
            <p className="mt-4 text-xl text-[#6E6E73]">
              Join thousands of satisfied customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-[#F5F5F7]"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#007AFF] text-[#007AFF]"
                      />
                    ))}
                  </div>
                  <p className="text-[#1D1D1F] text-lg leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#007AFF] flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1D1D1F]">{testimonial.name}</p>
                      <p className="text-sm text-[#6E6E73]">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Farm Equipment Images */}
      <section id="about" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
              About Us
            </h2>
            <p className="text-xl text-[#6E6E73] leading-relaxed">
              At iFarmInsurance, we understand the unique challenges farmers face. From grain bins to cotton pickers, from hog houses to equipment sheds - we protect it all.
            </p>
          </div>

          {/* Farm Equipment Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/upload/grain-bins-6.jpg"
                  alt="Grain Bins"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1D1D1F]">Grain Storage</h3>
                <p className="text-sm text-[#6E6E73] mt-1">Protect your grain bins and storage facilities</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/upload/hog-houses.jpg"
                  alt="Hog Houses"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1D1D1F]">Livestock Facilities</h3>
                <p className="text-sm text-[#6E6E73] mt-1">Coverage for hog houses and animal housing</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/upload/new-chicken-house-2.jpg"
                  alt="Chicken Houses"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1D1D1F]">Poultry Operations</h3>
                <p className="text-sm text-[#6E6E73] mt-1">Comprehensive poultry house insurance</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/upload/equipment-shed-2.jpg"
                  alt="Equipment Shed"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1D1D1F]">Equipment Storage</h3>
                <p className="text-sm text-[#6E6E73] mt-1">Protect your valuable equipment and machinery</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/upload/grain-elevators.jpg"
                  alt="Grain Elevators"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1D1D1F]">Grain Handling</h3>
                <p className="text-sm text-[#6E6E73] mt-1">Coverage for grain elevators and handling systems</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src="/upload/burned-tractor-2.jpg"
                  alt="Farm Equipment Protection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#1D1D1F]">Equipment Coverage</h3>
                <p className="text-sm text-[#6E6E73] mt-1">Protection against fire, theft, and accidents</p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <div className="max-w-3xl mx-auto text-center">
            <Card className="border-0 shadow-lg bg-white p-8">
              <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-4">
                Our Mission
              </h3>
              <p className="text-[#6E6E73] text-lg leading-relaxed">
                To provide farmers with affordable, comprehensive insurance solutions that protect their livelihoods. We combine modern technology with personalized service to deliver the best insurance experience in the industry.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#007AFF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight mb-6">
            Ready to Save on Insurance?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Get free quotes from top insurers in minutes. No obligation.
          </p>
          <Button
            size="lg"
            className="h-14 px-8 text-base font-medium bg-white text-[#007AFF] hover:bg-gray-100"
          >
            Start Your Free Quote
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#1D1D1F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Products</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Farm Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Auto Insurance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Life Insurance
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Claims
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 iFarmInsurance. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
