import { useEffect, useState } from 'react'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout'
import { useLocation } from 'react-router'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cart/cartSlice'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import { fetchProductById } from '../helpers/api'
import { notification } from 'antd';
const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const [selectedSize, setSelectedSize] = useState('L')
    const [api, contextHolder] = notification.useNotification();
    let cartSlice = useSelector((state) => state.cart);
    const [product, setProduct] = useState(null)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [buttonText, setButtonText] = useState("Add to bag")
    let [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    let location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        fetchProduct()
    }, [])

    let onAdd = () => {
        if (buttonText === "Added to bag") {
            return;
        }
        setButtonLoading(true)
        dispatch(
            addToCart({
                id: product.id,
                name: product.attributes.name,
                description: product.attributes.description,
                image: product.attributes.image,
                price: product.attributes.price
            })
        );
        api.open({
            message: 'Item added to cart!',
            description:
              `${product.attributes.name}`,
            duration: 2.0,
          });
        setButtonText("Added to bag")
        setButtonLoading(false)
    }

    const fetchProduct = async () => {
        const parts = location.pathname.split("/");
        const productId = parts.pop();
        let res = await fetchProductById(productId)
        console.log("response", res)
        setProduct(res.data.data)
    }

    useEffect(() => {
        if (product !== null) {
            let alreadyAdded = false
            console.log(cartSlice, "cart")
            cartSlice.forEach((item) => {
                if (item.id === product.id) {
                    alreadyAdded = true
                }
            })
            console.log(alreadyAdded, "added")
            if (alreadyAdded) {
                setButtonText("Added to bag")
            }
            setLoading(false)
        }
    }, [product])

    if (loading) {
        <>
            <Layout>
                <div className='h-[80vh] w-full flex items-center justify-center'>
                    <Loader style={{ color: "blue" }} />
                </div>
            </Layout>
        </>
    }

    return (
        <>
        {contextHolder}
            <Layout>
                {loading && (
                    <>
                        <div className='h-[80vh] w-full flex items-center justify-center'>
                            <Loader style={{ color: "blue" }} />
                        </div>
                    </>
                )}
                {product && !loading && (
                    <>
                        <ArrowLeftIcon onClick={() => navigate("/products")} className='ml-12 mt-4 cursor-pointer flex-1' height={24} width={24} />
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                            <div className="lg:max-w-lg lg:self-end">
                                <div className="mt-4">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.attributes.name}</h1>
                                </div>

                                <section aria-labelledby="information-heading" className="mt-4">
                                    <h2 id="information-heading" className="sr-only">
                                        Product information
                                    </h2>

                                    <div className="flex items-center">
                                        <p className="text-lg text-gray-900 sm:text-xl">₹{product.attributes.price}</p>

                                        <div className="ml-4 border-l border-gray-300 pl-4">
                                            <h2 className="sr-only">Reviews</h2>
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="flex items-center">
                                                        {[0, 1, 2, 3, 4].map((rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={classNames(
                                                                    reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                                                                    'h-5 w-5 flex-shrink-0'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                                </div>
                                                <p className="ml-2 text-sm text-gray-500">{reviews.totalCount} reviews</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-6">
                                        <p className="text-base text-gray-500">{product.attributes.description}</p>
                                    </div>

                                    <div className="mt-6 flex items-center">
                                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                        <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                                    </div>
                                </section>
                            </div>

                            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                                    <img src={product.attributes.image} alt={product.attributes.name} className="h-full w-full object-cover object-center" />
                                </div>
                            </div>

                            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
                                <section aria-labelledby="options-heading">
                                    <h2 id="options-heading" className="sr-only">
                                        Product options
                                    </h2>

                                    <form>
                                        <div className="sm:flex sm:justify-between">
                                            {/* Size selector */}
                                            <RadioGroup value={selectedSize} onChange={setSelectedSize}>
                                                <RadioGroup.Label className="block text-sm font-medium text-gray-700">Size</RadioGroup.Label>
                                                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <RadioGroup.Option
                                                        as="div"
                                                        key={"XL"}
                                                        value={"XL"}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'ring-2 ring-indigo-500' : '',
                                                                'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        {({ active, checked }) => (
                                                            <>
                                                                <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                                                                    {"XL"}
                                                                </RadioGroup.Label>
                                                                <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                                                                    clothes generally caters to individuals who are taller or have a larger build.
                                                                </RadioGroup.Description>
                                                                <div
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-lg'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                    <RadioGroup.Option
                                                        as="div"
                                                        key={"L"}
                                                        value={"L"}
                                                        className={({ active }) =>
                                                            classNames(
                                                                active ? 'ring-2 ring-indigo-500' : '',
                                                                'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        {({ active, checked }) => (
                                                            <>
                                                                <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                                                                    {"L"}
                                                                </RadioGroup.Label>
                                                                <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                                                                    suitable for people with an average build.
                                                                </RadioGroup.Description>
                                                                <div
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-lg'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                        <div className="mt-4">
                                            <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                                                <span>What size should I buy?</span>
                                                <QuestionMarkCircleIcon
                                                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </div>
                                        <div className="mt-10">
                                            <button
                                                onClick={() => onAdd()}
                                                className={`flex w-full items-center justify-center rounded-md border-sky-800 border ${buttonLoading ? 'bg-white' : 'bg-indigo-600'} ${buttonText === 'Add to bag' ? '' : 'bg-white'}  px-8 py-3 text-base font-medium text-white`}
                                            >
                                                {buttonLoading ? (
                                                    <><Loader /></>
                                                ) : (
                                                    <div className={`${buttonText === "Add to bag" ? 'text-white' : 'text-sky-800 '}`}>{buttonText}</div>
                                                )}
                                            </button>
                                        </div>
                                        <div className="mt-6 text-center">
                                            <a href="#" className="group inline-flex text-base font-medium">
                                                <ShieldCheckIcon
                                                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                    aria-hidden="true"
                                                />
                                                <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
                                            </a>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>
                    </>
                )}
            </Layout>
        </>
    )
}
