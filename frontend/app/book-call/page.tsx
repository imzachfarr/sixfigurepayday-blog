'use client'

import React, { useState, useEffect } from 'react'

export default function BookCallPage() {
  const [leadData, setLeadData] = useState<any>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [phone, setPhone] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('leadData')
    if (stored) {
      const data = JSON.parse(stored)
      setLeadData(data)
      // Pre-fill phone number if available
      if (data.phone) {
        setPhone(data.phone)
      }
    }
  }, [])

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooking(true)
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsBooking(false)
    setIsBooked(true)
  }

  const availableDates = [
    '2024-12-20', '2024-12-21', '2024-12-22', '2024-12-23', '2024-12-24'
  ]

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ]

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-green-600">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-black text-gray-800 mb-4 tracking-tight uppercase">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-gray-600 mb-6 font-semibold">
              Hi {leadData?.name}, your FREE strategy session has been booked!
            </p>
            
            <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-black mb-4 tracking-wide uppercase">📅 Your Session Details:</h3>
              <div className="space-y-2 text-lg font-semibold">
                <p><strong>Date:</strong> {selectedDate}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Duration:</strong> 30 minutes</p>
                <p><strong>Type:</strong> Video call (Zoom link will be sent)</p>
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
              <h3 className="text-xl font-black mb-4 tracking-wide uppercase">📧 What's Next:</h3>
              <ul className="space-y-2 text-lg text-left font-semibold">
                <li>✅ Check your email for the Zoom link</li>
                <li>✅ Prepare your questions about AI income</li>
                <li>✅ Have your goals ready to discuss</li>
                <li>✅ We'll send you a reminder 1 hour before</li>
              </ul>
            </div>

            <div className="mt-8 text-sm text-gray-600">
              <p>Need to reschedule? Reply to the confirmation email or call us.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-800 mb-4 tracking-tight uppercase">
              📞 Book Your FREE AI Strategy Session
            </h1>
            {leadData && (
              <p className="text-xl text-gray-600 font-semibold">
                Hi {leadData.name}, let's get you scheduled for your personalized AI income consultation!
              </p>
            )}
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-black text-center mb-4 tracking-wide uppercase">
              🚀 What You'll Get in This Session:
            </h2>
            <ul className="space-y-2 text-lg font-semibold">
              <li>• Personalized AI income strategy</li>
              <li>• Access to exclusive AI tools</li>
              <li>• Step-by-step action plan</li>
              <li>• 30-day roadmap to your first $10K</li>
            </ul>
          </div>

          <form onSubmit={handleBooking} className="space-y-6">
            <div>
              <label className="block text-lg font-black text-gray-700 mb-2 tracking-wide uppercase">
                Select Date: *
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                required
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="">Choose a date...</option>
                {availableDates.map(date => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-black text-gray-700 mb-2 tracking-wide uppercase">
                Select Time: *
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="">Choose a time...</option>
                {availableTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-black text-gray-700 mb-2 tracking-wide uppercase">
                Phone Number (for reminders):
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-purple-500 focus:outline-none"
                placeholder="Enter your phone number..."
              />
              <p className="text-sm text-gray-500 mt-1">We'll use this for appointment reminders</p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-400 p-6 rounded-lg">
              <h3 className="text-xl font-black text-center mb-4 tracking-wide uppercase">🎁 BONUS INCLUDED:</h3>
              <ul className="space-y-2 text-lg font-semibold">
                <li>✅ FREE AI Tool Access ($997 value)</li>
                <li>✅ Income Blueprint PDF ($297 value)</li>
                <li>✅ Private Community Access ($197 value)</li>
                <li>✅ 30-Day Support ($497 value)</li>
                <li className="font-black text-xl">Total Value: $1,988 - YOURS FREE!</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isBooking || !selectedDate || !selectedTime || !phone}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-2xl font-black py-4 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide uppercase"
            >
              {isBooking ? 'BOOKING YOUR SESSION...' : '📞 CONFIRM MY FREE SESSION NOW! 📞'}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            <p>🔒 100% secure booking - No credit card required</p>
            <p>⏰ Limited spots available - Book now before they're gone!</p>
            <p>💎 No obligation - 100% FREE consultation</p>
          </div>
        </div>
      </div>
    </div>
  )
} 