import Footer from '@/components/common/Footer'
import NavbarNew from '@/components/common/Navbar'
import UpperHeader from '@/components/common/UpperHeader'
import DSARegistrationPage from '@/components/dsa/DSASignUPForm'
import React from 'react'

const page = () => {
  return (
    <div>
      <UpperHeader />
      <NavbarNew />
      <main className="">
        {/* <AboutDSAPage /> */}
        <DSARegistrationPage />
      </main>
      <Footer />
    </div>
  )
}

export default page