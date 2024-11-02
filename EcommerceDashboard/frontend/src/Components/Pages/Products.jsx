import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const Products = () => {
  const auth = JSON.parse(localStorage.getItem('user'));
  const userId = auth?.userId; // Check if auth exists to prevent errors
  // console.log(auth)
  console.log(userId);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5647/get_all_products/${userId}`);
        setProducts(response.data);
        // toast.success('Products fetched successfully!');
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch products.');
      }
    };

    if (userId) {
      fetchProducts(); // Only call if userId is defined
    }
  }, [userId]);

  console.log('userId : ', userId);
  console.log(products);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <ToastContainer />
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Products</h1>
            <Link to='/addproduct' className='ms-[60%] bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full me-0'>Add Products</Link>
            {products.length > 0 ? (
              <ul className="space-y-4">
                {products.map((product) => (
                  <li key={product._id} className="p-4 bg-gray-100 rounded dark:bg-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300">Price: ₹{product.price}</p>
                    <p className="text-gray-700 dark:text-gray-300">Category: {product.category}</p>
                    <p className="text-gray-700 dark:text-gray-300">Company: {product.company}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">No products available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
