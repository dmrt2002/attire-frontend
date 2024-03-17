import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router';
import Layout from '../components/Layout';
import { useDispatch } from "react-redux";
import { clearCart } from '../store/cart/cartSlice';
import { createOrder } from '../helpers/api';
export default function Checkout() {
    let cartSlice = useSelector((state) => state.cart);
    let userSlice = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let [subtotal, setSubtotal] = useState(0)
    let [loading, setLoading] = useState(false)
    let [orderDetails, setOrderDetails] = useState({
        email: null,
        address: null,
        city: null,
        state: null,
        postal_code: null,
        cvc: null,
        card_number: null,
        exp: null,
        user_id: userSlice.id
    })
    let products = cartSlice
    useEffect(() => {
        if (products) {
            let total = 0;
            products.forEach((item) => {
                total = total + item.price
            })
            setSubtotal(total)
        }
    }, [])
    const onSubmit = () => {
        setLoading(true)
        cartSlice.forEach(async (item) => {
            let body = {
                data: {
                    user_id: userSlice.id,
                    product_id: item.id,
                    email: orderDetails.email,
                    card_number: orderDetails.card_number,
                    exp: orderDetails.exp,
                    cvc: orderDetails.cvc,
                    address: orderDetails.address,
                    postal_code: orderDetails.postal_code,
                    state: orderDetails.state,
                    city: orderDetails.city
                }
            }
            console.log(body, "body")
            let res = await createOrder(body)
            console.log(res, "Response")
        })
        setLoading(false)
        dispatch(clearCart())
        navigate("/")
    }
    if (loading) {
        return (
            <>
                <Layout>
                    <div className='h-[80vh] w-full flex items-center justify-center'>
                        <Loader />
                    </div>
                </Layout>
            </>
        )
    }
    return (
        <div className="bg-white">
            {/* Background color split screen for large screens */}
            <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
            <div className="fixed right-0 top-0 hidden h-full w-1/2 bg-indigo-900 lg:block" aria-hidden="true" />

            <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 lg:pt-16">
                <h1 className="sr-only">Checkout</h1>

                <section
                    aria-labelledby="summary-heading"
                    className="bg-indigo-900 py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
                >
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <h2 id="summary-heading" className="sr-only">
                            Order summary
                        </h2>

                        <ul role="list" className="divide-y divide-white divide-opacity-10 text-sm font-medium">
                            {products.map((product) => (
                                <li key={product.id} className="flex items-start space-x-4 py-6">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-20 w-20 flex-none rounded-md object-cover object-center"
                                    />
                                    <div className="flex-auto space-y-1">
                                        <h3 className="text-white">{product.name}</h3>
                                        <p className="flex-none text-base mt-3 font-medium text-white">₹{product.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd>₹{subtotal}</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt>Shipping</dt>
                                <dd>₹25</dd>
                            </div>

                            <div className="flex items-center justify-between">
                                <dt>Taxes</dt>
                                <dd>₹8</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
                                <dt className="text-base">Total</dt>
                                <dd className="text-base">₹{subtotal + 33}</dd>
                            </div>
                        </dl>
                    </div>
                </section>

                <section
                    aria-labelledby="payment-and-shipping-heading"
                    className="py-16 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:pb-24 lg:pt-0"
                >
                    <h2 id="payment-and-shipping-heading" className="sr-only">
                        Payment and shipping details
                    </h2>

                    <div>
                        <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                            <div>
                                <h3 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                                    Contact information
                                </h3>

                                <div className="mt-6">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={(e) => setOrderDetails({
                                                ...orderDetails,
                                                email: e.target.value
                                            })}
                                            required
                                            className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">Payment details</h3>

                                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                    <div className="col-span-3 sm:col-span-4">
                                        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                                            Card number
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="card"
                                                name="cardnumber"
                                                type="text"
                                                onChange={(e) => setOrderDetails({
                                                    ...orderDetails,
                                                    card_number: e.target.value
                                                })}
                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-2 sm:col-span-3">
                                        <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                                            Expiration date (MM/YY)
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="cv"
                                                name="cv"
                                                onChange={(e) => setOrderDetails({
                                                    ...orderDetails,
                                                    exp: e.target.value
                                                })}
                                                type="text"
                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                                            CVC
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="svc"
                                                name="svc"
                                                onChange={(e) => setOrderDetails({
                                                    ...orderDetails,
                                                    cvc: e.target.value
                                                })}
                                                type="text"
                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-lg font-medium text-gray-900">Shipping address</h3>

                                <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="address"
                                                name="address"
                                                onChange={(e) => setOrderDetails({
                                                    ...orderDetails,
                                                    address: e.target.value
                                                })}
                                                type="text"
                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                onChange={(e) => setOrderDetails({
                                                    ...orderDetails,
                                                    city: e.target.value
                                                })}
                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                            State / Province
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="region"
                                                name="region"
                                                type="text"
                                                onChange={(e) => setOrderDetails({
                                                    ...orderDetails,
                                                    state: e.target.value
                                                })}
                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                            Postal code
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="postalcode"
                                                name="postalcode"
                                                onChange={(e) => setOrderDetails({
                                                    ...orderDetails,
                                                    postal_code: e.target.value
                                                })}
                                                type="text"
                                                className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                                <button
                                    onClick={() => onSubmit()}
                                    className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Pay now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
