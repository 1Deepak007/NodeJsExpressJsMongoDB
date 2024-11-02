import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    const isLoggedIn = localStorage.getItem('user');

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    {/* ... */}
                </Link>
                {isLoggedIn && (
                    <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
                        <li>
                            <button onClick={logout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;











// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem('user');
//     // reload screen
//     window.location.reload();
//     navigate('/login');
//   };

//   const isLoggedIn = localStorage.getItem('user'); // Check if user is logged in

//   return (
//     <nav className="bg-white border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           {/* ... */}
//         </Link>
//         {isLoggedIn && ( // Show logout button only if logged in
//           <ul className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 dark:border-gray-700">
//             <li>
//               <button onClick={logout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
//                 Logout
//               </button>
//             </li>
//           </ul>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
