import React, { useEffect } from 'react'
import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EnquiryForm from '../components/EnquiryForm'

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <SEOHead
                title="Contact Run Real Estate | Land Experts in Butwal, Nepal"
                description="Get in touch with Run Real Estate in Butwal, Rupandehi. Contact our experts to schedule a site visit or inquire about premium land in Nepal."
            />
            <Navbar />
            <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
                <EnquiryForm />
            </main>
            <Footer />
        </>
    )
}
