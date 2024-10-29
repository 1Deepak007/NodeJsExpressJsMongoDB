import * as Yup from 'yup';

export const signupSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

export const addProductSchema = Yup.object().shape({
    name: Yup.string()
        .required('Product name is required'),
    price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be a positive number')
        .required('Product price is required'),
    company: Yup.string()
        .required('Company name is required'),
    category: Yup.string()
        .required('Category is required'),
});