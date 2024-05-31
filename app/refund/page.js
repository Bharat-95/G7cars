import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Link from 'next/link'

const page = () => {
  return (
    <div className=''>
      <Header />
      <div className='lg:text-3xl md:text-2xl md:p-10 text-xl p-4 underline text-white flex justify-center lg:p-10 '>Refund Policy</div>
      <div className='lg:m-20 md:m-10 m-10 text-white lg:space-y-10 md:space-y-10 space-y-4'>
        <div className=''>
        This refund policy outlines the terms and conditions regarding cancellations and refunds for car rental services provided by <Link href='/'>G7cars Private Limited.</Link>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>1. Cancellation Eligibility</div>
          <div className='space-y-2'>
            <li>Cancellations made at least 6 hours prior to the scheduled delivery time are eligible for a refund.</li>
            <li>Cancellations made less than 6 hours before the scheduled delivery time may not be eligible for refunds.</li>
            <li>No-shows or early returns may not be eligible for refunds.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>2. Refund Process</div>
          <div className='space-y-2'>
            <li>Refunds for eligible cancellations will be processed within 7 business days from the date of cancellation.</li>
            <li>Refunds will be issued to the original payment method used for the booking.</li>
            <li>It may take additional time for the refunded amount to reflect in the renter's account, depending on the policies of the payment provider.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>3. Refund Amount</div>
          <div className='space-y-2'>
            <li>The refund amount is subject to deduction of any applicable cancellation fees or charges.</li>
            <li>Refunds may be subject to deductions for any additional charges incurred during the rental period, such as fuel surcharges, tolls, or damages.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>4. Damage Charges</div>
          <div className='space-y-2'>
            <li>In the event of damage to the rented vehicle, the refund amount may be adjusted based on the repair costs.</li>
            <li>If the damage amount is less than or equal to 1 lakh, the renter of the car should pay all the charges, and no refund will be issued.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>5. Requesting a Refund</div>
          <div className='space-y-2'>
            <li>To request a refund, renters must contact our customer support team via email/phone number and provide the booking details.</li>
            <li>All refund requests will be reviewed and processed in accordance with our refund policy.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>6.Exceptions</div>
          <div className='space-y-2'>
            <li>Refund requests outside of the specified cancellation period may be considered on a case-by-case basis.</li>
            <li>Refunds for extenuating circumstances, such as emergencies or unforeseen events, may be granted at the discretion of <Link href='/'>G7cars Private Limited</Link>.</li>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>7. Amendments to the Refund Policy</div>
          <div className='space-y-2'>
            <li>We reserve the right to amend or update this refund policy at any time without prior notice.</li>
            <li>It is the responsibility of the renter to review and understand the latest refund policy before using our services.</li>
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