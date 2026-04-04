'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, ChevronRight, Phone, Mail, Tractor, Wheat, Building2 } from 'lucide-react'

export default function FarmQuotePage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [quotes, setQuotes] = useState<any[]>([])
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    // Contact Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',

    // Farm Info
    farmSize: '',
    farmType: '',
    yearsOwned: '',

    // Equipment & Property
    equipmentValue: '',
    buildingsValue: '',
    livestockValue: '',

    // Coverage Info
    coverageLevel: 'standard',
    deductible: '1000',
    claimsInPast5Years: '0',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.firstName && !!formData.lastName && !!formData.email && !!formData.phone && !!formData.zipCode
      case 2:
        return !!formData.farmSize && !!formData.farmType && !!formData.yearsOwned
      case 3:
        return true // Equipment values are optional
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
      setError('')
    } else {
      setError('Please fill in all required fields')
    }
  }

  const prevStep = () => {
    setStep(step - 1)
    setError('')
  }

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
        body: JSON.stringify({
          zipCode: formData.zipCode,
          insuranceType: 'farm',
          email: formData.email,
          phoneNumber: formData.phone,
          farmSize: parseFloat(formData.farmSize),
          farmType: formData.farmType,
          equipmentValue: parseFloat(formData.equipmentValue) || 0,
          coverageLevel: formData.coverageLevel,
          deductible: parseInt(formData.deductible),
          claimsInPast5Years: parseInt(formData.claimsInPast5Years),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate quotes')
      }

      setQuotes(data.quotes)
      setShowResults(true)
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#1e3a8a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
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
              <Link href="tel:843-858-3415" className="flex items-center gap-2 text-white text-sm font-medium hover:text-[#ff6600] transition-colors">
                <Phone className="h-4 w-4" />
                <span>843-858-3415</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Results Section */}
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
                Your Farm Insurance Quotes
              </h1>
              <p className="text-xl text-[#6E6E73]">
                {formData.farmSize} acre {formData.farmType} operation
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
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl text-[#1D1D1F]">{quote.provider}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-[#6E6E73]">
                        <Shield className="h-4 w-4" />
                        <span>Rating: {quote.rating}/5</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-[#007AFF]">
                            ${quote.premium}
                          </span>
                          <span className="text-[#6E6E73]">/month</span>
                        </div>
                        <p className="text-sm text-[#6E6E73] mt-1">
                          ${quote.deductible} deductible
                        </p>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                          <CheckCircle2 className="h-4 w-4 text-[#007AFF]" />
                          <span>Liability: {coverageDetails.liability || 'Standard'}</span>
                        </div>
                        {coverageDetails.comprehensive && (
                          <div className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                            <CheckCircle2 className="h-4 w-4 text-[#007AFF]" />
                            <span>Comprehensive Coverage</span>
                          </div>
                        )}
                        {coverageDetails.equipmentCoverage && (
                          <div className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                            <CheckCircle2 className="h-4 w-4 text-[#007AFF]" />
                            <span>Equipment & Machinery</span>
                          </div>
                        )}
                        {coverageDetails.liabilityProtection && (
                          <div className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                            <CheckCircle2 className="h-4 w-4 text-[#007AFF]" />
                            <span>Farm Liability Protection</span>
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

            <div className="mt-12 text-center space-y-4">
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false)
                  setQuotes([])
                }}
                className="border-2 border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF] hover:text-white"
              >
                Start New Quote
              </Button>
              <div className="text-sm text-[#6E6E73]">
                Questions? Call us at <Link href="tel:843-858-3415" className="text-[#007AFF] hover:underline">843-858-3415</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#1e3a8a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
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
            <Link href="tel:843-858-3415" className="flex items-center gap-2 text-white text-sm font-medium hover:text-[#ff6600] transition-colors">
              <Phone className="h-4 w-4" />
              <span>843-858-3415</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-[#6E6E73] hover:text-[#007AFF] transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to Home</span>
            </Link>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#1D1D1F] tracking-tight mb-4">
              Farm Insurance Quote
            </h1>
            <p className="text-xl text-[#6E6E73]">
              Step {step} of 3: {step === 1 ? 'Contact Information' : step === 2 ? 'Farm Information' : 'Property & Coverage'}
            </p>

            {/* Progress Bar */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s <= step ? 'bg-[#007AFF] w-8' : 'bg-gray-300 w-4'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Form Card */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {/* Step 1: Contact Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-[#1D1D1F]">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        placeholder="12345"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
                        maxLength={5}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Farm Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-[#1D1D1F]">Farm Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmSize">Farm Size (Acres) *</Label>
                        <Input
                          id="farmSize"
                          type="number"
                          min="1"
                          placeholder="100"
                          value={formData.farmSize}
                          onChange={(e) => handleInputChange('farmSize', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="yearsOwned">Years Owned *</Label>
                        <Input
                          id="yearsOwned"
                          type="number"
                          min="0"
                          max="100"
                          placeholder="10"
                          value={formData.yearsOwned}
                          onChange={(e) => handleInputChange('yearsOwned', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="farmType">Farm Type *</Label>
                      <Select
                        value={formData.farmType}
                        onValueChange={(value) => handleInputChange('farmType', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select farm type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crop">Crop Farm</SelectItem>
                          <SelectItem value="livestock">Livestock Farm</SelectItem>
                          <SelectItem value="dairy">Dairy Farm</SelectItem>
                          <SelectItem value="poultry">Poultry Farm</SelectItem>
                          <SelectItem value="mixed">Mixed Operation</SelectItem>
                          <SelectItem value="organic">Organic Farm</SelectItem>
                          <SelectItem value="ranch">Ranch</SelectItem>
                          <SelectItem value="nursery">Nursery/Greenhouse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Property & Coverage */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-[#1D1D1F]">Property & Coverage</h2>

                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                          <Tractor className="h-5 w-5 text-[#007AFF]" />
                          <Label htmlFor="equipmentValue">Equipment & Machinery Value</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">$</span>
                          <Input
                            id="equipmentValue"
                            type="number"
                            min="0"
                            step="1000"
                            placeholder="50000"
                            value={formData.equipmentValue}
                            onChange={(e) => handleInputChange('equipmentValue', e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <p className="text-sm text-[#6E6E73]">
                          Tractors, combines, plows, harvesters, etc.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                          <Building2 className="h-5 w-5 text-[#007AFF]" />
                          <Label htmlFor="buildingsValue">Buildings & Structures Value</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">$</span>
                          <Input
                            id="buildingsValue"
                            type="number"
                            min="0"
                            step="1000"
                            placeholder="150000"
                            value={formData.buildingsValue}
                            onChange={(e) => handleInputChange('buildingsValue', e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <p className="text-sm text-[#6E6E73]">
                          Barns, sheds, grain bins, silos, etc.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[#1D1D1F] font-medium">
                          <Wheat className="h-5 w-5 text-[#007AFF]" />
                          <Label htmlFor="livestockValue">Livestock Value</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">$</span>
                          <Input
                            id="livestockValue"
                            type="number"
                            min="0"
                            step="1000"
                            placeholder="30000"
                            value={formData.livestockValue}
                            onChange={(e) => handleInputChange('livestockValue', e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <p className="text-sm text-[#6E6E73]">
                          Cattle, pigs, poultry, horses, etc.
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 border-t space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="coverageLevel">Coverage Level</Label>
                        <Select
                          value={formData.coverageLevel}
                          onValueChange={(value) => handleInputChange('coverageLevel', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="standard">Standard (Recommended)</SelectItem>
                            <SelectItem value="enhanced">Enhanced</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deductible">Deductible</Label>
                        <Select
                          value={formData.deductible}
                          onValueChange={(value) => handleInputChange('deductible', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500">$500</SelectItem>
                            <SelectItem value="1000">$1,000 (Recommended)</SelectItem>
                            <SelectItem value="2500">$2,500</SelectItem>
                            <SelectItem value="5000">$5,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="claims">Claims in Past 5 Years</Label>
                        <Select
                          value={formData.claimsInPast5Years}
                          onValueChange={(value) => handleInputChange('claimsInPast5Years', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0 Claims</SelectItem>
                            <SelectItem value="1">1 Claim</SelectItem>
                            <SelectItem value="2">2 Claims</SelectItem>
                            <SelectItem value="3">3+ Claims</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  <Button
                    type={step === 3 ? 'submit' : 'button'}
                    disabled={isSubmitting}
                    onClick={step === 3 ? undefined : nextStep}
                    className="bg-[#007AFF] hover:bg-[#0051D5] text-white"
                  >
                    {isSubmitting ? 'Generating Quotes...' : step === 3 ? 'Get Quotes' : 'Next Step'}
                    {step < 3 && !isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <Card className="border-0 shadow-md bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Tractor className="h-5 w-5 text-[#007AFF]" />
                  <h3 className="font-semibold text-[#1D1D1F]">Need Farm Insurance Help?</h3>
                </div>
                <p className="text-sm text-[#6E6E73] mb-3">
                  Our farm insurance specialists understand your unique needs
                </p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Link href="tel:843-858-3415" className="flex items-center gap-2 text-[#007AFF] hover:underline">
                    <Phone className="h-4 w-4" />
                    <span>843-858-3415</span>
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="mailto:billyearly3@gmail.com" className="flex items-center gap-2 text-[#007AFF] hover:underline">
                    <Mail className="h-4 w-4" />
                    <span>Email Us</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
