import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(false);
  const handleLogout = () =>{
    console.log('Logging out...');
  }
  return (
    <div className='w-full px-2 py-6 flex justify-evenly items-center absolute top-0 bg-slate-50 shadow-md'> 
    <Link to="/" className='cursor-pointer font-extrabold text-4xl '>Hirely</Link>
    {!currentUser ? (
      <Link to="/signin" className='text-xl text-primary-700 hover:bg-primary-100 bg-primary-50 font-medium px-4 py-2 rounded-md  transition-colors duration-200 ease-in-out'>Login</Link>
    ) : (
      <button onClick={handleLogout} className='text-xl text-primary-700 hover:bg-primary-100 bg-primary-50 font-medium px-4 py-2 rounded-md  transition-colors duration-200 ease-in-out'>Logout</button>
    )}
  </div>
  );
};

export default Navbar;
