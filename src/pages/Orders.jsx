import { CheckIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';
import { fetchOrder, fetchProductByOrder } from '../helpers/api';

export default function Orders() {
    let userSlice = useSelector((state) => state.user);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [details, setDetails] = useState([])
    useEffect(() => {
        setLoading(true)
        fetchOrders()
    }, [])

    useEffect(() => {
        if(details.length > 0) {
            setLoading(false)
        }
    }, [details])

    async function fetchAndProcessOrders(orders) {
        const detailArray = [];

        for (const order of orders) {
            try {
                const res = await fetchProductByOrder(order.product_id)
                const product = res.data.data.attributes;
                const value = order.id + res.data.data.id + userSlice.id;
                detailArray.push({
                    number: value,
                    total: product.price + 33,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    status: "Ordered",
                    date: order.createdAt
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        setDetails(detailArray);
    }

    const fetchOrders = async () => {
        if (userSlice.id) {
            let res = await fetchOrder(userSlice.id)
            console.log(res, "response")
            let orders = res.data.orders
            if(orders.length === 0) {
                setLoading(false)
            }
            console.log(orders, "orders")
            if (!Array.isArray(orders)) {
                orders = [orders]
            }
            await fetchAndProcessOrders(orders);
        }
    }

    if (!userSlice.id) {
        return (
            <>
                <Layout>
                    <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
                        <div className='md:text-lg md:px-0 px-5 text-sm text-center'>
                            Login and join the shopping fun! We've got amazing things waiting for you.
                        </div>
                        <div className="mt-6">
                            <div
                                onClick={() => navigate("/login")}
                                className="inline-block cursor-pointer rounded-md border border-sky-800 px-6 py-2 font-medium"
                            >
                                Login
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        )
    }


    if (details.length === 0 && loading === false) {
        return (
            <>
                <Layout>
                    <div className='h-[80vh] w-full flex flex-col items-center justify-center'>
                        <div className='md:text-lg text-sm text-center px-5 md:px-0'>
                            It looks like your orders are on a little vacation. Time to book some shopping adventures!.
                        </div>
                        <div className="mt-6">
                            <div
                                onClick={() => navigate("/login")}
                                className="inline-block cursor-pointer rounded-md border border-sky-800 px-6 py-2 font-medium"
                            >
                                Shop now
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
                {loading ? (
                    <>
                        <div className='h-[80vh] w-full flex items-center justify-center'>
                            <Loader style={{ color: "blue" }} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white">
                            <div className="mx-auto max-w-4xl py-16 sm:px-6 sm:py-24">
                                <div className="px-4 sm:px-0">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Check the status of recent orders, manage returns.
                                    </p>
                                </div>

                                <div className="mt-16">
                                    <h2 className="sr-only">Recent orders</h2>

                                    <div className="space-y-16 sm:space-y-24">
                                        {details.map((order) => (
                                            <div key={order.number}>
                                                <h3 className="sr-only">
                                                    Order placed on {order.date}
                                                </h3>

                                                <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                                                    <dl className="flex-auto space-y-4 divide-y divide-gray-200 text-sm text-gray-600 md:grid md:grid-cols-3 md:gap-x-6 md:space-y-0 md:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                                        <div className="flex justify-between md:block">
                                                            <dt className="font-medium text-gray-900">Order number</dt>
                                                            <dd className="md:mt-1">{order.number}</dd>
                                                        </div>
                                                        <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                                                            <dt>Total amount</dt>
                                                            <dd className="md:mt-1">₹{order.total}</dd>
                                                        </div>
                                                    </dl>
                                                </div>

                                                <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                                                    <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                                                        <div key={order.number} className="flex py-6 sm:py-10">
                                                            <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                                                                <div className="lg:flex-1">
                                                                    <div className="sm:flex">
                                                                        <div>
                                                                            <h4 className="font-medium text-gray-900">{order.name}</h4>
                                                                            <p className="mt-2 hidden text-sm text-gray-500 sm:block">{order.description}</p>
                                                                        </div>
                                                                        <p className="mt-1 font-medium text-gray-900 sm:ml-6 sm:mt-0">₹{order.price}</p>
                                                                    </div>
                                                                    <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                                                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                                                                            View Product
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-6 font-medium">
                                                                    <p>{order.status}</p>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4 flex-shrink-0 sm:order-first sm:m-0 sm:mr-6">
                                                                <img
                                                                    src={order.image}
                                                                    alt={order.name}
                                                                    className="col-start-2 col-end-3 h-20 w-20 rounded-lg object-cover object-center sm:col-start-1 sm:row-span-2 sm:row-start-1 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Layout>
        </>
    )
}
