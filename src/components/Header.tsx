/**
 * INTENTIONAL BUGS:
 * 1. Z-index conflict: dropdown renders behind HeroSection (z-10 vs z-20)
 * 2. Broken link: "Features" link points to #broken (404)
 * 3. Hardcoded name mismatch: Shows "Welcome, John" but UserProfile shows "Jane Doe"
 */

import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import BugIndicator from './BugIndicator'

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold text-indigo-600">
            BuggyApp
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 bg-transparent border-none p-0 text-sm font-medium"
              >
                Products
                <ChevronDown className="w-4 h-4" />
              </button>
              <BugIndicator description="The Products dropdown menu appears behind the hero section below. The dropdown has z-index: 10 but the hero section has z-index: 20, so it's hidden underneath." />

              {/* BUG: z-10 here but HeroSection is z-20, so this renders behind it */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                  <a href="#analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Analytics
                  </a>
                  <a href="#automation" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Automation
                  </a>
                  <a href="#integrations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Integrations
                  </a>
                </div>
              )}
            </div>

            {/* BUG: Broken link — goes nowhere useful */}
            <a href="#broken" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Features
            </a>
            <BugIndicator description="The 'Features' nav link points to '#broken' — a section that doesn't exist on the page. It should link to a valid anchor or page." />
            <a href="#pricing" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Pricing
            </a>
            <a href="#profile" className="text-gray-700 hover:text-indigo-600 text-sm font-medium">
              Account
            </a>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* BUG: Hardcoded "John" — but UserProfile says "Jane Doe" */}
          <span className="text-sm text-gray-600">Welcome, John</span>
          <BugIndicator description="The header says 'Welcome, John' but the profile section below shows 'Jane Doe'. The user's name is inconsistent across the app." />
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-indigo-600">J</span>
          </div>
        </div>

        <button
          className="md:hidden bg-transparent border-none p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-2">
          <a href="#broken" className="block text-gray-700 py-1">Features</a>
          <a href="#pricing" className="block text-gray-700 py-1">Pricing</a>
          <a href="#profile" className="block text-gray-700 py-1">Account</a>
          <span className="block text-sm text-gray-500 pt-2">Welcome, John</span>
        </div>
      )}
    </header>
  )
}
