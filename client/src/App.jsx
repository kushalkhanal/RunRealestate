import React, { useState, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import FeaturedPlots from './components/FeaturedPlots'
import WhyUs from './components/WhyUs'
import About from './components/About'
import PreviousPlots from './components/PreviousPlots'
import EnquiryForm from './components/EnquiryForm'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <StatsBar />
            <FeaturedPlots />
            <WhyUs />
            <About />
            <PreviousPlots />
            <EnquiryForm />
          </main>
          <Footer />
          <ScrollTop />
        </>
      )}
    </>
  )
}
