import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import Navbar from '../shared/Navbar'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Search, Briefcase } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Navbar />
      <motion.div 
        className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500">
            <CardTitle className="text-2xl font-extrabold text-white flex items-center">
              <Briefcase className="mr-2" />
              Jobs Management
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
              <div className="relative w-full sm:w-64">
                <Input
                  className="pl-10 pr-4 py-2 w-full border-2 border-purple-300 focus:border-purple-500 rounded-lg"
                  placeholder="Filter by name"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
              </div>
              <Button 
                onClick={() => navigate("/admin/jobs/create")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
              >
                <PlusCircle className="mr-2" size={20} />
                Post New Job
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AdminJobsTable />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AdminJobs

