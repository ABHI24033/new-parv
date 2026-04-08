"use client";
import LeadForm from '@/components/Lead/LeadForm';
import React, { useState } from 'react';

const Page = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='border p-6 rounded-2xl m-4 bg-white shadow-sm'>
        <div className='px-4 my-2 mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>Generate New Lead</h2>
            <p className='text-sm text-gray-500'>Fill in the details below to create a new lead entry.</p>
        </div>
        <LeadForm setOpen={setOpen} />
    </div>
  )
}

export default Page;