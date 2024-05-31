import React from 'react'
import Logo from '../public/1.png'
import Image from 'next/image'
import { TiSocialFacebook } from "react-icons/ti";
import { FaInstagram } from "react-icons/fa";
import Link from 'next/link';
import { FaThreads } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";


const Footer = () => {
  return (
    <div className='p-10 lg:flex md:flex lg:h-80 lg:justify-evenly bg-black w-screen'>
        <div className='lg:space-y-10 md:space-y-10 space-y-2 lg:block md:block hidden '>
            <Image
            src={Logo}
            alt="No Logo Found"
            className=' w-40' />
            <div className='text-white w-64'>G7Cars is a self drivebrand owned by G7cars private limited</div>
            <div className='flex gap-4'>
                <Link href='https://www.facebook.com/profile.php?id=61557881893993&mibextid=ZbWKwL' target='_blank'><TiSocialFacebook className='text-white border rounded-full p-1 hover:bg-rose-900' size={40}/></Link>
            <Link href='https://www.instagram.com/g7cars_selfdrivecarsrental/' target='_blank'><FaInstagram className='text-white border rounded-full p-2 hover:bg-rose-900' size={40}/></Link>
            <Link href='https://www.threads.net/@g7cars_selfdrivecars' target='_blank'><FaThreads className='text-white border rounded-full p-2 hover:bg-rose-900' size={40}/></Link>
            </div>
            

        </div>
        <div className='w-[1px] h-64 bg-rose-900 lg:block md:block hidden  '></div>
        <div className='space-y-6 w-64 text-white lg:flex lg:flex-col md:flex md:flex-col hidden ml-10  '>
            <div className=' font-bold text-sm'>About</div>
           <ul className='space-y-3 text-sm'>

            <li className='hover:text-rose-900'><Link href='/'>Deals</Link></li>
            <li className='hover:text-rose-900'><Link href='/'>Contact</Link></li>
            <li className='hover:text-rose-900'><Link href='/'>FAQs</Link></li>
         
            </ul>
        
        </div>

        <div className='w-[1px] h-64 bg-rose-900 lg:block md:block hidden'></div>
        <div className='space-y-6 w-64 text-white lg:flex lg:flex-col ml-10'>
            <div className=' font-bold text-sm'>Helpfull Links</div>
           <ul className='space-y-3 text-sm'>

            <li className='hover:text-rose-900'><Link href='/'>Home</Link></li>
            <li className='hover:text-rose-900'><Link href='/about'>About</Link></li>
            <li className='hover:text-rose-900'><Link href='/terms'>Terms & Conditions</Link></li>
            <li className='hover:text-rose-900'><Link href='/privacy'>Privacy Policy</Link></li>
            <li className='hover:text-rose-900'><Link href='/refund'>Refund Policy</Link></li>
            </ul>
        
        </div>

        <div className='w-[1px] h-64 bg-rose-900 lg:block md:block hidden'></div>

        <div className='space-y-6 w-64 text-white lg:ml-10 md:ml-10 ml-20 lg:block md:block hidden'>
            <div className=' font-bold text-sm'>Reach Us</div>
           <ul className='space-y-5 text-sm cursor-pointer'>

            <li className='hover:text-rose-900 flex gap-4'><FaLocationDot size={40}/>	Near Netaji Nagar Cross Road, Opp Bharath petrol bunk, Nagaram, ECIL, Secunderabad, Telangana</li>
            <li className='hover:text-rose-900 flex gap-4'><MdEmail size={20}/>support@g7cars.com</li>
            <li className='hover:text-rose-900 flex gap-4'><FaPhoneAlt size={20} />	9133300025 <br/>
             9133300026</li>
           
            </ul>
        
        </div>
       
    </div>
  )
}

export default Footer