import React from 'react'
import { Link } from 'react-router-dom'
import FooterImage from '../../assets/images/Footer/footer.webp'
import { FaSquareFacebook } from "react-icons/fa6";
import { SlSocialInstagram } from "react-icons/sl";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
function Footer() {
  return (
    <div>
        <footer className='w-full p-3 md:p-5 flex flex-col md:flex-row  items-start md:items-end justify-between '>
            <div className='flex flex-col md:flex-row items-center md:items-end  gap-4'>
            <img src={FooterImage} alt="" className='w-[170px]' />
            <ul  className='md:flex grid flex-col md:flex-row items-center mb-4  gap-4'>
                <li className='text-[12px] text-regal-footer-gray font-[500]'>
                    <Link>&copy; 2024</Link>
                </li>
                <li className='text-[12px] text-regal-footer-gray font-[500]'>
                    <Link>Terms & Conditions</Link>
                </li>
                <li className='text-[12px] text-regal-footer-gray font-[500]'>
                    <Link>Privacy</Link>
                </li>
                <li className='text-[12px] text-regal-footer-gray font-[500]'>
                    <Link>Help</Link>
                </li>
            </ul>
            </div>
            <div className='flex flex-row items-center gap-4 mb-3'>
                <Link className='text-xl text-regal-footer-gray font-[500]'>
                <FaSquareFacebook />
                </Link>
                <Link className='text-xl text-regal-footer-gray font-[500]'>
                <SlSocialInstagram />
                </Link>
                <Link className='text-xl text-regal-footer-gray font-[500]'>
                <BsTwitter />
                </Link>
                <Link className='text-xl text-regal-footer-gray font-[500]'>
                <FaLinkedinIn />
                </Link>
            </div>
        </footer>
    </div>
  )
}

export default Footer