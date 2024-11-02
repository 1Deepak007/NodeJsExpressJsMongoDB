import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import Products from './Components/Pages/Products';
import AddProduct from './Components/Pages/AddProduct';
import Navbar from './Components/SubComponents/Navbar';
import { useEffect, useState } from 'react';


function App() {
    const[auth, setAuth] = useState();
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('user'));
        setAuth(data);
    },[Route]);

    return (
        <div className="App">
            {auth ? <Navbar /> : null} {/* Show Navbar only if authenticated */}
            <Routes>
                <Route path='/' element={auth ? <Navigate to="/products" /> : <Signup />} />
                <Route path='/login' element={auth ? <Navigate to="/products" /> : <Login />} />
                <Route path='/products' element={auth ? <Products /> : <Navigate to="/login" />} />
                <Route path='/addproduct' element={auth ? <AddProduct /> : <Navigate to="/login" />} />
                <Route path='*' element={<h2>Page not found.</h2>} />
            </Routes>
        </div>
    );
}

export default App;
