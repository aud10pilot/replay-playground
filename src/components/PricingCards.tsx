/**
 * INTENTIONAL BUGS:
 * 1. Text overflow: First card title is very long with no truncation/overflow handling
 * 2. $NaN price: First product price is parseInt("") which yields NaN
 * 3. Dead button: "Add to Cart" buttons have no onClick handler
 * 4. Stretched image: Images use w-full h-32 without object-cover
 * 5. Broken responsive grid: md:grid-cols-4 for 3 items causes layout issues at tablet
 */

import BugIndicator from './BugIndicator'

const products = [
  {
    id: 1,
    title: "Enterprise Analytics Dashboard Pro with Advanced Reporting and Custom Integrations",
    description: "A comprehensive analytics solution for data-driven teams who need real-time insights.",
    price: parseInt(""),
    image: "https://picsum.photos/seed/product1/400/600",
  },
  {
    id: 2,
    title: "Team Pro",
    description: "Perfect for growing teams that need collaboration tools and shared dashboards.",
    price: 49,
    image: "https://picsum.photos/seed/product2/400/200",
  },
  {
    id: 3,
    title: "Starter",
    description: "Everything you need to get started with basic analytics and reporting.",
    price: 19,
    image: "https://picsum.photos/seed/product3/400/400",
  },
]

export default function PricingCards() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <BugIndicator description="The product grid uses 4 columns at tablet widths (md:grid-cols-4) for only 3 items. This creates an empty column and awkward spacing at medium viewport sizes." />
      </div>
      {/* BUG: md:grid-cols-4 for 3 items — cards stretch oddly at tablet widths */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
          >
            {/* BUG: No object-cover — images stretch to fill w-full h-32 */}
            <div className="relative">
              <img
                src={product.image}
                alt=""
                className="w-full h-32"
              />
              {product.id === 1 && (
                <div className="absolute top-2 right-2">
                  <BugIndicator description="Product images are stretched and distorted. They use a fixed width and height without 'object-fit: cover', so the original aspect ratio is lost." />
                </div>
              )}
            </div>

            <div className="p-5">
              {/* BUG: Long title overflows with no truncation */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {product.title}
                {product.id === 1 && (
                  <BugIndicator description="This product title is very long and overflows its container. It's missing text truncation (e.g., overflow-hidden, text-overflow: ellipsis) so it pushes the layout." />
                )}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                {/* BUG: product.price is NaN for the first product */}
                <span className="text-2xl font-bold text-gray-900">
                  ${product.price}
                  {product.id === 1 && (
                    <BugIndicator description="The price displays '$NaN' because the value is parsed from an empty string using parseInt(''). It should default to 0 or use a valid number." />
                  )}
                </span>

                {/* BUG: No onClick handler — button does nothing */}
                <span className="relative">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                    Add to Cart
                  </button>
                  {product.id === 2 && (
                    <BugIndicator description="The 'Add to Cart' buttons have no click handler attached. Clicking them does absolutely nothing — no event listener is wired up." />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
