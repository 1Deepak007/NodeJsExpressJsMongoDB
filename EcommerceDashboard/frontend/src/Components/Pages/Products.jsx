import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import EditProductModal from '../SubComponents/EditProductModel';

const Products = () => {
  // const [auth, setauth] = useState('');
  // const [userId, setuserId] = useState('');
  // const [token, settoken] = useState('');

  // useEffect(() => {
  //   setauth(JSON.parse(localStorage.getItem('user')))
  //   setuserId(auth?.userId);
  //   settoken(auth?.token);
  // },[]);

  const auth = JSON.parse(localStorage.getItem('user'));
  const userId = auth?.userId;
  const token = auth?.token;

  console.log(auth);
  console.log(userId);
  console.log(token);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5647/get_all_products/${userId}`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch products.');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProducts();
    }
  }, [userId]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDeleteClick = async (product) => {
    await axios.delete(`http://localhost:5647/delete_product/${product._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    fetchProducts(); // Refresh the products after deletion
  }

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts(products.map((prod) => (prod._id === updatedProduct._id ? updatedProduct : prod)));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <ToastContainer />
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl mb-5 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Products
            </h1>
            <Link to='/addproduct' className='ms-[60%] bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full me-0'>Add Products</Link>
            {products.length > 0 ? (
              <ul className="space-y-4">
                {products.map((product) => (
                  <li key={product._id} className="p-4 bg-gray-100 rounded dark:bg-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300">Price: ₹{product.price}</p>
                    <p className="text-gray-700 dark:text-gray-300">Category: {product.category}</p>
                    <p className="text-gray-700 dark:text-gray-300">Company: {product.company}</p>
                    <button
                      onClick={() => handleEditClick(product)}
                      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="ms-4 mt-2 px-4 py-2 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 dark:text-gray-300">No products available.</p>
            )}
          </div>
        </div>
      </div>

      <EditProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpdate={handleProductUpdate}
      />
    </section>
  );
};

export default Products;
