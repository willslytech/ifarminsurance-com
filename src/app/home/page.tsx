'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Menu, X, ChevronDown, Phone, ArrowRight, ArrowLeft, CheckCircle, Home as HomeIcon, Shield, Star } from 'lucide-react'
import Link from 'next/link'

export default function HomeInsurance() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  // Step 1: Address and Home Type
  const [addressForm, setAddressForm] = useState({
    address: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    homeType: '',
  })

  // Step 2: Detailed Home Information
  const [homeDetails, setHomeDetails] = useState({
    ownership: 'yes',
    purchaseDate: '',
    yearBuilt: '',
    foundation: '',
    roofYear: '',
    squareFootage: '',
    rebuildCost: '',
    fireStation: '',
  })

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(2)
  }

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep(3)
    setShowResults(true)
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleHomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value })
  }

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHomeDetails({ ...homeDetails, [e.target.name]: e.target.value })
  }

  const insuranceBundles = [
    {
      id: 1,
      name: 'Best Price Bundle',
      providers: ['FarmGuard', 'Rural Shield'],
      autoPrice: 310,
      homePrice: 202,
      totalPrice: 512,
      isBest: true,
      tagline: 'Best overall value for your farm and home',
    },
    {
      id: 2,
      name: 'Comprehensive Bundle',
      providers: ['AgriProtect', 'FarmGuard'],
      autoPrice: 310,
      homePrice: 248,
      totalPrice: 558,
      isBest: false,
      tagline: 'Maximum coverage for peace of mind',
    },
  ]

  const additionalProviders = [
    {
      id: 3,
      name: 'State Farm',
      tagline: 'Switch and Save Today',
    },
    {
      id: 4,
      name: 'Allstate',
      tagline: 'Safe drivers save more with Allstate®',
    },
    {
      id: 5,
      name: 'Geico',
      tagline: 'More than just insurance',
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
              <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
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
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Auto
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
                <Link href="/home" className="flex items-center gap-1 text-[#ff6600] text-sm font-bold hover:text-[#ff8533] transition-colors group">
                  Home
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff8533]" />
                </Link>
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Renters
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Farm
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  More Coverage
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Reports
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </a>
                <a href="#" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
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
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Auto <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <Link href="/home" className="flex items-center justify-between text-[#ff6600] py-2 text-sm font-bold">
                Home <ChevronDown className="h-4 w-4" />
              </Link>
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Renters <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Farm <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                More Coverage <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
                Reports <ChevronDown className="h-4 w-4 text-[#ff6600]" />
              </a>
              <a href="#" className="flex items-center justify-between text-white py-2 text-sm font-medium hover:text-[#ff6600] transition-colors">
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

      {/* Main Content */}
      <main className="flex-1 bg-[#f8f8f8] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <>
              {/* Step 1: Address and Home Type */}
              {currentStep === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-8">
                  {/* Address Section */}
                  <div className="bg-white rounded-lg p-8 shadow-sm">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">
                          What is the address you'd like to insure?
                        </h3>
                        <p className="text-sm text-[#6E6E73]">
                          We'll only ask for the details insurance companies need.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Street Address
                        </Label>
                        <Input
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Enter your street address"
                          value={addressForm.address}
                          onChange={handleHomeChange}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="unit" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Unit # (Optional)
                        </Label>
                        <Input
                          id="unit"
                          name="unit"
                          type="text"
                          placeholder="Apartment, suite, unit, etc."
                          value={addressForm.unit}
                          onChange={handleHomeChange}
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            City
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            value={addressForm.city}
                            onChange={handleHomeChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="state" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                              State
                            </Label>
                            <Select
                              value={addressForm.state}
                              onValueChange={(value) => setAddressForm({ ...addressForm, state: value })}
                              required
                            >
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="State" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SC">SC</SelectItem>
                                <SelectItem value="NC">NC</SelectItem>
                                <SelectItem value="GA">GA</SelectItem>
                                <SelectItem value="FL">FL</SelectItem>
                                <SelectItem value="AL">AL</SelectItem>
                                <SelectItem value="TN">TN</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="zip" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                              ZIP Code
                            </Label>
                            <Input
                              id="zip"
                              name="zip"
                              type="text"
                              placeholder="12345"
                              value={addressForm.zip}
                              onChange={handleHomeChange}
                              className="h-12"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home Type Section */}
                  <div className="bg-white rounded-lg p-8 shadow-sm">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">2</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-2">
                          What kind of home is this?
                        </h3>
                        <p className="text-sm text-[#6E6E73]">
                          Select the type of home that's your primary residence.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {['Single Family Home', 'Condo', 'Rental', 'Mobile Home'].map((type) => (
                        <label key={type} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                          <input
                            type="radio"
                            name="homeType"
                            value={type.toLowerCase().replace(' ', '-')}
                            checked={addressForm.homeType === type.toLowerCase().replace(' ', '-')}
                            onChange={handleHomeChange}
                            className="w-4 h-4 text-[#1e3a8a]"
                            required
                          />
                          <span className="ml-3 text-[#1D1D1F]">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <p className="text-xs text-[#6E6E73] mb-4">
                      By continuing, you agree to our{' '}
                      <a href="#" className="text-blue-600 underline">
                        Privacy Policy
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-600 underline">
                        Terms of Service
                      </a>
                      . We'll use your information to find the best home insurance rates for you.
                    </p>
                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 h-12 rounded-full"
                      >
                        Save & continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: Detailed Home Information */}
              {currentStep === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-6">
                  {[
                    {
                      title: 'Do you already own this home?',
                      subtitle: "You'll still get quotes if you don't own the home yet",
                      name: 'ownership',
                      type: 'radio',
                      options: ['Yes, I already own it', 'Almost, I\'m closing on it soon', 'No, I\'m just looking around'],
                    },
                    {
                      title: 'When did you buy your home?',
                      subtitle: 'Month & year of purchase',
                      name: 'purchaseDate',
                      type: 'text',
                      placeholder: 'Month & year of purchase',
                    },
                    {
                      title: 'What year was your home built?',
                      name: 'yearBuilt',
                      type: 'text',
                      placeholder: 'Year built',
                    },
                    {
                      title: 'What type of foundation does your home have?',
                      subtitle: 'If you have more than one foundation type, choose the majority',
                      name: 'foundation',
                      type: 'select',
                      options: ['Slab', 'Crawlspace', 'Basement', 'Pier & Beam'],
                    },
                    {
                      title: 'When was your roof installed or last replaced?',
                      name: 'roofYear',
                      type: 'text',
                      placeholder: 'Year',
                    },
                    {
                      title: 'What is the square footage?',
                      subtitle: "Don't include square footage from your garage, basement, or attic",
                      name: 'squareFootage',
                      type: 'text',
                      placeholder: 'Square Footage',
                    },
                    {
                      title: 'How much would it cost to rebuild your home?',
                      subtitle: 'Insurance companies use this amount to set your rate, not your home\'s market value',
                      name: 'rebuildCost',
                      type: 'text',
                      placeholder: 'Rebuild Cost',
                    },
                    {
                      title: 'How close do you live to the closest fire station?',
                      name: 'fireStation',
                      type: 'radio',
                      options: ['1-5 miles', '5-10 miles', '10+ miles'],
                    },
                  ].map((field, index) => (
                    <div key={field.name} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">
                            {field.title}
                          </h3>
                          {field.subtitle && (
                            <p className="text-sm text-[#6E6E73]">{field.subtitle}</p>
                          )}
                        </div>
                      </div>

                      {field.type === 'radio' && (
                        <div className="ml-12 space-y-2">
                          {field.options?.map((option) => (
                            <label key={option} className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                              <input
                                type="radio"
                                name={field.name}
                                value={option.toLowerCase()}
                                checked={homeDetails[field.name as keyof typeof homeDetails] === option.toLowerCase()}
                                onChange={handleDetailsChange}
                                className="w-4 h-4 text-[#1e3a8a]"
                                required
                              />
                              <span className="ml-3 text-[#1D1D1F]">{option}</span>
                            </label>
                          ))}
                        </div>
                      )}

                      {field.type === 'text' && (
                        <div className="ml-12">
                          <Input
                            name={field.name}
                            type="text"
                            placeholder={field.placeholder}
                            value={homeDetails[field.name as keyof typeof homeDetails] as string}
                            onChange={handleDetailsChange}
                            className="h-12"
                            required
                          />
                        </div>
                      )}

                      {field.type === 'select' && (
                        <div className="ml-12">
                          <Select
                            value={homeDetails[field.name as keyof typeof homeDetails] as string}
                            onValueChange={(value) => setHomeDetails({ ...homeDetails, [field.name]: value })}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Footer */}
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <Button
                        type="button"
                        onClick={goBack}
                        variant="ghost"
                        className="text-[#6E6E73] hover:text-[#1D1D1F]"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 h-12 rounded-full"
                      >
                        Save & continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* Step 3: Quote Results */
            <div className="space-y-8">
              {/* Header */}
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                  Here are your personalized bundles
                </h1>
                <p className="text-[#6E6E73]">
                  iFarmInsurance combines policies from different companies to find you the best rates.
                </p>
                <Button variant="outline" className="mt-4">
                  View details
                </Button>
              </div>

              {/* Personalized Bundles */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1D1D1F]">
                  Personalized Bundles
                </h2>

                {insuranceBundles.map((bundle) => (
                  <Card
                    key={bundle.id}
                    className={`border-2 ${
                      bundle.isBest ? 'border-[#7c3aed]' : 'border-gray-200'
                    } hover:shadow-lg transition-shadow`}
                  >
                    <CardContent className="p-6">
                      {bundle.isBest && (
                        <div className="inline-block bg-[#7c3aed] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                          BEST PRICE BUNDLE
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                            <Shield className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#1D1D1F] text-lg">
                              {bundle.providers.join(' + ')}
                            </h3>
                            <p className="text-sm text-[#6E6E73]">{bundle.tagline}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="space-y-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-[#6E6E73]">Auto:</span>
                            <span className="text-xl font-bold text-[#1D1D1F]">
                              ${bundle.autoPrice}/mo
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm text-[#6E6E73]">Home:</span>
                            <span className="text-xl font-bold text-[#1D1D1F]">
                              ${bundle.homePrice}/mo
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-[#6E6E73] mb-1">Total</div>
                          <div className="text-3xl font-bold text-[#7c3aed]">
                            ${bundle.totalPrice}/mo
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white">
                        View details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* More Great Matches */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-[#1D1D1F]">
                  More great matches for you
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {additionalProviders.map((provider) => (
                    <Card
                      key={provider.id}
                      className="border-2 border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                              <HomeIcon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#1D1D1F]">
                                {provider.name}
                              </h3>
                              <p className="text-xs text-[#6E6E73]">{provider.tagline}</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="w-full border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white">
                          Get quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Support Section */}
              <Card className="border-2 border-[#7c3aed] bg-[#f5f3ff]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#7c3aed] flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1D1D1F] text-lg mb-2">
                        We're here to help
                      </h3>
                      <p className="text-sm text-[#6E6E73] mb-4">
                        Need help purchasing a policy? Call now to immediately speak with a licensed agent.
                      </p>
                      <Button variant="outline" className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white">
                        <Phone className="mr-2 h-4 w-4" />
                        Call now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Back Button */}
              <Button
                onClick={() => {
                  setShowResults(false)
                  setCurrentStep(1)
                }}
                variant="ghost"
                className="text-[#6E6E73] hover:text-[#1D1D1F]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Start over
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1D1D1F] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 iFarmInsurance. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
