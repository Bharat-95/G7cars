import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const page = () => {
  return (
    <div className=''>
      <Header />
      <div className='lg:text-3xl md:text-2xl md:p-10 text-xl p-4 underline text-white flex justify-center lg:p-10 '>Terms and conditions</div>
      <div className='lg:m-20 md:m-10 m-10 text-white lg:space-y-10 md:space-y-10 space-y-4'>
        <div className=''>
        Please read these terms and conditions carefully before using our car rental services. By accessing or using our services, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms and conditions, you may not use our services.
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>1. Rental Agreement</div>
          <div className='space-y-2'>
            <li>By renting a car from us, you enter into a rental agreement governed by the terms outlined herein.</li>
            <li>The rental agreement includes details such as the rental period, rental rates, insurance coverage, and any additional charges or fees.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>2. Booking and Reservation</div>
          <div className='space-y-2'>
            <li>All car bookings are subject to availability and confirmation.</li>
            <li>A valid ID and payment method are required to make a reservation.</li>
            <li>We reserve the right to cancel or modify bookings based on availability and operational requirements.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>3. Rental Policies</div>
          <div className='space-y-2'>
            <li>The minimum age for renting a car is above 21.</li>
            <li>Renters must possess a valid driver's license and adhere to local driving regulations.</li>
            <li>Smoking and drinking are prohibited inside the rented vehicles.</li>
            <li>Renters are responsible for returning the vehicle in the same condition as received, subject to reasonable wear and tear.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>4. Payment</div>
          <div className='space-y-2'>
            <li>Payment for car rentals can be made online through our secure payment gateway.</li>
            <li>We accept major credit cards, debit cards, and other approved payment methods.</li>
            <li>Payment is required at the time of booking to confirm the reservation.</li>
            <li>Additional charges, such as fuel surcharges, tolls, or damages, may apply and will be billed accordingly.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>5. Cancellation and Refunds</div>
          <div className='space-y-2'>
            <li>Cancellations made at least 6 hours prior to the scheduled delivery time are eligible for a refund.</li>
            <li>Refunds for cancellations are processed according to our refund policy.</li>
            <li>No-shows or early returns may not be eligible for refunds</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>6. Liability and Insurance</div>
          <div className='space-y-2'>
            <li>Renters are responsible for any damages or losses incurred during the rental period.</li>
            <li>In the event of damage to the rented vehicle, the renter is liable for the repair costs.</li>
            <li>If the damage amount is less than or equal to 1 lakh, the renter of the car should pay all the charges.</li>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>7. Vehicle Usage</div>
          <div className='space-y-2'>
            <li>Renters must use the rented vehicle in accordance with local laws and regulations.</li>
            <li>Any unauthorized use of the vehicle, including illegal activities or off-road driving, is strictly prohibited.</li>
            <li>Renters are liable for any fines, penalties, or legal consequences arising from improper vehicle usage.</li>
          </div>
        </div>
        
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>8. Indemnification</div>
          <div className='space-y-2'>
            <li>By renting a vehicle from us, renters agree to indemnify and hold harmless G7cars Private Limited and its affiliates from any liabilities, claims, damages, or expenses incurred during the rental period.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>9.Governing Law and Jurisdiction</div>
          <div className='space-y-2'>
            <li>These terms and conditions are governed by the laws of the State of Telangana, India.</li>
            <li>Any disputes arising from these terms shall be resolved exclusively in the courts of Hyderabad, Telangana, India.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>10. Amendments</div>
          <div className='space-y-2'>
            <li>We reserve the right to amend or update these terms and conditions at any time without prior notice.</li>
            <li>It is the responsibility of the renter to review and understand the latest terms and conditions before using our services.</li>
          </div>
        </div>
        <div className='space-y-4'>
          <div className='lg:text-2xl md:text-2xl text-md font-bold '>11. Insurance Process and Cooperation</div>
          <div className='space-y-2'>
            <li>In case of car damage, I, as the renter, agree to take responsibility for initiating the insurance process.</li>
            <li>I commit to cooperating with the authorities, including visiting the police station and showroom or any other required location, at any time until the insurance process is completed.</li>
            <li>I understand that failure to cooperate with the insurance process may affect the resolution of the damage claim and could result in additional liabilities.</li>
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