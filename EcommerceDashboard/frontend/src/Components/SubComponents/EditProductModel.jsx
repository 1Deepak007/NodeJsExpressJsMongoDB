import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProductModal = ({ product, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    company: '',
    userId: ''
  });

  const auth = JSON.parse(localStorage.getItem('user'));
  const userId = auth?.userId;
  const token = auth?.token;

  useEffect(() => {
    if (product) {
      setFormData({
        "name": product.name,
        "price": product.price,
        "category": product.category,
        "company": product.company,
        "userId": userId || ''  // Assign userId from localStorage
      });
    }
  }, [product, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!product || !product._id) {
      console.error('Product ID is missing');
      return;
    }
  
    try {
      const url = `http://localhost:5647/update_product/${product._id}`;
  
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token here
        },
      });
  
      onUpdate(response.data.product);
      toast.success('Product updated successfully!');
      onClose();
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      toast.error('Failed to update product.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded"/>
          </label>
          <label className="block mb-2">
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full p-2 border rounded"/>
          </label>
          <label className="block mb-2">
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded"/>
          </label>
          <label className="block mb-4">
            Company:
            <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full p-2 border rounded"/>
          </label>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded"> Cancel </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded"> Update </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
