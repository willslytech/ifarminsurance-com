'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Menu, X, ChevronDown, Phone, ArrowRight, ArrowLeft, CheckCircle, Car, Shield, Star, Calendar, User as UserIcon } from 'lucide-react'
import Link from 'next/link'

export default function AutoInsurance() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  // Vehicle Information
  const [vehicleInfo, setVehicleInfo] = useState({
    year: '',
    make: '',
    model: '',
    trim: '',
    vin: '',
    ownership: 'own',
    annualMileage: '',
    primaryUse: 'commute',
  })

  // Driver Information
  const [driverInfo, setDriverInfo] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    maritalStatus: '',
    education: '',
    occupation: '',
    licenseStatus: 'valid',
    licenseYears: '',
    accidents: '0',
    violations: '0',
  })

  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  })

  const steps = [
    { id: 1, name: 'Vehicle', status: 'completed' },
    { id: 2, name: 'Driver', status: 'current' },
    { id: 3, name: 'Confirm', status: 'upcoming' },
    { id: 4, name: 'Results', status: 'upcoming' },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 3) {
      setCurrentStep(4)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicleInfo({ ...vehicleInfo, [e.target.name]: e.target.value })
  }

  const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDriverInfo({ ...driverInfo, [e.target.name]: e.target.value })
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value })
  }

  const insuranceProviders = [
    {
      id: 1,
      name: 'Progressive',
      tagline: 'Drivers who save by switching to Progressive save $964 on average.',
      monthlyPrice: 145,
      features: ['24/7 Roadside Assistance', 'Accident Forgiveness', 'Pet Injury Coverage'],
    },
    {
      id: 2,
      name: 'Geico',
      tagline: '15 minutes could save you 15% or more on car insurance.',
      monthlyPrice: 138,
      features: ['24/7 Customer Service', 'Multi-Policy Discount', 'Military Discount'],
    },
    {
      id: 3,
      name: 'State Farm',
      tagline: 'Like a good neighbor, State Farm is there.',
      monthlyPrice: 152,
      features: ['Drive Safe & Save™', 'Personal Agent', 'Claims Service'],
    },
    {
      id: 4,
      name: 'Allstate',
      tagline: 'You\'re in good hands with Allstate.',
      monthlyPrice: 160,
      features: ['Drivewise®', 'New Car Replacement', 'Safe Driving Bonus'],
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
                <Link href="/auto" className="flex items-center gap-1 text-[#ff6600] text-sm font-bold hover:text-[#ff8533] transition-colors group">
                  Auto
                  <ChevronDown className="h-4 w-4 text-[#ff6600] group-hover:text-[#ff8533]" />
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
                {/* Step 1: Vehicle Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Tell us about your vehicle
                      </h1>
                      <p className="text-[#6E6E73]">
                        We'll use this information to find you the best rates.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="year" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Year
                          </Label>
                          <Select
                            value={vehicleInfo.year}
                            onValueChange={(value) => setVehicleInfo({ ...vehicleInfo, year: value })}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 30 }, (_, i) => (
                                <SelectItem key={2024 - i} value={String(2024 - i)}>
                                  {2024 - i}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="make" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Make
                          </Label>
                          <Input
                            name="make"
                            type="text"
                            placeholder="e.g., Toyota"
                            value={vehicleInfo.make}
                            onChange={handleVehicleChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="model" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Model
                          </Label>
                          <Input
                            name="model"
                            type="text"
                            placeholder="e.g., Camry"
                            value={vehicleInfo.model}
                            onChange={handleVehicleChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="trim" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Trim (Optional)
                        </Label>
                        <Input
                          name="trim"
                          type="text"
                          placeholder="e.g., LE, XLE"
                          value={vehicleInfo.trim}
                          onChange={handleVehicleChange}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="vin" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          VIN (Optional)
                        </Label>
                        <Input
                          name="vin"
                          type="text"
                          placeholder="17-character VIN"
                          value={vehicleInfo.vin}
                          onChange={handleVehicleChange}
                          className="h-12"
                          maxLength={17}
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-[#1D1D1F] mb-2 block">
                          Do you own this vehicle?
                        </Label>
                        <div className="flex gap-4">
                          {['own', 'lease', 'finance'].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="ownership"
                                value={option}
                                checked={vehicleInfo.ownership === option}
                                onChange={handleVehicleChange}
                                className="w-4 h-4 text-[#1e3a8a]"
                              />
                              <span className="text-[#1D1D1F] capitalize">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="annualMileage" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Annual Mileage
                        </Label>
                        <Input
                          name="annualMileage"
                          type="text"
                          placeholder="e.g., 12,000"
                          value={vehicleInfo.annualMileage}
                          onChange={handleVehicleChange}
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="primaryUse" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Primary Use
                        </Label>
                        <Select
                          value={vehicleInfo.primaryUse}
                          onValueChange={(value) => setVehicleInfo({ ...vehicleInfo, primaryUse: value })}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commute">Commute</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="pleasure">Pleasure</SelectItem>
                          </SelectContent>
                        </Select>
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

                {/* Step 2: Driver Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Tell us about the driver
                      </h1>
                      <p className="text-[#6E6E73]">
                        We need some information about who will be driving.
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
                            value={driverInfo.firstName}
                            onChange={handleDriverChange}
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
                            value={driverInfo.lastName}
                            onChange={handleDriverChange}
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
                            value={driverInfo.birthdate}
                            onChange={handleDriverChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="gender" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Gender
                          </Label>
                          <Select
                            value={driverInfo.gender}
                            onValueChange={(value) => setDriverInfo({ ...driverInfo, gender: value })}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="maritalStatus" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Marital Status
                        </Label>
                        <Select
                          value={driverInfo.maritalStatus}
                          onValueChange={(value) => setDriverInfo({ ...driverInfo, maritalStatus: value })}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="licenseStatus" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            License Status
                          </Label>
                          <Select
                            value={driverInfo.licenseStatus}
                            onValueChange={(value) => setDriverInfo({ ...driverInfo, licenseStatus: value })}
                            required
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="valid">Valid</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                              <SelectItem value="expired">Expired</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="licenseYears" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Years Licensed
                          </Label>
                          <Input
                            name="licenseYears"
                            type="text"
                            placeholder="e.g., 10"
                            value={driverInfo.licenseYears}
                            onChange={handleDriverChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="accidents" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            At-Fault Accidents (3 years)
                          </Label>
                          <Input
                            name="accidents"
                            type="text"
                            placeholder="0"
                            value={driverInfo.accidents}
                            onChange={handleDriverChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="violations" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Moving Violations (3 years)
                          </Label>
                          <Input
                            name="violations"
                            type="text"
                            placeholder="0"
                            value={driverInfo.violations}
                            onChange={handleDriverChange}
                            className="h-12"
                            required
                          />
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

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
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
                            <Label className="text-xs text-[#6E6E73]">First Name</Label>
                            <Input
                              value={driverInfo.firstName}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Last Name</Label>
                            <Input
                              value={driverInfo.lastName}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Birthdate</Label>
                            <Input
                              value={driverInfo.birthdate}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Vehicle</Label>
                            <Input
                              value={`${vehicleInfo.year} ${vehicleInfo.make} ${vehicleInfo.model}`}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-[#6E6E73]">Email Address</Label>
                          <Input
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={contactInfo.email}
                            onChange={handleContactChange}
                            className="h-12"
                            required
                          />
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
            /* Step 4: Quote Results */
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                  Here are your personalized auto insurance quotes
                </h1>
                <p className="text-[#6E6E73]">
                  Compare rates from top providers and find the best coverage for you.
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
                            <Car className="h-6 w-6 text-white" />
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
