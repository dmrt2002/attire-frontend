import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import { Popover } from 'antd';
import { useDispatch } from "react-redux";
import { updateUser } from "../store/user/userSlice";
const footerNavigation = {
    products: [
        { name: 'Bags', href: '#' },
        { name: 'Tees', href: '#' },
        { name: 'Objects', href: '#' },
        { name: 'Home Goods', href: '#' },
        { name: 'Accessories', href: '#' },
    ],
    customerService: [
        { name: 'Contact', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'Secure Payments', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' },
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' },
    ],
    legal: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Return Policy', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Shipping Policy', href: '#' },
    ],
    bottomLinks: [
        { name: 'Accessibility', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
    ],
}
// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
    const navigate = useNavigate()
    let cartSlice = useSelector((state) => state.cart);
    let userSlice = useSelector((state) => state.user);

    let OrdersIcon = () => {
        return (
            <>
                <svg onClick={() => navigate("/orders")} className="h-6 w-6 mx-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="256" height="256"><path d="M26,3H10C8.3457,3,7,4.3457,7,6v1H6c-1.6543,0-3,1.3457-3,3v16c0,1.6543,1.3457,3,3,3h16c1.6543,0,3-1.3457,3-3v-1h1c1.6543,0,3-1.3457,3-3V6C29,4.3457,27.6543,3,26,3z M23,26c0,0.5513-0.4487,1-1,1H6c-0.5513,0-1-0.4487-1-1V10c0-0.5513,0.4487-1,1-1h16c0.5513,0,1,0.4487,1,1V26z M27,22c0,0.5513-0.4487,1-1,1h-1V10c0-1.6543-1.3457-3-3-3H9V6c0-0.5513,0.4487-1,1-1h16c0.5513,0,1,0.4487,1,1V22z" fill='currentColor'></path><path fill='currentColor' d="M7.5 13h13c.2761 0 .5-.2239.5-.5v-1c0-.2761-.2239-.5-.5-.5h-13C7.2239 11 7 11.2239 7 11.5v1C7 12.7761 7.2239 13 7.5 13zM7.5 17h13c.2761 0 .5-.2239.5-.5v-1c0-.2761-.2239-.5-.5-.5h-13C7.2239 15 7 15.2239 7 15.5v1C7 16.7761 7.2239 17 7.5 17zM7.5 21h13c.2761 0 .5-.2239.5-.5v-1c0-.2761-.2239-.5-.5-.5h-13C7.2239 19 7 19.2239 7 19.5v1C7 20.7761 7.2239 21 7.5 21zM7.5 25h13c.2761 0 .5-.2239.5-.5v-1c0-.2761-.2239-.5-.5-.5h-13C7.2239 23 7 23.2239 7 23.5v1C7 24.7761 7.2239 25 7.5 25z"></path></svg>
            </>
        )
    }
    return (
        <div className='bg-white'>
            <header className="relative z-10">
                <nav aria-label="Top">
                    <div className="bg-gray-900">
                        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                            <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                                Get free delivery on orders over ₹100
                            </p>

                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                <div onClick={() => navigate("/register")} className="text-sm cursor-pointer font-medium text-white hover:text-gray-100">
                                    Create an account
                                </div>
                                <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                                <div onClick={() => navigate("/login")} className="text-sm cursor-pointer font-medium text-white hover:text-gray-100">
                                    Sign in
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="border-b border-gray-200">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="hidden lg:flex lg:items-center">
                                        <div onClick={() => navigate("/")} className='cursor-pointer'>
                                            <span className="sr-only">Your Company</span>
                                            <div className='md:text-4xl text-xl text-sky-800 whisper-regular font-bold tracking-widest'>Attire</div>
                                        </div>
                                    </div>
                                    <div onClick={() => navigate("/")} className="lg:hidden cursor-pointer">
                                        <span className="sr-only">Your Company</span>
                                        <div className='text-4xl text-sky-800 font-bold whisper-regular tracking-widest'>Attire</div>
                                    </div>

                                    <div className="flex flex-1 items-center justify-end">
                                        <div className="flex items-center lg:ml-8">
                                            <div className="flow-root">
                                                <div className="group -m-2 cursor-pointer flex items-center p-2">
                                                    <OrdersIcon />
                                                    <span onClick={() => navigate("/cart")} className='flex items-center justify-center'>
                                                        <ShoppingCartIcon
                                                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartSlice.length}</span>
                                                    </span>
                                                    {userSlice.name ? (
                                                        <>
                                                            <Popover
                                                                placement="bottomRight"
                                                                content={<ProfileModal />}
                                                                trigger="click">
                                                                <button className="rounded-full mx-4 w-8 h-8 text-white uppercase bg-sky-800">{userSlice.name.charAt(0)}</button>
                                                            </Popover>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <span className="sr-only">items in cart, view bag</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <>
                {children}
            </>
            <footer aria-labelledby="footer-heading" className="bg-white">
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200">
                        <div className="pb-20 pt-16">
                            <div className="mx-auto mt-16 max-w-5xl xl:grid xl:grid-cols-2 xl:gap-8">
                                <div className="grid grid-cols-2 gap-8 xl:col-span-2">
                                    <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Products</h3>
                                            <ul role="list" className="mt-6 space-y-6">
                                                {footerNavigation.products.map((item) => (
                                                    <li key={item.name} className="text-sm">
                                                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Customer Service</h3>
                                            <ul role="list" className="mt-6 space-y-6">
                                                {footerNavigation.customerService.map((item) => (
                                                    <li key={item.name} className="text-sm">
                                                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Company</h3>
                                            <ul role="list" className="mt-6 space-y-6">
                                                {footerNavigation.company.map((item) => (
                                                    <li key={item.name} className="text-sm">
                                                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">Legal</h3>
                                            <ul role="list" className="mt-6 space-y-6">
                                                {footerNavigation.legal.map((item) => (
                                                    <li key={item.name} className="text-sm">
                                                        <a href={item.href} className="text-gray-500 hover:text-gray-600">
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-10 md:flex md:items-center md:justify-between">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-500">&copy; 2024 All Rights Reserved</p>
                        </div>

                        <div className="mt-4 flex items-center justify-center md:mt-0">
                            <div className="flex space-x-8">
                                {footerNavigation.bottomLinks.map((item) => (
                                    <a key={item.name} href={item.href} className="text-sm text-gray-500 hover:text-gray-600">
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

const ProfileModal = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        localStorage.clear();
        dispatch(
            updateUser({
                email: null,
                name: null,
            })
        )
        navigate("/login")
    };

    return (
        <div className="flex flex-col items-start justify-start gap-2 min-w-[160px]">
            <button
                className={`flex flex-wrap gap-4 justify-start items-center w-full px-2 py-1 hover:bg-zinc-100 rounded-md cursor-pointer`}
                onClick={() => handleLogout()}
            >
                <LogoutIcon className="w-4 h-4" /> <span>Log out</span>
            </button>
        </div>
    );
};

const LogoutIcon = ({ ...props }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
        </svg>
    );
};
