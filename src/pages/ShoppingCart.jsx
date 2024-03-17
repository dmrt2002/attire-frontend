import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../store/cart/cartSlice'
import Loader from '../components/Loader';
import { useNavigate } from 'react-router';
import { notification } from 'antd';

export default function ShoppingCart() {
    let cartSlice = useSelector((state) => state.cart);
    let userSlice = useSelector((state) => state.user);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [subTotal, setSubTotal] = useState()
    const onRemove = (id) => {
        dispatch(
            removeFromCart(id)
        )
    }

    useEffect(() => {
        let subtotal = 0;
        cartSlice.map((item) => {
            subtotal = subtotal + item.price
        })
        setSubTotal(subtotal)
        console.log("cart removed", cartSlice)
        setLoading(true)
        setProducts(cartSlice)
        setLoading(false)
    }, [cartSlice])

    const onCheckout = () => {
        console.log(userSlice.id, "user info")
        if(!userSlice.id) {
            api.open({
                message: 'Action Required',
                description:
                  'To complete your purchase, please log in to your account.',
                duration: 2.0,
              });
        }
        else {
            navigate("/checkout")
        }
    }

    useEffect(() => {
        setProducts(cartSlice)
        setLoading(false)
    }, [])

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

    if (cartSlice.length === 0) {
        return (
            <>
                <Layout>
                    <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
                        <div className='md:text-lg text-sm text-center px-5 md:px-0'>
                            Your cart is awaiting some awesome products! Start shopping now.
                        </div>
                        <div className="mt-6">
                            <div
                                onClick={() => navigate("/products")}
                                className="inline-block cursor-pointer rounded-md border border-sky-800 px-6 py-2 font-medium"
                            >
                                Shop Now
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        )
    }

    return (
        <>
            <Layout>
            {contextHolder}
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                <h2 id="cart-heading" className="sr-only">
                                    Items in your shopping cart
                                </h2>

                                <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                                    {products.map((product) => (
                                        <li key={product.id} className="flex py-6 sm:py-10">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <div className="font-medium text-gray-700 hover:text-gray-800">
                                                                    {product.name}
                                                                </div>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-gray-500"></p>
                                                            {product.size ? (
                                                                <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
                                                            ) : null}
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">₹{product.price}</p>
                                                    </div>

                                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                                        <div className="absolute right-0 top-0">
                                                            <button type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                                <span className="sr-only">Remove</span>
                                                                <XMarkIcon onClick={() => onRemove(product.id)} className="h-5 w-5" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                                    <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                                    <span>In stock</span>
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Order summary */}
                            <section
                                aria-labelledby="summary-heading"
                                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                    Order summary
                                </h2>

                                <dl className="mt-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-600">Subtotal</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹{subTotal}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="flex items-center text-sm text-gray-600">
                                            <span>Shipping estimate</span>
                                            <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Learn more about how shipping is calculated</span>
                                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">₹25</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="flex text-sm text-gray-600">
                                            <span>Tax estimate</span>
                                            <div className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                                <span className="sr-only">Learn more about how tax is calculated</span>
                                                <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">₹8</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">₹{subTotal + 33}</dd>
                                    </div>
                                </dl>

                                <div className="mt-6">
                                    <button
                                        onClick={() => onCheckout()}
                                        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </section>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
