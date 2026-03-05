import React, { useEffect } from 'react'
import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutComponent from '../components/About'

export default function About() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SEOHead
                title="About Us | Run Real Estate Butwal & Rupandehi"
                description="Discover Run Real Estate's story. With 10+ years of experience, we are the trusted experts for finding premium plots and buying land in Nepal."
            />
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
                <AboutComponent />
            </main>
            <Footer />
        </>
    )
}
