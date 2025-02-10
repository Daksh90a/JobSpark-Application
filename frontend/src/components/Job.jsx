import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='p-6 rounded-lg shadow-xl bg-white border border-purple-100 hover:border-purple-300 transition-all duration-300'
    >
      <div className='flex items-center justify-between mb-4'>
        <p className='text-sm text-gray-500 bg-purple-100 px-3 py-1 rounded-full'>
          {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full hover:bg-purple-100 transition-colors duration-300" size="icon">
          <Bookmark className="h-4 w-4 text-purple-600" />
        </Button>
      </div>

      <div className='flex items-center gap-4 mb-4'>
        <Avatar className="h-16 w-16 border-2 border-purple-200">
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
        </Avatar>
        <div>
          <h1 className='text-xl font-bold text-gray-800'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-600 flex items-center'>
            <MapPin className="h-4 w-4 mr-1 text-purple-500" /> India
          </p>
        </div>
      </div>

      <div className='mb-4'>
        <h1 className='font-bold mb-2 text-xl text-gray-800'>{job?.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
      </div>

      <div className='flex flex-wrap items-center gap-2 mb-4'>
        <Badge className='bg-blue-100 text-blue-700 hover:bg-blue-200'>{job?.position} Positions</Badge>
        <Badge className='bg-red-100 text-red-700 hover:bg-red-200'>{job?.jobType}</Badge>
        <Badge className='bg-purple-100 text-purple-700 hover:bg-purple-200'>{job?.salary} LPA</Badge>
      </div>

      <div className='flex items-center gap-4'>
        <Button 
          onClick={() => navigate(`/description/${job?._id}`)} 
          variant="outline"
          className="flex-1 hover:bg-purple-100 transition-colors duration-300"
        >
          Details
        </Button>
        <Button 
          variant="default" 
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300"
        >
          Save for later
        </Button>
      </div>
    </motion.div>
  )
}

export default Job

