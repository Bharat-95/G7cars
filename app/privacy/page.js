import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Link from 'next/link'

const page = () => {
  return (
    <div className=''>
      <Header />
      <div className='lg:text-3xl md:text-2xl md:p-10 text-xl p-4 underline text-white flex justify-center lg:p-10 '>Privacy Policy</div>
      <div className='lg:m-20 md:m-10 m-10 text-white lg:space-y-10 md:space-y-10 space-y-4'>
        <div className=''>
        This privacy policy outlines how <Link href='/'>G7cars Private Limited.</Link> collects, uses, and protects the personal information of its customers and website visitors.
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>1. Information We Collect</div>
          <div className='space-y-2'>
             <div>We may collect personal information, including but not limited to:</div>
           
            <li>Name</li>
            <li>Contact information (email address, phone number)</li>
            <li>Driver's license details</li>
            <li>Payment information (credit card/debit card details)</li>
            <li>Vehicle preferences and rental history</li>
            <div>We collect this information when you:</div>
            <li>Make a car rental reservation</li>
            <li>Contact customer support</li>
            <li>Visit our website and interact with our online services</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>2. Use of Information</div>
          <div className='space-y-2'>
            <div>We use the collected information for the following purposes:</div>
            <li>Provide customer support and assistance</li>
            <li>Communicate with you regarding your bookings, updates, and promotions</li>
            <li>Improve our products and services</li>
            <li>Ensure compliance with legal requirements and regulations</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>3. Data Security</div>
          <div className='space-y-2'>
            <li>We are committed to ensuring the security of your personal information.</li>
            <li>We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, disclosure, alteration, or destruction.</li>
            <li>We restrict access to your personal information to authorized personnel only, who are required to maintain its confidentiality.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>4. Sharing of Information</div>
          <div className='space-y-2'>
            <div>We may share your personal information with:</div>
            <li>Third-party service providers who assist us in fulfilling car rental bookings, processing payments, and providing customer support.</li>
            <li>Legal authorities or regulatory bodies when required to comply with legal obligations or respond to legal requests.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>5. Cookies and Tracking Technologies</div>
          <div className='space-y-2'>
            <li>We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic.</li>
            <li>You may choose to disable cookies in your browser settings, but please note that this may affect the functionality of our website.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>6.Your Rights</div>
          <div className='space-y-2'>
            <div>You have the right to:</div>
            <li>Access and review your personal information held by us</li>
            <li>Update or correct any inaccuracies in your personal information</li>
            <li>Request the deletion of your personal information from our records</li>
            <div>To exercise these rights or for any inquiries regarding your personal information, please contact us using the information provided below.</div>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>7. Updates to Privacy Policy</div>
          <div className='space-y-2'>
            <li>We reserve the right to amend or update this refund policy at any time without prior notice.</li>
            <li>Any changes to the privacy policy will be posted on our website with the effective date of the revision.</li>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>Contact Informationy</div>
          <div className='space-y-2'>
            <div>If you have any questions or concerns regarding our refund policy, please contact us at 9133300025/9133300026 or email us on support@g7cars.com</div>
            
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default page