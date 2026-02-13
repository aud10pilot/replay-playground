import Header from './components/Header'
import HeroSection from './components/HeroSection'
import PricingCards from './components/PricingCards'
import UserProfile from './components/UserProfile'
import DataTable from './components/DataTable'
import InteractiveElements from './components/InteractiveElements'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Instructions Banner */}
      <div className="bg-indigo-700 text-white py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            Replay Debugging Playground
          </h1>
          <p className="text-lg text-indigo-200 mb-8">
            Take the Replay chrome extension for a test drive.
          </p>

          <ol className="space-y-3 text-base mb-8">
            <li className="flex items-start gap-3">
              <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span>
                Install the Replay extension
                <a
                  href="https://chromewebstore.google.com/detail/replay/placeholder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 inline-block bg-white text-indigo-700 px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Install Extension
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <span>Launch the extension while viewing this page</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-white/20 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <span>Ask the agent to fix one of the issues</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Buggy App Starts Here */}
      <Header />
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <section id="pricing">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Products</h2>
          <PricingCards />
        </section>

        <section id="profile">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
          <UserProfile />
        </section>

        <section id="data">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Dashboard</h2>
          <DataTable />
        </section>

        <section id="interactive">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <InteractiveElements />
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default App
