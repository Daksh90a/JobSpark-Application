import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Calendar } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    })
    setFilterCompany(filteredCompany)
  }, [companies, searchCompanyByText])

  // Check if companies is an array and if it's empty
  if (!Array.isArray(companies) || companies.length === 0) {
    return <span className="text-red-500 font-semibold">Companies Not Found!</span>;
  }

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      <Table className="w-full">
        <TableCaption>A list of your recently registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
            <TableHead className="text-white">Logo</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.map((company) => (
            <TableRow key={company._id} className="hover:bg-purple-100 transition-colors duration-300">
              <TableCell>
                <Avatar className="h-10 w-10 border-2 border-purple-300">
                  <AvatarImage
                    src={company.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                    alt={`${company.name} logo`}
                  />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{company.name}</TableCell>
              <TableCell>
                <span className="w-2/5 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white text-s font-medium">
                  <Calendar className="w-3 h-3" />
                  {company.createdAt.split("T")[0]}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <button className="p-2 hover:bg-purple-200 rounded-full transition-colors duration-300">
                      <MoreHorizontal className="w-5 h-5 text-purple-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300">
                    <div 
                      onClick={() => navigate(`/admin/companies/${company._id}`)} 
                      className="flex items-center w-full gap-2 cursor-pointer p-2 hover:bg-white hover:bg-opacity-50 transition-colors duration-300 rounded"
                    >
                      <Edit2 className="w-4 text-purple-500" />
                      <span className="text-purple-700">Edit</span>
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

export default CompaniesTable;

