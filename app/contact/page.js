"use client"
import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import emailjs from 'emailjs-com';
import { useRef } from 'react';

const ContactForm = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const values = Object.fromEntries(formData.entries());
    if (Object.values(values).some(value => !value)) {
      alert('Please fill in all required fields.');
      return;
    }

    emailjs.sendForm('service_w76tmg6', 'template_ptsx6yk', form.current, 'OSPA4BtKLcH_jtgWC')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('Thank you for your details, we will reach you soon!');
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div>
      <Header />

      <div className='lg:mx-80 my-10 py-14 space-y-16 border-[4px] border-rose-900 bg-white rounded-xl shadow-xl'>
        <div className='flex justify-center text-2xl font-bold underline underline-offset-8 decoration-rose-950 decoration-4 my-10'>Contact Us</div>
        <div>
          <form className='flex flex-col justify-center items-center space-y-6 my-20' ref={form} onSubmit={sendEmail}>
            <input
              type='text'
              placeholder='Full Name'
              name='Full Name'
              required
              className='w-[50%] h-12 flex text-center rounded-md border text-sm' />
            <input
              type='phone number'
              placeholder='Phone number'
              name='Phone Number'
              required
              className='w-[50%] h-12 flex text-center rounded border text-sm' />
            <input
              type='text'
              placeholder='Car Company'
              name='Car Company'
              required
              className='w-[50%] h-12 flex text-center rounded border text-sm' />
            <input
              type='text'
              placeholder='Car Model' 
              name='Car Model'
              required
              className='w-[50%] h-12 flex text-center rounded border text-sm' />

            <textarea
              type='text'
              name='Message'
              required
              placeholder='Messsage'
              className='w-[50%] h-12 flex text-center p-2 rounded border text-sm'
            />

            <button className='bg-rose-900 w-40 h-12 rounded-xl text-white hover:bg-opacity-90' type='submit'>Submit</button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactForm;
