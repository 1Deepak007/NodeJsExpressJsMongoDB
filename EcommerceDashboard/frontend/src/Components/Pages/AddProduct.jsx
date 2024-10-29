import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from 'formik'
import { addProductSchema } from '../ValidationsSchemas/Validations';





const AddProduct = () => {

  const auth = JSON.parse(localStorage.getItem('user'));

  const userId = auth._id;

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      company: '',
      userId: userId
    },
    validationSchema: addProductSchema,
    onSubmit: 
      async (values) => {
        console.log("Values : ",values)
        try {
          const response = await axios.post('http://localhost:5647/add_product', values);
          console.log(response.data);
          toast.success('Product added successfully!');
        } catch (error) {
          console.error(error);
          toast.error('Failed to add product');
        }
      }
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <ToastContainer />
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Add product</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="MacBook Air" required
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-600">{formik.errors.name}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product price</label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="100000" required
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-600">{formik.errors.price}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.company}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Apple" required
                />
                {formik.touched.company && formik.errors.company ? (
                  <div className="text-red-600">{formik.errors.company}</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" placeholder="Laptop" required 
                />
                {formik.touched.category && formik.errors.category ? (
                  <div className="text-red-600">{formik.errors.category}</div>
                ) : null}
              </div>
              <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5">Add product</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AddProduct