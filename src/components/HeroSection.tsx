/**
 * NO INTENTIONAL BUGS in this component.
 * However, the relative z-20 positioning causes Header's dropdown to render behind it.
 */

export default function HeroSection() {
  return (
    <section className="relative z-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Build Better Apps, Faster
        </h2>
        <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
          The all-in-one platform for teams who ship. Analytics, automation, and
          integrations — everything you need in one dashboard.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started Free
          </button>
          <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  )
}
