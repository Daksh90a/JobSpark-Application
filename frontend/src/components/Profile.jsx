"use client"

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Mail, Phone, Pen, Briefcase } from 'lucide-react'

import Navbar from './shared/Navbar'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth)

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-400">
            <Navbar />
            <div className='max-w-4xl mx-auto pt-20 px-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="mb-8 overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            <div className='flex justify-between items-center'>
                                <div className='flex items-center gap-4'>
                                    <Avatar className="h-24 w-24 border-4 border-white">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        <AvatarFallback>{user?.fullname?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className='text-2xl font-bold'>{user?.fullname}</CardTitle>
                                        <p className="text-purple-100">{user?.profile?.bio}</p>
                                    </div>
                                </div>
                                <Button onClick={() => setOpen(true)} variant="secondary" size="icon">
                                    <Pen className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-4">
                            <div className='grid gap-4'>
                                <div className='flex items-center gap-3'>
                                    <Mail className="text-purple-500" />
                                    <span>{user?.email}</span>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <Phone className="text-purple-500" />
                                    <span>{user?.phoneNumber}</span>
                                </div>
                                <div>
                                    <h2 className='text-lg font-bold mb-2 text-purple-700'>Skills</h2>
                                    <div className='flex flex-wrap gap-2'>
                                        {user?.profile?.skills.length !== 0 
                                            ? user?.profile?.skills.map((item, index) => 
                                                <Badge key={index} variant="secondary">{item}</Badge>
                                              ) 
                                            : <span className="text-gray-500">No skills listed</span>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <h2 className='text-lg font-bold mb-2 text-purple-700'>Resume</h2>
                                    {user?.profile?.resume 
                                        ? <a 
                                            href={user.profile.resume} 
                                            target='_blank' 
                                            rel="noopener noreferrer" 
                                            className='text-blue-500 hover:underline'
                                          >
                                            {user.profile.resumeOriginalName}
                                          </a> 
                                        : <span className="text-gray-500">No resume uploaded</span>
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-purple-500" />
                                Applied Jobs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AppliedJobTable />
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

