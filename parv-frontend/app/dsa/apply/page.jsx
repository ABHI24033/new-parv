import Footer from '@/components/common/Footer'
import NavbarNew from '@/components/common/Navbar'
import UpperHeader from '@/components/common/UpperHeader'
import DSARegistrationPage from '@/components/dsa/DSASignUPForm'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <UpperHeader />
      <NavbarNew />
      <main className="flex-1 bg-slate-50">
        {/* <AboutDSAPage /> */}
        <DSARegistrationPage />
      </main>
      <Footer />
    </div>
  )
}

export default page