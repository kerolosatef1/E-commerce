import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { UserContext } from "../UserContext/UserContext";

export default function Register() {
    const { setUserLogin } = useContext(UserContext);
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Min length is 3').max(10, 'Max length is 10').required('Name is required'),
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must start with a capital letter and contain a symbol and numbers').required('Password is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password and re-password do not match').required('Re-password is required'),
        phone: Yup.string().matches(/^01[0-2,5]{1}[0-9]{8}$/, 'The phone number does not match. It must start with 01 and the rest of 10 numbers').required('Phone is required')
    });

    const handleRegister = async (formsData) => {
        try {
            setLoading(true);
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formsData);
            if (response.data.message === 'success') {
                localStorage.setItem('userToken', response.data.token);
                setUserLogin(response.data.token);
                navigate('/login');
            } else {
                setApiError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error?.response?.data?.message || 'An unexpected error occurred.';
            setApiError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        validationSchema,
        onSubmit: handleRegister
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
        <div className="flex py-8 items-center justify-center px-4 sm:px-6 w-full lg:px-8">
            <div className="w-full space-y-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Register Now
                    </h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
                            <div className="mt-1">
                                <input value={formik.values.name} name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" required
                                    id="name" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>
                        {formik.errors.name && formik.touched.name && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.name}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1">
                                <input value={formik.values.email} name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" required
                                    id="email" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
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
                                <input value={formik.values.password} name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" required
                                    id="password" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>
                        {formik.errors.password && formik.touched.password && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.password}
                            </div>
                        )}

                        <div>
                            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="mt-1">
                                <input value={formik.values.rePassword} name="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" required
                                    id="rePassword" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>
                        {formik.errors.rePassword && formik.touched.rePassword && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.rePassword}
                            </div>
                        )}

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <div className="mt-1">
                                <input value={formik.values.phone} name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" required
                                    id="phone" className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                            </div>
                        </div>
                        {formik.errors.phone && formik.touched.phone && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {formik.errors.phone}
                            </div>
                        )}

                        <div>
                            <button type="submit" disabled={!(formik.isValid && formik.dirty)}
                                className="flex w-24 justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">
                                {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
