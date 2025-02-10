import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch= useDispatch();
  const navigate=useNavigate();

  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse"); 
  }

  return (
    <div className='text-center min-h-screen pt-16 flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white p-8'>
      <div className='flex flex-col gap-8 w-full max-w-4xl'>
        <span className='mx-auto px-6 py-3 rounded-full bg-white text-purple-600 font-bold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300'>
          No.1 Job Hunt Website
        </span>
        <h1 className='text-5xl md:text-7xl font-extrabold leading-tight'>
          Search, Apply & <br /> 
          Get Your <span className='text-yellow-300'>Dream Jobs</span>
        </h1>
        <p className='text-xl text-yellow-100 max-w-2xl mx-auto'>
          The most Trusted Online Job Hunt Platform. Find your dream job now!
        </p>
        <div className='flex w-full max-w-2xl mx-auto shadow-lg rounded-full overflow-hidden'>
          <input 
            type="text"
            placeholder='Find your dream jobs'
            onChange={(e)=>setQuery(e.target.value)}
            className='flex-grow px-6 py-4 text-lg text-gray-800 outline-none border-none'
          />
          <Button 
            onClick={searchJobHandler} 
            className="h-15 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-lg transition-all duration-300"
          >
            <Search className='h-6 w-6 mr-2'/> Search
          </Button>
        </div>
      </div>
      <div className='mt-16'>
        <p className='text-yellow-100 text-lg'>Trusted by leading companies worldwide</p>
        <div className='flex justify-center items-center gap-8 mt-4'>
          {['Google', 'Amazon', 'Microsoft', 'Apple'].map((company) => (
            <span
              key={company}
              className='text-2xl font-bold text-white opacity-50 hover:opacity-100 transition-opacity duration-300'
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSection

