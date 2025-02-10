import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    })
    setFilterJobs(filteredJobs)
  }, [allAdminJobs, searchJobByText])

  // Check if companies is an array and if it's empty
  if (!Array.isArray(companies) || companies.length === 0) {
    return <span className="text-red-500 font-semibold">Companies Not Found!</span>;
  }

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <Table className="w-full">
        <TableCaption>A list of your posted Jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            <TableHead className="text-white">Company Name</TableHead>
            <TableHead className="text-white">Role</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <TableRow key={job._id} className="hover:bg-purple-100 transition-colors duration-300">
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xs font-medium">
                  {job?.createdAt.split("T")[0]}
                </span>
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300">
                    <div 
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                      className="flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-white hover:bg-opacity-50 transition-colors duration-300 rounded"
                    >
                      <Eye className="w-4 text-purple-500" />
                      <span className="text-purple-700">Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;

