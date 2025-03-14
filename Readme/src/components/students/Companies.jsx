import React from 'react'
import { assets } from './../../assets/assets';

function Companies() {
  return (
    <div>
      <p className='mt-5 py-2.5 text-gray-600'>Trusted by lerners from</p>
      <div className='flex-col md:flex md:flex-row justify-center items-center space-x-5 md:space-x-10 md:space-y-0 space-y-5'>
        <img src={assets.microsoft_logo} alt="Microsoft" className='w-20 md:w-28' />
        <img src={assets.accenture_logo} alt="Accenture" className='w-20 md:w-28' />
        <img src={assets.walmart_logo} alt="Walmart" className='w-20 md:w-28' />
        <img src={assets.adobe_logo} alt="Adobe" className='w-20 md:w-28' />
        <img src={assets.paypal_logo} alt="Paypal" className='w-20 md:w-28' />
      </div>
    </div>
  )
}

export default Companies