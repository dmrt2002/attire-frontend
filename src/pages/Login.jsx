import Layout from "../components/Layout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/user/userSlice";
import { useNavigate } from "react-router";
import { loginUser } from "../helpers/api";

export default function Login() {
    let [errMsg, setErrMsg] = useState(null)
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const onLogin = async () => {
        if (!email || !password) {
            setErrMsg("Please provide email and password")
        }
        let body = {
            email: email,
            password: password
        }
        try {
            let res = await loginUser(body)
            if (res && res.data && res.data.member) {
                console.log(res.data.member, "response")
                dispatch(
                    updateUser({
                        email: res.data.member.email,
                        name: res.data.member.name,
                        id: res.data.member.id
                    })
                );
    
                navigate("/")
            }
            else {
                setErrMsg("Invalid credentials")
            }
        }
        catch {
            setErrMsg("Invalid credentials")
        }
    }
    return (
        <>
            <Layout>
                <div className="flex min-h-[80vh] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block pl-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={() => onLogin()}
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>

                        {errMsg && (
                            <>
                                <div className="bg-red-50 p-4 mt-4 rounded-md border-[1px] border-red-200">
                                    <p
                                        className="text-sm text-center text-red-400"
                                        style={{ fontSize: "0.75rem" }}
                                    >
                                        {errMsg}
                                    </p>
                                </div>
                            </>
                        )}

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a onClick={() => navigate("/register")} className="font-semibold cursor-pointer leading-6 text-indigo-600 hover:text-indigo-500">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </Layout>
        </>
    )
}
