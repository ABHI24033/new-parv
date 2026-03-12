import EnquiryForm from '@/components/LoanEnquiry/FormSection'
import React from 'react'

const page = () => {
  return (
    <div className='border p-6 rounded-2xl m-4'>
        <div className='px-4 my-2'>
            <h2 className='text-2xl font-semibold'>Lead Generation</h2>
        </div>
         <EnquiryForm />
    </div>
  )
}

export default page