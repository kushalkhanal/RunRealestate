import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Loader from './components/Loader'
import ScrollTop from './components/ScrollTop'

// Pages
import Home from './pages/Home'
import AboutPage from './pages/About'
import ContactPage from './pages/Contact'
import PlotDetails from './pages/PlotDetails'

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  // Reset loading on initial mount only
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to top or specific hash on route change
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <>
      <Helmet>
        <title>Run Real Estate | Find Your Perfect Plot in Nepal</title>
        <meta name="description" content="Discover premium residential, commercial, and agricultural plots across Butwal, Bhairahawa, and the Rupandehi district — with full legal clarity and transparent pricing." />
      </Helmet>

      {loading && <Loader />}
      {!loading && (
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/plot/:id" element={<PlotDetails />} />
          </Routes>
          <ScrollTop />
        </>
      )}
    </>
  )
}
