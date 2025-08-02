'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LeadMagnetPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Call the API to capture the lead
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to capture lead')
      }

      // Store in localStorage for demo
      localStorage.setItem('leadData', JSON.stringify(formData))
      
      setIsSubmitting(false)
      setStep(2)
    } catch (error) {
      console.error('Error capturing lead:', error)
      setIsSubmitting(false)
      // For demo purposes, still proceed to next step even if API fails
      localStorage.setItem('leadData', JSON.stringify(formData))
      setStep(2)
    }
  }

  const handleVideoComplete = () => {
    setStep(3)
  }

  const handleBookCall = () => {
    router.push('/book-call')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600">
      <div className="container mx-auto px-4 py-8">
        
        {/* Step 1: Lead Capture */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black text-gray-800 mb-4 tracking-tight uppercase" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                🚨 ATTENTION: Regular People Making $100K+ Monthly with AI! 🚨
              </h1>
              <div className="bg-blue-600 text-white p-4 rounded-lg mb-6">
                <h2 className="text-2xl font-black mb-2 tracking-wide uppercase">FREE TRAINING ALERT!</h2>
                <p className="text-lg font-semibold">
                  Discover how ordinary folks just like YOU are making hundreds of thousands of dollars every month using AI!
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-black text-center mb-4 tracking-wide uppercase">🔥 LIMITED TIME OFFER 🔥</h3>
              <ul className="space-y-2 text-lg font-semibold">
                <li>✅ Learn the EXACT AI strategies that work</li>
                <li>✅ See real people's income proof</li>
                <li>✅ Get started with ZERO upfront cost</li>
                <li>✅ Join our exclusive community</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-black text-gray-700 mb-2 tracking-wide uppercase">
                  Your First Name: *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your first name..."
                />
              </div>
              
                              <div>
                  <label className="block text-lg font-black text-gray-700 mb-2 tracking-wide uppercase">
                    Your Email Address: *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your email address..."
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-black text-gray-700 mb-2 tracking-wide uppercase">
                    Your Phone Number: *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your phone number..."
                  />
                </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl font-black py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 tracking-wide uppercase"
              >
                {isSubmitting ? 'PROCESSING...' : '🔥 GET MY FREE TRAINING NOW! 🔥'}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-600">
              <p>🔒 Your information is 100% secure and private</p>
              <p>📧 You'll receive instant access to the training</p>
            </div>
          </div>
        )}

        {/* Step 2: Video Player */}
        {step === 2 && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-gray-800 mb-4 tracking-tight uppercase">
                🎬 Your FREE AI Training Video is Ready!
              </h1>
              <p className="text-xl text-gray-600 font-semibold">
                Hi {formData.name}, watch this exclusive training to discover the AI secrets!
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-8">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">▶️</div>
                  <p className="text-xl">AI Training Video</p>
                  <p className="text-sm text-gray-400 mt-2">(Demo: Click to simulate video completion)</p>
                  <button
                    onClick={handleVideoComplete}
                    className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Simulate Video Complete
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-black text-center mb-4 tracking-wide uppercase">💡 What You'll Learn:</h3>
              <ul className="space-y-2 text-lg font-semibold">
                <li>• The #1 AI tool that's making people rich</li>
                <li>• How to automate your income with AI</li>
                <li>• Real case studies of $100K+ monthly earners</li>
                <li>• Step-by-step blueprint to get started today</li>
              </ul>
            </div>
          </div>
        )}

        {/* Step 3: Book Call */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-gray-800 mb-4 tracking-tight uppercase">
                🎉 Congratulations, {formData.name}!
              </h1>
              <p className="text-xl text-gray-600 mb-6 font-semibold">
                You've completed the training! Now it's time to take action...
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-black text-center mb-4 tracking-wide uppercase">
                🚀 Ready to Start Your AI Money Journey?
              </h2>
              <p className="text-lg text-center font-semibold">
                Book a FREE strategy session with our AI experts and get your personalized roadmap to $100K+ monthly income!
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-black text-center mb-4 tracking-wide uppercase">🎁 BONUS OFFER:</h3>
              <ul className="space-y-2 text-lg font-semibold">
                <li>✅ FREE 30-minute strategy session</li>
                <li>✅ Personalized AI income plan</li>
                <li>✅ Access to exclusive AI tools</li>
                <li>✅ Priority support from our team</li>
              </ul>
            </div>

            <button
              onClick={handleBookCall}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-2xl font-black py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 tracking-wide uppercase"
            >
              📞 BOOK MY FREE STRATEGY SESSION NOW! 📞
            </button>

            <div className="text-center mt-6 text-sm text-gray-600">
              <p>⏰ Limited spots available - Book now before they're gone!</p>
              <p>💎 No obligation - 100% FREE consultation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 