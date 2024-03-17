import Layout from "../components/Layout"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { fetchAllProducts } from "../helpers/api"

export default function ProductList() {
    const navigate = useNavigate()
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchProducts()
    }, [])
    let fetchProducts = async () => {
        let res = await fetchAllProducts()
        if(res) {
            setLoading(false)
            setProducts(res.data.data)
        }
    }
    if(loading) {
        return (
            <>
            <Layout>
                <div className="h-[80vh] w-full flex items-center justify-center">
                    <Loader style={{color: "blue"}} />
                </div>
            </Layout>
            </>
        )
    }
    return (
        <>
            <Layout>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">Products</h2>

                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
                        {products.length > 0 && products.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="group relative cursor-pointer flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                            >
                                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                                    <img
                                        src={product.attributes.image}
                                        alt={product.attributes.name}
                                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col space-y-2 p-4">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.attributes.name}
                                        </a>
                                    </h3>
                                    <p className="text-sm text-gray-500">{product.attributes.description}</p>
                                    <div className="flex flex-1 flex-col justify-end">
                                        <p className="text-base font-medium text-gray-900">₹ {product.attributes.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    )
}
