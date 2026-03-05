import React from 'react'
import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import StatsBar from '../components/StatsBar'
import FeaturedPlots from '../components/FeaturedPlots'
import WhyUs from '../components/WhyUs'
import AboutComponent from '../components/About'
import PreviousPlots from '../components/PreviousPlots'
import EnquiryForm from '../components/EnquiryForm'

export default function Home() {
    return (
        <>
            <SEOHead
                title="Run Real Estate | Buy Land Nepal & Premium Plots Nepal"
                description="Discover premium residential, commercial, and agricultural plots across Butwal and Rupandehi. Buy land in Nepal with transparent pricing and full legal clarity."
                url="https://runrealestate.com.np"
            />
            <Navbar />
            <main>
                <Hero />
                <StatsBar />
                <FeaturedPlots />
                <WhyUs />
                <AboutComponent />
                <PreviousPlots />
                <EnquiryForm />
            </main>
            <Footer />
        </>
    )
}
