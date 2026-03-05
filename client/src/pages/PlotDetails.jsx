import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import SEOHead from '../components/SEOHead'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EnquiryForm from '../components/EnquiryForm'

// Fallback data mapping to existing assets if backend fails
import manigramImg from '../assets/manigram plot.jpeg'
import butwalImg from '../assets/butwal_commercial_plot.png'
import suspuraImg from '../assets/suspura plot.jpg'
import pharsatikarImg from '../assets/image.png'
import fertileLandImg from '../assets/fertile land.png'
import sunriseValleyImg from '../assets/best plot for house.png'

const localMocks = [
    { _id: '1', title: 'Sunrise Valley Residential Plot', price: '₹45 Lakhs', area: '1200 sq.ft', category: 'residential', location: 'Pokhara Road, Butwal', image: sunriseValleyImg, badge: 'Sold' },
    { _id: '2', title: 'Manigram Plot', price: '₹32 Lakhs', area: '900 sq.ft', category: 'residential', location: 'Near Bisram Batika', image: manigramImg, badge: 'New' },
    { _id: '3', title: 'City Centre Commercial Space', price: '₹1.2 Crore', area: '2400 sq.ft', category: 'commercial', location: 'Main Bazaar, Butwal', image: butwalImg, badge: 'Premium' },
    { _id: '4', title: 'House in Pharsatikar', price: '₹80 Lakhs', area: '3200 sq.ft', category: 'residential', location: 'Near Pharsatikar Chowk', image: pharsatikarImg, badge: 'Sold' },
    { _id: '5', title: 'Fertile Agricultural Land', price: '₹18 Lakhs', area: '5 Ropani', category: 'agricultural', location: 'Tilottama, Rupandehi', image: fertileLandImg, badge: 'Sold' },
    { _id: '6', title: 'Suspura Plot', price: '₹72 Lakhs', area: '1800 sq.ft', category: 'residential', location: 'Devdaha, Rupandehi', image: suspuraImg, badge: 'Hot' },
]

export default function PlotDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [plot, setPlot] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)

        // Attempt backend fetch, fallback to local match
        axios.get(`/api/plots/${id}`)
            .then(res => {
                if (res.data) setPlot(processPlotImage(res.data));
            })
            .catch(() => {
                // Fallback parsing (in case of missing API, match ID or title)
                const matched = localMocks.find(p => p._id === id || p.title.replace(/\s+/g, '-').toLowerCase() === id);
                if (matched) setPlot(matched);
            })
            .finally(() => setLoading(false))
    }, [id])

    const processPlotImage = (p) => {
        // Just a helper to assign local images based on title
        if (p.title.includes('Sunrise')) return { ...p, image: sunriseValleyImg };
        if (p.title.includes('Manigram')) return { ...p, image: manigramImg };
        if (p.title.includes('City Centre')) return { ...p, image: butwalImg };
        if (p.title.includes('Suspura')) return { ...p, image: suspuraImg };
        if (p.title.includes('Pharsatikar')) return { ...p, image: pharsatikarImg };
        if (p.title.includes('Fertile')) return { ...p, image: fertileLandImg };
        return p;
    };

    if (loading) return <div style={{ padding: '120px 20px', textAlign: 'center' }}>Loading...</div>

    if (!plot) return (
        <div style={{ padding: '120px 20px', textAlign: 'center' }}>
            <h2>Plot Not Found</h2>
            <button onClick={() => navigate('/')} className="btn-primary" style={{ marginTop: 20 }}>Back to Home</button>
        </div>
    )

    const seoTitle = `${plot.title} in ${plot.location} | Run Real Estate`
    const seoDesc = `Explore the ${plot.title} located at ${plot.location}. A premium ${plot.category} plot featuring ${plot.area} for ${plot.price}. Buy land in Nepal.`

    return (
        <>
            <SEOHead
                title={seoTitle}
                description={seoDesc}
                image={plot.image}
            />
            <Navbar />
            <main style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '40px' }}>
                    {/* Plot Image & Info */}
                    <div>
                        <img src={plot.image} alt={plot.title} style={{ width: '100%', borderRadius: '20px', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} />
                        <h1 style={{ marginTop: '24px', fontSize: '2rem', color: '#1a1a2e' }}>{plot.title}</h1>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', color: '#6b7280', flexWrap: 'wrap' }}>
                            <span>📍 {plot.location}</span>
                            <span style={{ textTransform: 'capitalize' }}>🏷️ {plot.category}</span>
                            <span>📐 {plot.area}</span>
                            <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>💰 {plot.price}</span>
                        </div>
                        <p style={{ marginTop: '24px', lineHeight: '1.7', color: '#4b5563' }}>
                            This exceptional {plot.category} plot is strategically located in {plot.location}. Offering {plot.area} of prime land, it’s an incredible opportunity for buyers looking to invest in Nepal's rapidly growing real estate market.
                        </p>
                        <button onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary" style={{ marginTop: 30 }}>
                            Enquire About This Plot
                        </button>
                    </div>

                    {/* Sticky Sidebar */}
                    <div>
                        <div style={{ position: 'sticky', top: '100px', background: '#f8f7f4', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
                            <h3 style={{ marginBottom: '16px', color: '#1a1a2e' }}>Quick Summary</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>Status</span>
                                    <strong>{plot.badge || 'Available'}</strong>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>Property Type</span>
                                    <strong style={{ textTransform: 'capitalize' }}>{plot.category}</strong>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>Area</span>
                                    <strong>{plot.area}</strong>
                                </li>
                                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>Price</span>
                                    <strong style={{ color: '#c9a84c' }}>{plot.price}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '60px' }}>
                    <EnquiryForm />
                </div>
            </main>
            <Footer />
        </>
    )
}
