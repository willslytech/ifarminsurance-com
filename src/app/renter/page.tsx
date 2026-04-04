'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Menu, X, ChevronDown, Phone, ArrowRight, ArrowLeft, CheckCircle, Home as HomeIcon, Shield, Star, Calendar, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function RenterInsurance() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  // Property Information
  const [propertyInfo, setPropertyInfo] = useState({
    address: '',
    unit: '',
    city: '',
    state: '',
    zip: '',
    propertyType: 'apartment',
    moveInDate: '',
    hasPets: 'no',
  })

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    phone: '',
    hasPriorClaims: 'no',
  })

  // Coverage Preferences
  const [coverageInfo, setCoverageInfo] = useState({
    personalProperty: '',
    liability: '',
    deductible: '500',
    additionalCoverage: [],
  })

  const steps = [
    { id: 1, name: 'Property', status: 'current' },
    { id: 2, name: 'Personal', status: 'upcoming' },
    { id: 3, name: 'Coverage', status: 'upcoming' },
    { id: 4, name: 'Confirm', status: 'upcoming' },
    { id: 5, name: 'Results', status: 'upcoming' },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 4) {
      setCurrentStep(5)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyInfo({ ...propertyInfo, [e.target.name]: e.target.value })
  }

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const insuranceProviders = [
    {
      id: 1,
      name: 'Lemonade',
      tagline: 'Instant everything. Remarkably affordable.',
      monthlyPrice: 15,
      features: ['Instant Claims', 'No Paperwork', 'Zero Hassle'],
    },
    {
      id: 2,
      name: 'Geico',
      tagline: '15 minutes could save you 15% or more.',
      monthlyPrice: 18,
      features: ['Multi-Policy Discount', '24/7 Support', 'Easy Claims'],
    },
    {
      id: 3,
      name: 'Allstate',
      tagline: 'You\'re in good hands with Allstate.',
      monthlyPrice: 22,
      features: ['Claim Free Rewards', 'Local Agents', 'Personalized Coverage'],
    },
    {
      id: 4,
      name: 'State Farm',
      tagline: 'Like a good neighbor.',
      monthlyPrice: 20,
      features: ['Personal Agent', 'Fast Claims', 'Custom Coverage'],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
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

              <div className="hidden lg:flex items-center gap-6">
                <Link href="/auto" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Auto
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </Link>
                <Link href="/home" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Home
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </Link>
                <Link href="/renter" className="flex items-center gap-1 text-[#ff6600] text-sm font-bold hover:text-[#ff8533] transition-colors group">
                  Renters
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff8533]" />
                </Link>
                <Link href="/farm" className="flex items-center gap-1 text-white text-sm font-medium hover:text-[#ff6600] transition-colors group">
                  Farm
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff6600]" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-white text-sm font-medium">
                <Phone className="h-4 w-4" />
                <span>843-858-3415</span>
              </div>
              <Button className="bg-white text-[#1e3a8a] hover:bg-gray-100 font-medium text-sm px-6 h-9 rounded-full">
                Sign In
              </Button>
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
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-[#f8f8f8] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <div className="flex gap-8">
              {/* Progress Sidebar */}
              <div className="hidden md:flex flex-col gap-4 w-48 flex-shrink-0">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 ${
                      step.status === 'current' ? 'font-semibold' : ''
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        step.status === 'completed'
                          ? 'bg-black'
                          : step.status === 'current'
                          ? 'bg-[#7c3aed]'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        step.status === 'current'
                          ? 'text-[#1D1D1F]'
                          : step.status === 'completed'
                          ? 'text-[#6E6E73]'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.name.toUpperCase()}
                    </span>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <a
                    href="tel:843-858-3415"
                    className="flex items-center gap-2 text-sm text-[#7c3aed] hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    Speak to a licensed agent
                  </a>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1">
                {/* Step 1: Property Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Tell us about your rental
                      </h1>
                      <p className="text-[#6E6E73]">
                        We'll use this information to find you the best renter's insurance rates.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
                      <div>
                        <Label htmlFor="address" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Street Address
                        </Label>
                        <Input
                          name="address"
                          type="text"
                          placeholder="Enter your street address"
                          value={propertyInfo.address}
                          onChange={handlePropertyChange}
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="unit" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Unit # (Optional)
                          </Label>
                          <Input
                            name="unit"
                            type="text"
                            placeholder="Apt, Unit, etc."
                            value={propertyInfo.unit}
                            onChange={handlePropertyChange}
                            className="h-12"
                          />
                        </div>

                        <div>
                          <Label htmlFor="city" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            City
                          </Label>
                          <Input
                            name="city"
                            type="text"
                            placeholder="City"
                            value={propertyInfo.city}
                            onChange={handlePropertyChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            State
                          </Label>
                          <Select
                            value={propertyInfo.state}
                            onValueChange={(value) => setPropertyInfo({ ...propertyInfo, state: value })}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SC">South Carolina</SelectItem>
                              <SelectItem value="NC">North Carolina</SelectItem>
                              <SelectItem value="GA">Georgia</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="zip" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            ZIP Code
                          </Label>
                          <Input
                            name="zip"
                            type="text"
                            placeholder="12345"
                            value={propertyInfo.zip}
                            onChange={handlePropertyChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="propertyType" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Property Type
                        </Label>
                        <Select
                          value={propertyInfo.propertyType}
                          onValueChange={(value) => setPropertyInfo({ ...propertyInfo, propertyType: value })}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="moveInDate" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Move-in Date
                        </Label>
                        <Input
                          name="moveInDate"
                          type="text"
                          placeholder="MM/DD/YYYY"
                          value={propertyInfo.moveInDate}
                          onChange={handlePropertyChange}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-[#1D1D1F] mb-2 block">
                          Do you have pets?
                        </Label>
                        <div className="flex gap-4">
                          {['yes', 'no'].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="hasPets"
                                value={option}
                                checked={propertyInfo.hasPets === option}
                                onChange={handlePropertyChange}
                                className="w-4 h-4 text-[#1e3a8a]"
                              />
                              <span className="text-[#1D1D1F] capitalize">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={handleNext}
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 h-12 rounded-full"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Tell us about yourself
                      </h1>
                      <p className="text-[#6E6E73]">
                        We need some personal information to customize your quote.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            First Name
                          </Label>
                          <Input
                            name="firstName"
                            type="text"
                            placeholder="First name"
                            value={personalInfo.firstName}
                            onChange={handlePersonalChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="lastName" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Last Name
                          </Label>
                          <Input
                            name="lastName"
                            type="text"
                            placeholder="Last name"
                            value={personalInfo.lastName}
                            onChange={handlePersonalChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="birthdate" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Birthdate
                          </Label>
                          <Input
                            name="birthdate"
                            type="text"
                            placeholder="MM/DD/YYYY"
                            value={personalInfo.birthdate}
                            onChange={handlePersonalChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Email Address
                          </Label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={personalInfo.email}
                            onChange={handlePersonalChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Phone Number
                        </Label>
                        <Input
                          name="phone"
                          type="text"
                          placeholder="(555) 123-4567"
                          value={personalInfo.phone}
                          onChange={handlePersonalChange}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-[#1D1D1F] mb-2 block">
                          Have you had any prior insurance claims in the last 3 years?
                        </Label>
                        <div className="flex gap-4">
                          {['yes', 'no'].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="hasPriorClaims"
                                value={option}
                                checked={personalInfo.hasPriorClaims === option}
                                onChange={handlePersonalChange}
                                className="w-4 h-4 text-[#1e3a8a]"
                              />
                              <span className="text-[#1D1D1F] capitalize">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        onClick={handleBack}
                        variant="ghost"
                        className="text-[#6E6E73] hover:text-[#1D1D1F]"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 h-12 rounded-full"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Coverage Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Choose your coverage
                      </h1>
                      <p className="text-[#6E6E73]">
                        Select the coverage levels that work best for you.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
                      <div>
                        <Label htmlFor="personalProperty" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Personal Property Coverage
                        </Label>
                        <Input
                          name="personalProperty"
                          type="text"
                          placeholder="e.g., $30,000"
                          value={coverageInfo.personalProperty}
                          onChange={(e) => setCoverageInfo({ ...coverageInfo, personalProperty: e.target.value })}
                          className="h-12"
                          required
                        />
                        <p className="text-xs text-[#6E6E73] mt-1">
                          Estimate the value of all your belongings (furniture, electronics, clothing, etc.)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="liability" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Liability Coverage
                        </Label>
                        <Input
                          name="liability"
                          type="text"
                          placeholder="e.g., $100,000"
                          value={coverageInfo.liability}
                          onChange={(e) => setCoverageInfo({ ...coverageInfo, liability: e.target.value })}
                          className="h-12"
                          required
                        />
                        <p className="text-xs text-[#6E6E73] mt-1">
                          Protects you if someone gets injured in your rental or if you damage someone else's property
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="deductible" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Deductible
                        </Label>
                        <Select
                          value={coverageInfo.deductible}
                          onValueChange={(value) => setCoverageInfo({ ...coverageInfo, deductible: value })}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="250">$250</SelectItem>
                            <SelectItem value="500">$500</SelectItem>
                            <SelectItem value="1000">$1,000</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-[#6E6E73] mt-1">
                          Higher deductible = lower monthly premium
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        onClick={handleBack}
                        variant="ghost"
                        className="text-[#6E6E73] hover:text-[#1D1D1F]"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 h-12 rounded-full"
                      >
                        Continue
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Let's personalize your quotes!
                      </h1>
                      <p className="text-[#6E6E73]">
                        Double-check your information to see your quotes.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">
                          Confirm your details
                        </h2>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Name</Label>
                            <Input
                              value={`${personalInfo.firstName} ${personalInfo.lastName}`}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Email</Label>
                            <Input
                              value={personalInfo.email}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-[#6E6E73]">Property Address</Label>
                          <Input
                            value={`${propertyInfo.address}${propertyInfo.unit ? ', ' + propertyInfo.unit : ''}, ${propertyInfo.city}, ${propertyInfo.state} ${propertyInfo.zip}`}
                            className="h-12 bg-gray-50"
                            disabled
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Personal Property</Label>
                            <Input
                              value={coverageInfo.personalProperty}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Liability</Label>
                            <Input
                              value={coverageInfo.liability}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        onClick={handleBack}
                        variant="ghost"
                        className="text-[#6E6E73] hover:text-[#1D1D1F]"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 h-12 rounded-full"
                      >
                        Show my quotes
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Step 5: Quote Results */
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                  Here are your personalized renter's insurance quotes
                </h1>
                <p className="text-[#6E6E73]">
                  Compare rates from top providers and protect your belongings.
                </p>
              </div>

              <div className="space-y-4">
                {insuranceProviders.map((provider) => (
                  <Card
                    key={provider.id}
                    className="border-2 border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-[#1e3a8a] flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#1D1D1F] text-lg">
                              {provider.name}
                            </h3>
                            <p className="text-sm text-[#6E6E73]">{provider.tagline}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-[#6E6E73] mb-1">Monthly</div>
                          <div className="text-3xl font-bold text-[#7c3aed]">
                            ${provider.monthlyPrice}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-[#1D1D1F] mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {provider.features.map((feature, index) => (
                            <li key={index} className="text-sm text-[#6E6E73] flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full bg-[#7c3aed] hover:bg-[#6d28d9] text-white">
                        View details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-2 border-[#7c3aed] bg-[#f5f3ff]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#7c3aed] flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1D1D1F] text-lg mb-2">
                        Need help choosing?
                      </h3>
                      <p className="text-sm text-[#6E6E73] mb-4">
                        Speak with a licensed agent who can help you find the best coverage.
                      </p>
                      <Button variant="outline" className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed] hover:text-white">
                        <Phone className="mr-2 h-4 w-4" />
                        Call now: 843-858-3415
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
