/**
 * INTENTIONAL BUGS:
 * 1. Dark mode toggle: State changes but dark class never applied to document
 * 2. Missing form labels: Inputs have placeholder but no <label> elements
 * 3. Low contrast text: text-gray-300 on white background fails WCAG AA
 * 4. Name mismatch: Shows "Jane Doe" but Header says "Welcome, John"
 * 5. Unclosable modal: No close button and no backdrop click dismiss
 */

import { useState } from 'react'
import { Moon, Sun, Bell, Shield } from 'lucide-react'
import BugIndicator from './BugIndicator'

export default function UserProfile() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">JD</span>
          </div>
          <div>
            {/* BUG: Name mismatch — Header says "Welcome, John" */}
            <h3 className="text-lg font-semibold text-gray-900">
              Jane Doe
              <BugIndicator description="The profile shows 'Jane Doe' but the navigation header says 'Welcome, John'. The user name is hardcoded differently in two places." />
            </h3>
            {/* BUG: Low contrast — text-gray-300 on white is very hard to read */}
            <p className="text-gray-300 text-sm">
              Senior Product Designer
              <BugIndicator description="This text uses 'text-gray-300' on a white background, which fails WCAG AA contrast requirements. The text is nearly invisible and should use a darker shade like text-gray-500." />
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
        <BugIndicator description="Clicking 'Edit Profile' opens a modal dialog that has no close button and no way to dismiss it by clicking the backdrop. The user gets trapped." />
      </div>

      {/* Settings Panel */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>

        <div className="space-y-6">
          {/* BUG: Toggle changes visual state but never applies dark class to document */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Dark Mode
                  <BugIndicator description="The dark mode toggle animates visually but never actually applies a 'dark' class to the document. The theme state changes in React but is never synced to the DOM." />
                </p>
                {/* BUG: Low contrast text */}
                <p className="text-xs text-gray-300">Switch to dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  isDarkMode ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Notifications</p>
                <p className="text-xs text-gray-300">Email and push notifications</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                notifications ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  notifications ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          <hr className="border-gray-200" />

          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-gray-600" />
              <p className="text-sm font-medium text-gray-900">
                Account Details
                <BugIndicator description="The form inputs below have placeholder text but no associated <label> elements. This is an accessibility violation — screen readers can't identify what each field is for." />
              </p>
            </div>

            {/* BUG: No <label> elements — accessibility violation */}
            <input
              type="text"
              placeholder="Display name"
              defaultValue="Jane Doe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email address"
              defaultValue="jane@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Bio"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* BUG: Modal with no close button and no backdrop click to dismiss */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                defaultValue="Jane Doe"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email"
                defaultValue="jane@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                placeholder="About you"
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                Save
              </button>
              {/* No cancel/close button — user is trapped */}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
