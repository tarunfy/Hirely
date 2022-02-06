import React from 'react';
import Hero from '../assets/hero.svg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='w-full flex justify-around bg-slate-50 items-center h-screen'>
      <div>
      <h1 className='text-7xl font-extrabold mb-6'>The best platform <br /> to get hired by the <br /> <span className='from-purple-400 bg-gradient-to-r  bg-clip-text text-transparent to-secondary-700'>upcoming startups.</span></h1>
      <Link to="/signup" className='text-white hover:shadow-lg transition-shadow duration-200 ease-in-out shadow-primary-400 font-bold text-xl bg-primary-700 px-4 py-2 rounded-md'>Start Hiring</Link>
      </div>
      <img src={Hero} alt="Hero" className='w-128 h-128' />
      
    </div>
  );
};

export default Home;
