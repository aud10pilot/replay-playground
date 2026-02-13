/**
 * INTENTIONAL BUGS:
 * 1. Double form submit: No loading state, button not disabled — submits fire twice
 * 2. Timer memory leak: setInterval in useEffect with no cleanup
 * 3. Infinite scroll fires on mount: handleScroll() called immediately in useEffect
 */

import { useState, useEffect } from 'react'
import { Send, Clock, ArrowDown } from 'lucide-react'
import BugIndicator from './BugIndicator'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submissions, setSubmissions] = useState<string[]>([])

  // BUG: No debounce, no loading state, no button disable
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissions((prev) => [...prev, email])
    console.log("Form submitted:", email)
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-2">
        Subscribe to Newsletter
        <BugIndicator description="The subscribe button has no loading state and is never disabled during submission. Rapid clicks will submit the form multiple times, causing duplicate subscriptions." />
      </h3>
      <p className="text-sm text-gray-600 mb-4">Get weekly updates on new features and tips.</p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* BUG: Button is never disabled during submission */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Subscribe
        </button>
      </form>

      {submissions.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            Submitted {submissions.length} time{submissions.length > 1 ? 's' : ''}
            {submissions.length > 1 && ' — looks like a double submit bug!'}
          </p>
        </div>
      )}
    </div>
  )
}

function CountdownTimer() {
  const [countdown, setCountdown] = useState(300)
  const [isVisible, setIsVisible] = useState(true)

  // BUG: No cleanup — interval keeps running after unmount
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1)
      // This will cause a React warning when component unmounts
    }, 1000)

    // Missing: return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Flash Sale Countdown
          <BugIndicator description="The countdown timer uses setInterval in a useEffect but never cleans it up. Even after hiding or unmounting the component, the interval keeps running in the background — a classic memory leak." />
        </h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="text-xs text-indigo-600 hover:text-indigo-700 bg-transparent border-none underline"
        >
          {isVisible ? 'Hide Timer' : 'Show Timer'}
        </button>
      </div>

      {isVisible && (
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-red-500" />
          <span className="text-2xl font-mono font-bold text-gray-900">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-sm text-gray-500">remaining</span>
        </div>
      )}

      {!isVisible && (
        <p className="text-sm text-gray-500">
          Timer hidden (but still running in the background — check the console!)
        </p>
      )}
    </div>
  )
}

function InfiniteScrollDemo() {
  const [items, setItems] = useState<string[]>([
    "Activity: User signed up",
    "Activity: Payment received",
    "Activity: Report generated",
    "Activity: Settings updated",
    "Activity: Invoice sent",
  ])
  const [loadCount, setLoadCount] = useState(0)

  // BUG: handleScroll called immediately on mount — triggers load before user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        setLoadCount((prev) => prev + 1)
        setItems((prev) => [
          ...prev,
          `Activity: Auto-loaded item ${prev.length + 1}`,
          `Activity: Auto-loaded item ${prev.length + 2}`,
        ])
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // BUG: Called on mount!

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Activity Feed
          <BugIndicator description="The infinite scroll handler is called immediately on component mount (before the user scrolls). This causes extra items to be loaded right away, even if the user hasn't scrolled to the bottom." />
        </h3>
        {loadCount > 0 && (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Auto-loaded {loadCount} time{loadCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-700 py-1 border-b border-gray-100">
            <ArrowDown className="w-3 h-3 text-gray-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function InteractiveElements() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <NewsletterForm />
      <CountdownTimer />
      <div className="lg:col-span-2">
        <InfiniteScrollDemo />
      </div>
    </div>
  )
}
