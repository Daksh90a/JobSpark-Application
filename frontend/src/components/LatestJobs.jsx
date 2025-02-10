import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)
    const navigate = useNavigate()

    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            <motion.h1 
                className='text-4xl md:text-5xl font-extrabold text-center mb-12'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>Latest & Top</span>{' '}
                <span className='text-yellow-400'>Job Openings</span>
            </motion.h1>
            
            {allJobs.length <= 0 ? (
                <motion.div 
                    className='text-center text-2xl text-gray-600'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    No Jobs available
                </motion.div>
            ) : (
                <motion.div 
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {allJobs?.slice(0, 6).map((job, index) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <LatestJobCards job={job} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
            
            <motion.div 
                className='text-center mt-12'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <button 
                    onClick={() => navigate('/browse')}
                    className='px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300'
                >
                    View All Jobs
                </button>
            </motion.div>
        </div>
    )
}

export default LatestJobs

