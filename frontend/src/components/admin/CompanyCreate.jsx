import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { Building, ArrowLeft, ArrowRight } from 'lucide-react'

import Navbar from '../shared/Navbar'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { setSingleCompany } from '@/redux/companySlice'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to register company. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
      <Navbar />
      <motion.div 
        className="max-w-4xl mx-auto py-12 px-4  sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="text-2xl font-extrabold flex items-center">
              <Building className="mr-2" />
              Register Your Company
            </CardTitle>
            <CardDescription className="text-purple-100">
              Join our platform and showcase your company to potential candidates.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className='space-y-4'>
              <div className="space-y-2">
                <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name</label>
                <Input
                  type="text"
                  id="companyName"
                  className="w-full border-2 border-purple-300 focus:border-purple-500 rounded-lg"
                  placeholder="ElevateU, Apple, etc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className='flex items-center justify-between pt-4'>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/admin/companies")}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button 
                  onClick={registerNewCompany}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center"
                  disabled={!companyName.trim()}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default CompanyCreate

