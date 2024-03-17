import Layout from '../components/Layout'
import { useNavigate } from 'react-router'

const offers = [
    { name: 'Download the app', description: 'Get an exclusive ₹100 off code', href: '#' },
    { name: "Return when you're ready", description: '60 days of free returns', href: '#' },
    { name: 'Sign up for our newsletter', description: '15% off your first order', href: '#' },
]

const testimonials = [
    {
        id: 1,
        quote:
            'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
        attribution: 'Tushar, india',
    },
    {
        id: 2,
        quote:
            'I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!',
        attribution: 'Namith, india',
    },
    {
        id: 3,
        quote:
            'Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.',
        attribution: 'Virat, india',
    },
]

export default function Home() {
    const navigate = useNavigate()
    return (
        <>
            <Layout>
                <main>
                    <div className="flex flex-col border-b border-gray-200 lg:border-0">
                        <nav aria-label="Offers" className="order-last lg:order-first">
                            <div className="mx-auto max-w-7xl lg:px-8">
                                <ul
                                    role="list"
                                    className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
                                >
                                    {offers.map((offer) => (
                                        <li key={offer.name} className="flex flex-col">
                                            <a
                                                href={offer.href}
                                                className="relative flex flex-1 flex-col justify-center bg-white px-4 py-6 text-center focus:z-10"
                                            >
                                                <p className="text-sm text-gray-500">{offer.name}</p>
                                                <p className="font-semibold text-gray-900">{offer.description}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </nav>

                        <div className="relative">
                            <div aria-hidden="true" className="absolute hidden h-full w-1/2 bg-gray-100 lg:block" />
                            <div className="relative bg-gray-100 lg:bg-transparent">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                                    <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                                        <div className="lg:pr-16">
                                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                                                Dress for Clarity.
                                            </h1>
                                            <p className="mt-4 text-xl text-gray-600">
                                                Confidence Starts with Clarity: Curate Your Wardrobe, Conquer Your Day.
                                            </p>
                                            <div className="mt-6">
                                                <div
                                                    onClick={() => navigate("/products")}
                                                    className="inline-block cursor-pointer rounded-md border border-transparent bg-indigo-600 px-8 py-3 font-medium text-white hover:bg-indigo-700"
                                                >
                                                    Shop Now
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-48 w-full sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2">
                                <img
                                    src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden my-12 md:my-24">
                        <div aria-hidden="true" className="absolute inset-0">
                            <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
                                <img
                                    src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                                    alt=""
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>
                            <div className="absolute inset-0 bg-white bg-opacity-75" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
                        </div>

                        {/* Sale */}
                        <section
                            aria-labelledby="sale-heading"
                            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
                        >
                            <div className="mx-auto max-w-2xl lg:max-w-none">
                                <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                    Get 25% off during our one-time sale
                                </h2>
                                <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                                    Most of our products are limited releases that won't come back. Get your favorite items while they're in
                                    stock.
                                </p>
                            </div>
                        </section>
                        <section
                            aria-labelledby="testimonial-heading"
                            className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
                        >
                            <div className="mx-auto max-w-2xl lg:max-w-none">
                                <h2 id="testimonial-heading" className="text-2xl font-bold tracking-tight text-gray-900">
                                    What are people saying?
                                </h2>

                                <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                                    {testimonials.map((testimonial) => (
                                        <blockquote key={testimonial.id} className="sm:flex lg:block">
                                            <svg
                                                width={24}
                                                height={18}
                                                viewBox="0 0 24 18"
                                                aria-hidden="true"
                                                className="flex-shrink-0 text-gray-300"
                                            >
                                                <path
                                                    d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                            <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                                                <p className="text-lg text-gray-600">{testimonial.quote}</p>
                                                <cite className="mt-4 block font-semibold not-italic text-gray-900">
                                                    {testimonial.attribution}
                                                </cite>
                                            </div>
                                        </blockquote>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </Layout>
        </>
    )
}