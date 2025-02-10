import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/")
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Navbar />
      <div className='flex items-center justify-center max-w-7xl mx-auto py-24'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md'
        >
          <form onSubmit={submitHandler} className='bg-white shadow-2xl rounded-lg p-8 space-y-6'>
            <h1 className='font-extrabold text-3xl mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>Welcome Back!</h1>

            <div className='space-y-2'>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className='w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200'
                type="email"
                value={input.email}
                name='email'
                onChange={changeEventHandler}
                placeholder='youremail@example.com'
              />
            </div>

            <div className='space-y-2'>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                className='w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-200'
                type="password"
                value={input.password}
                name='password'
                onChange={changeEventHandler}
                placeholder='Your secure password'
              />
            </div>

            <div className='flex items-center justify-center space-x-6'>
              <label className="inline-flex items-center">
                <input type="radio" name='role' value="student" className='form-radio text-purple-600' checked={input.role === 'student'} onChange={changeEventHandler} />
                <span className="ml-2">Student</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name='role' value="recruiter" className='form-radio text-pink-600' checked={input.role === 'recruiter'} onChange={changeEventHandler} />
                <span className="ml-2">Recruiter</span>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-md transition duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Please Wait
                </>
              ) : 'Login'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className='font-medium text-purple-600 hover:text-purple-500 transition duration-200'>
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login

