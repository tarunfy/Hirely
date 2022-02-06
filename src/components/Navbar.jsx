import React from 'react';

const Navbar = () => {
  return (
    <div className='w-full px-2 py-6 flex justify-evenly items-center absolute top-0 bg-slate-100 shadow-md'> 
    <p className='cursor-pointer font-extrabold text-3xl'>Hirely</p>
    <div className='space-x-5'>
        <button>Sign In</button>
        <button>Sign Up</button>
    </div>
  </div>
  );
};

export default Navbar;
