import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { signupSchema } from '../ValidationsSchemas/Validations';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: signupSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:5647/register', values);
                if (response) {
                    toast.success("Signup Successfull");
                    setTimeout(() => {
                        navigate("/products");
                    }, 2000);
                } else {
                    toast.success('Error registered user..!');
                }
            } catch (error) {
                toast.error('Error registering user: ' + error.response.data.error);
            }
        },
    });

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <ToastContainer />
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign Up</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="name" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-red-600">{formik.errors.name}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-red-600">{formik.errors.email}</div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-red-600">{formik.errors.password}</div>
                                )}
                            </div>
                            <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5">
                                Sign Up
                            </button>
                        </form>
                        <h4 className="text-center text-gray-900 dark:text-white">Already have an account ? <Link to={'/login'} className='text-blue-400'> Login</Link> </h4>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;