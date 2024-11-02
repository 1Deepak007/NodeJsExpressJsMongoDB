import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { loginSchema } from '../ValidationsSchemas/Validations';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email:
                '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:5647/login', values);
                const { userId, userEmail, token } = response.data;

                if (userId && userEmail && token) {
                    localStorage.setItem('user', JSON.stringify({ userId, userEmail, token }));
                    navigate('/products'); // Navigate only if user data is complete
                    // reload screen
                    window.location.reload();
                } else {
                    throw new Error('Invalid credentials or incomplete user data');
                }
            } catch (error) {
                console.error('Login error:', error);
                toast.warning(error.message); // Use error message from catch block
            } finally {
                setIsLoading(false);
            }
        },
    });
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <ToastContainer />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login</h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                            {/* Email Field */}
                            <label htmlFor="email" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" required />
                            {formik.touched.email && formik.errors.email && <div className="text-red-600">{formik.errors.email}</div>}

                            {/* Password Field */}
                            <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input id="password" name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" required />
                            {formik.touched.password && formik.errors.password && <div className="text-red-600">{formik.errors.password}</div>}

                            <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5">
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <p className="text-center text-gray-900 dark:text-white">Don't have an account? <Link to="/" className="text-blue-400">Signup</Link></p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;



