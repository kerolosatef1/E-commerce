import React, { useContext, useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { UserContext } from "../UserContext/UserContext";

export default function Login() {
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);

    const { setUserLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least one capital letter, one symbol, and one number').required('Password is required'),
    });

    const handleLogin = (formsData) => {
        console.log(formsData);
        setLoading(true);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formsData)
            .then((response) => {
                console.log(response.data.message);
                if (response.data.message === 'success') {
                    localStorage.setItem('userToken', response.data.token);
                    setUserLogin(response.data.token);
                    setLoading(false);
                    navigate('/home'); // Change to the page you want to navigate to after login
                }
            })
            .catch((error) => {
                setLoading(false);
                console.log(error?.response?.data?.message);
                setApiError(error?.response?.data?.message || 'An error occurred');
            });
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: handleLogin,
    });

    useEffect(() => {
        if (apiError) {
            Swal.fire({
                title: 'Error!',
                text: apiError,
                icon: 'error',
                confirmButtonText: 'OK'
            });
            setApiError("");
        }
    }, [apiError]);

    return (
        <div className="flex py-3 items-center justify-center px-4 sm:px-6 w-full lg:px-8">
            <div className="w-full space-y-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Login
                    </h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    id="email"
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {formik.errors.email && formik.touched.email && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.email}
                            </div>
                        )}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="mt-1">
                                <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    id="password"
                                    className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.password}
                            </div>
                        )}
                        <div className="flex items-center">
                            <button type="submit" className="flex md:w-24 justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}
                            </button>
                            <p className="pl-3">
                                Don't have an account yet? <span className="text-green-600"><NavLink to='/Register'>Register Now</NavLink></span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
