'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Phone, Mail, MapPin, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const subjects = [
    'General Inquiry',
    'Insurance Quote Request',
    'Policy Question',
    'Claims Assistance',
    'Billing Question',
    'Partnership Opportunity',
    'Other',
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
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-[#007AFF] hover:text-[#0051D5] font-medium mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-8">
                  {!isSubmitted ? (
                    <>
                      <h1 className="text-3xl font-semibold text-[#1D1D1F] mb-2">
                        Contact Us
                      </h1>
                      <p className="text-[#6E6E73] mb-8">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-[#1D1D1F]">
                              First Name *
                            </Label>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-[#1D1D1F]">
                              Last Name *
                            </Label>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-[#1D1D1F]">
                              Email Address *
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-[#1D1D1F]">
                              Phone Number
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="(555) 123-4567"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject" className="text-sm font-medium text-[#1D1D1F]">
                            Subject *
                          </Label>
                          <select
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select a subject</option>
                            {subjects.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message" className="text-sm font-medium text-[#1D1D1F]">
                            Message *
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            rows={6}
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
                          className="w-full h-12 text-base font-medium bg-[#007AFF] hover:bg-[#0051D5] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-2">
                        Message Sent!
                      </h2>
                      <p className="text-[#6E6E73] mb-6">
                        Thank you for contacting us. We'll get back to you as soon as possible.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-[#007AFF] hover:bg-[#0051D5] text-white"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#1D1D1F] mb-4">
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#007AFF]/10 flex-shrink-0">
                        <Phone className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1D1D1F]">Phone</p>
                        <Link href="tel:843-858-3415" className="text-[#007AFF] hover:underline text-sm">
                          843-858-3415
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#007AFF]/10 flex-shrink-0">
                        <Mail className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1D1D1F]">Email</p>
                        <a href="mailto:billyearly3@gmail.com" className="text-[#007AFF] hover:underline text-sm">
                          billyearly3@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#007AFF]/10 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1D1D1F]">Address</p>
                        <p className="text-[#6E6E73] text-sm">
                          Serving farmers nationwide<br />
                          Across the United States
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-[#1e3a8a] to-[#2d4a8a] text-white">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">
                    Need a Quote?
                  </h2>
                  <p className="text-white/90 mb-4 text-sm">
                    Get personalized insurance quotes in minutes by answering a few simple questions.
                  </p>
                  <Link href="/quote-type-selection">
                    <Button className="w-full bg-white text-[#1e3a8a] hover:bg-gray-100 font-medium">
                      Get a Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
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
