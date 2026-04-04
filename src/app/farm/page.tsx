'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Menu, X, ChevronDown, Phone, ArrowRight, ArrowLeft, CheckCircle, Tractor, Shield, Wheat, Cow, Home as HomeIcon } from 'lucide-react'
import Link from 'next/link'

export default function FarmInsurance() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)

  // Farm Location & Type
  const [farmInfo, setFarmInfo] = useState({
    farmName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    farmType: 'crop',
    yearsOwned: '',
    totalAcres: '',
    cropAcres: '',
    pastureAcres: '',
  })

  // Farm Assets & Equipment
  const [assetsInfo, setAssetsInfo] = useState({
    equipmentValue: '',
    structuresValue: '',
    cropValue: '',
    livestockValue: '',
    hasLivestock: 'yes',
    livestockTypes: [],
    equipmentCount: '',
    structureCount: '',
  })

  // Coverage Needs
  const [coverageInfo, setCoverageInfo] = useState({
    propertyValue: '',
    contentsValue: '',
    liabilityCoverage: '100000',
    equipmentCoverage: 'yes',
    livestockCoverage: 'yes',
    cropCoverage: 'yes',
    deductible: '1000',
  })

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthdate: '',
  })

  const steps = [
    { id: 1, name: 'Farm', status: 'current' },
    { id: 2, name: 'Assets', status: 'upcoming' },
    { id: 3, name: 'Coverage', status: 'upcoming' },
    { id: 4, name: 'Personal', status: 'upcoming' },
    { id: 5, name: 'Confirm', status: 'upcoming' },
    { id: 6, name: 'Results', status: 'upcoming' },
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 5) {
      setCurrentStep(6)
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFarmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFarmInfo({ ...farmInfo, [e.target.name]: e.target.value })
  }

  const handleAssetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssetsInfo({ ...assetsInfo, [e.target.name]: e.target.value })
  }

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const insuranceProviders = [
    {
      id: 1,
      name: 'FarmGuard Insurance',
      tagline: 'Protecting farms and families for over 50 years.',
      monthlyPrice: 285,
      features: ['Comprehensive Farm Coverage', 'Equipment Protection', 'Livestock Coverage', 'Crop Insurance Available'],
    },
    {
      id: 2,
      name: 'AgriProtect',
      tagline: 'Your farm is our business.',
      monthlyPrice: 265,
      features: ['Multi-Peril Crop Insurance', 'Farm Equipment Coverage', 'Liability Protection', '24/7 Claims Support'],
    },
    {
      id: 3,
      name: 'Rural Shield',
      tagline: 'Peace of mind for rural America.',
      monthlyPrice: 310,
      features: ['Full Farm Protection', 'Livestock & Equipment', 'Business Interruption', 'Custom Coverage Options'],
    },
    {
      id: 4,
      name: 'Harvest Insurance Co.',
      tagline: 'From seed to harvest, we\'ve got you covered.',
      monthlyPrice: 295,
      features: ['Crop Yield Protection', 'Farm Liability', 'Equipment Breakdown', 'Farm Dwelling Coverage'],
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
                {/* Step 1: Farm Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Tell us about your farm
                      </h1>
                      <p className="text-[#6E6E73]">
                        We'll use this information to find the best farm insurance rates.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
                      <div>
                        <Label htmlFor="farmName" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Farm Name (Optional)
                        </Label>
                        <Input
                          name="farmName"
                          type="text"
                          placeholder="e.g., Green Valley Farms"
                          value={farmInfo.farmName}
                          onChange={handleFarmChange}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="address" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Farm Address
                        </Label>
                        <Input
                          name="address"
                          type="text"
                          placeholder="Street address"
                          value={farmInfo.address}
                          onChange={handleFarmChange}
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            City
                          </Label>
                          <Input
                            name="city"
                            type="text"
                            placeholder="City"
                            value={farmInfo.city}
                            onChange={handleFarmChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="state" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            State
                          </Label>
                          <Select
                            value={farmInfo.state}
                            onValueChange={(value) => setFarmInfo({ ...farmInfo, state: value })}
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
                              <SelectItem value="AL">Alabama</SelectItem>
                              <SelectItem value="TN">Tennessee</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zip" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            ZIP Code
                          </Label>
                          <Input
                            name="zip"
                            type="text"
                            placeholder="12345"
                            value={farmInfo.zip}
                            onChange={handleFarmChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="yearsOwned" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Years You've Owned This Farm
                          </Label>
                          <Input
                            name="yearsOwned"
                            type="text"
                            placeholder="e.g., 10"
                            value={farmInfo.yearsOwned}
                            onChange={handleFarmChange}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="farmType" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Primary Farm Type
                        </Label>
                        <Select
                          value={farmInfo.farmType}
                          onValueChange={(value) => setFarmInfo({ ...farmInfo, farmType: value })}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="crop">Crop Farm</SelectItem>
                            <SelectItem value="livestock">Livestock Farm</SelectItem>
                            <SelectItem value="dairy">Dairy Farm</SelectItem>
                            <SelectItem value="mixed">Mixed Farm</SelectItem>
                            <SelectItem value="poultry">Poultry Farm</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="totalAcres" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Total Acres
                          </Label>
                          <Input
                            name="totalAcres"
                            type="text"
                            placeholder="e.g., 500"
                            value={farmInfo.totalAcres}
                            onChange={handleFarmChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="cropAcres" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Crop Acres
                          </Label>
                          <Input
                            name="cropAcres"
                            type="text"
                            placeholder="e.g., 300"
                            value={farmInfo.cropAcres}
                            onChange={handleFarmChange}
                            className="h-12"
                          />
                        </div>

                        <div>
                          <Label htmlFor="pastureAcres" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Pasture Acres
                          </Label>
                          <Input
                            name="pastureAcres"
                            type="text"
                            placeholder="e.g., 200"
                            value={farmInfo.pastureAcres}
                            onChange={handleFarmChange}
                            className="h-12"
                          />
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

                {/* Step 2: Farm Assets & Equipment */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Tell us about your farm assets
                      </h1>
                      <p className="text-[#6E6E73]">
                        Help us understand what you need to protect.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
                      <div>
                        <Label htmlFor="equipmentValue" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Total Value of Farm Equipment
                        </Label>
                        <Input
                          name="equipmentValue"
                          type="text"
                          placeholder="e.g., $150,000"
                          value={assetsInfo.equipmentValue}
                          onChange={handleAssetsChange}
                          className="h-12"
                          required
                        />
                        <p className="text-xs text-[#6E6E73] mt-1">
                          Tractors, combines, implements, irrigation equipment, etc.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="equipmentCount" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Number of Major Equipment
                          </Label>
                          <Input
                            name="equipmentCount"
                            type="text"
                            placeholder="e.g., 5"
                            value={assetsInfo.equipmentCount}
                            onChange={handleAssetsChange}
                            className="h-12"
                          />
                        </div>

                        <div>
                          <Label htmlFor="structureCount" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Number of Structures
                          </Label>
                          <Input
                            name="structureCount"
                            type="text"
                            placeholder="e.g., 8"
                            value={assetsInfo.structureCount}
                            onChange={handleAssetsChange}
                            className="h-12"
                          />
                          <p className="text-xs text-[#6E6E73] mt-1">
                            Barns, sheds, silos, grain bins, etc.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="structuresValue" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Total Value of Structures
                          </Label>
                          <Input
                            name="structuresValue"
                            type="text"
                            placeholder="e.g., $200,000"
                            value={assetsInfo.structuresValue}
                            onChange={handleAssetsChange}
                            className="h-12"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="propertyValue" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Farm Dwelling Value
                          </Label>
                          <Input
                            name="propertyValue"
                            type="text"
                            placeholder="e.g., $300,000"
                            value={coverageInfo.propertyValue}
                            onChange={(e) => setCoverageInfo({ ...coverageInfo, propertyValue: e.target.value })}
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-[#1D1D1F] mb-2 block">
                          Do you have livestock?
                        </Label>
                        <div className="flex gap-4">
                          {['yes', 'no'].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="hasLivestock"
                                value={option}
                                checked={assetsInfo.hasLivestock === option}
                                onChange={handleAssetsChange}
                                className="w-4 h-4 text-[#1e3a8a]"
                              />
                              <span className="text-[#1D1D1F] capitalize">{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {assetsInfo.hasLivestock === 'yes' && (
                        <div>
                          <Label htmlFor="livestockValue" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                            Total Value of Livestock
                          </Label>
                          <Input
                            name="livestockValue"
                            type="text"
                            placeholder="e.g., $75,000"
                            value={assetsInfo.livestockValue}
                            onChange={handleAssetsChange}
                            className="h-12"
                          />
                          <p className="text-xs text-[#6E6E73] mt-1">
                            Cattle, horses, pigs, poultry, etc.
                          </p>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="cropValue" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Estimated Crop Value (Annual)
                        </Label>
                        <Input
                          name="cropValue"
                          type="text"
                          placeholder="e.g., $100,000"
                          value={assetsInfo.cropValue}
                          onChange={handleAssetsChange}
                          className="h-12"
                        />
                        <p className="text-xs text-[#6E6E73] mt-1">
                          Current season's crop value
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

                {/* Step 3: Coverage Preferences */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                        Choose your coverage
                      </h1>
                      <p className="text-[#6E6E73]">
                        Select the coverage levels that work best for your farm.
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
                      <div>
                        <Label htmlFor="contentsValue" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Farm Contents Value
                        </Label>
                        <Input
                          name="contentsValue"
                          type="text"
                          placeholder="e.g., $50,000"
                          value={coverageInfo.contentsValue}
                          onChange={(e) => setCoverageInfo({ ...coverageInfo, contentsValue: e.target.value })}
                          className="h-12"
                          required
                        />
                        <p className="text-xs text-[#6E6E73] mt-1">
                          Feed, seed, supplies, tools, etc.
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="liabilityCoverage" className="text-sm font-medium text-[#1D1D1F] mb-1 block">
                          Liability Coverage
                        </Label>
                        <Select
                          value={coverageInfo.liabilityCoverage}
                          onValueChange={(value) => setCoverageInfo({ ...coverageInfo, liabilityCoverage: value })}
                          required
                        >
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100000">$100,000</SelectItem>
                            <SelectItem value="300000">$300,000</SelectItem>
                            <SelectItem value="500000">$500,000</SelectItem>
                            <SelectItem value="1000000">$1,000,000</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-[#6E6E73] mt-1">
                          Protects against injuries or property damage to others
                        </p>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-sm font-medium text-[#1D1D1F]">Additional Coverage Options:</Label>
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="equipmentCoverage"
                            checked={coverageInfo.equipmentCoverage === 'yes'}
                            onChange={(e) => setCoverageInfo({ ...coverageInfo, equipmentCoverage: e.target.checked ? 'yes' : 'no' })}
                            className="w-4 h-4 text-[#1e3a8a]"
                          />
                          <label htmlFor="equipmentCoverage" className="text-[#1D1D1F]">
                            Farm Equipment Coverage
                          </label>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="livestockCoverage"
                            checked={coverageInfo.livestockCoverage === 'yes'}
                            onChange={(e) => setCoverageInfo({ ...coverageInfo, livestockCoverage: e.target.checked ? 'yes' : 'no' })}
                            className="w-4 h-4 text-[#1e3a8a]"
                          />
                          <label htmlFor="livestockCoverage" className="text-[#1D1D1F]">
                            Livestock Coverage
                          </label>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="cropCoverage"
                            checked={coverageInfo.cropCoverage === 'yes'}
                            onChange={(e) => setCoverageInfo({ ...coverageInfo, cropCoverage: e.target.checked ? 'yes' : 'no' })}
                            className="w-4 h-4 text-[#1e3a8a]"
                          />
                          <label htmlFor="cropCoverage" className="text-[#1D1D1F]">
                            Crop Insurance
                          </label>
                        </div>
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
                            <SelectItem value="500">$500</SelectItem>
                            <SelectItem value="1000">$1,000</SelectItem>
                            <SelectItem value="2500">$2,500</SelectItem>
                            <SelectItem value="5000">$5,000</SelectItem>
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

                {/* Step 4: Personal Information */}
                {currentStep === 4 && (
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
                      </div>

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

                {/* Step 5: Confirmation */}
                {currentStep === 5 && (
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
                          Confirm your farm details
                        </h2>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Farm Owner</Label>
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
                          <Label className="text-xs text-[#6E6E73]">Farm Address</Label>
                          <Input
                            value={`${farmInfo.address}, ${farmInfo.city}, ${farmInfo.state} ${farmInfo.zip}`}
                            className="h-12 bg-gray-50"
                            disabled
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Total Acres</Label>
                            <Input
                              value={farmInfo.totalAcres}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Equipment Value</Label>
                            <Input
                              value={assetsInfo.equipmentValue}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-[#6E6E73]">Dwelling Value</Label>
                            <Input
                              value={coverageInfo.propertyValue}
                              className="h-12 bg-gray-50"
                              disabled
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs text-[#6E6E73]">Farm Type</Label>
                          <Input
                            value={farmInfo.farmType.charAt(0).toUpperCase() + farmInfo.farmType.slice(1) + ' Farm'}
                            className="h-12 bg-gray-50"
                            disabled
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
            /* Step 6: Quote Results */
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-[#1D1D1F] mb-2">
                  Here are your personalized farm insurance quotes
                </h1>
                <p className="text-[#6E6E73]">
                  Compare rates from top providers and protect your farm.
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
                            <Tractor className="h-6 w-6 text-white" />
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
                        <h4 className="text-sm font-medium text-[#1D1D1F] mb-2">Coverage Includes:</h4>
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
                        Our farm insurance specialists understand the unique needs of farmers. Call now for personalized assistance.
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
