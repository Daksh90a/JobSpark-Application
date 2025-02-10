import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
  const navigate= useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='border border-gray p-2 rounded-md shadow-lg cursor-pointer'>
      <div>
        <h1 className='text-2xl font-medium'>{job?.company?.name}</h1>
        <p className='text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='text-xl'>{job?.title}</h1>
        <p className='text-gray-700'>{job?.description}</p>
      </div>
      <div>
        <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>{job?.position} Positions</Badge>
        <Badge className={'text-red-700 font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
        <Badge className={'text-purple-700 font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
