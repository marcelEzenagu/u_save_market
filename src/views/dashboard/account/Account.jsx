import React from 'react'
import { countries } from '../../../data/mockData';
import { BiEditAlt } from "react-icons/bi";
function Account() {
  const user = {
    name: "Mike Aba",
    email: "mikeaba@gmail.com",
    profilePicture: "https://via.placeholder.com/150",
  };
  return (

      <div className='p-4'>
       <h6 className='text-regal-black text-sm md:text-xl font-bold'>Account</h6>

        <div className="rounded-md border p-5 mt-4">
          <div className='flex flex-row items-center justify-between'>
          <div className=" flex flex-row  items-center space-x-4">
        <div className="w-11 h-11 flex flex-col items-center justify-center rounded-full border border-regal-sky-blue">
            <img
              className="w-10 h-10 rounded-full"
              src={user.profilePicture}
              alt="User Profile"
            />
          </div>
          <div>
            <p className="text-sm text-start text-regal-black font-[700]  w-[150px] truncate whitespace-nowrap capitalize">
              {user.name}
            </p>
            <p className="text-xs text-regal-light-gray text-start">{user.email}</p>
          </div>
          </div>
          <button className='flex items-center py-1 px-4 gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs md:text-sm font-[500]'>
            Edit
            <BiEditAlt />
          </button>
          </div>  
        </div>
        <div className="rounded-md border p-5 mt-4">
          <div className='flex flex-row items-center justify-between'>
          <div className=" flex flex-row  items-center space-x-4">
          <div>
            <p className="text-sm text-start text-regal-black font-[700]  w-[150px] truncate whitespace-nowrap capitalize">
              Personal info
            </p>
        
          </div>
          </div>
          <button className='flex items-center py-1 px-4 gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs md:text-sm font-[500]'>
            Edit
            <BiEditAlt />
          </button>
          </div>  
          <div className='max-w-[400px]'>
            <div className='grid grid-cols-2 w-full'>
              <div className='mt-5'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>First name</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                Mike
                </p>
              </div>
              <div className='mt-5'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>Last Name</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
               Aba
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>Email Address</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                mikeaba@gmail.com
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs  md:text-sm text-regal-light-gray font-[500]'>Phone</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500] flex items-center'>
                <img src={countries[0]?.flag} alt="" className='w-6 rounded-sm mr-1' /> {countries[0]?.number} 8037048205
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-md border p-5 mt-4">
          <div className='flex flex-row items-center justify-between'>
          <div className=" flex flex-row  items-center space-x-4">
          <div>
            <p className="text-sm text-start text-regal-black font-[700]  w-[150px] truncate whitespace-nowrap capitalize">
              Address
            </p>
        
          </div>
          </div>
          <button className='flex items-center py-1 px-4 gap-1 rounded-md border border-regal-sky-blue text-regal-sky-blue text-xs md:text-sm font-[500]'>
            Edit
            <BiEditAlt />
          </button>
          </div>  
          <div className='max-w-[400px]'>
            <div className='grid grid-cols-2 w-full'>
              <div className='mt-5'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>Country</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                Nigeria
                </p>
              </div>
              <div className='mt-5'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>State</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                Adamawa
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>City</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500]'>
                Nguel
                </p>
              </div>
              <div className='mt-7 mb-4'>
                <h6 className='text-xs md:text-sm text-regal-light-gray font-[500]'>ZIP Code</h6>
                <p className='text-xs md:text-sm text-regal-black mt-2 font-[500] flex items-center'>
                905794
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

  )
}

export default Account