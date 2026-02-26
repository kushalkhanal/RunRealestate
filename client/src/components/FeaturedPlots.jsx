import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import axios from 'axios'
import PlotCard from './PlotCard'

import manigramImg from '../assets/manigram plot.jpeg'
import butwalImg from '../assets/butwal_commercial_plot.png'
import suspuraImg from '../assets/suspura plot.jpg'
import pharsatikarImg from '../assets/image.png'
import fertileLandImg from '../assets/fertile land.png'
import sunriseValleyImg from '../assets/best plot for house.png'

const TABS = ['all', 'residential', 'commercial', 'agricultural']
const TAB_LABELS = { all: 'All Plots', residential: 'Residential', commercial: 'Commercial', agricultural: 'Agricultural' }

// Fallback data in case backend is not running
const FALLBACK = [
    { _id: '1', title: 'Sunrise Valley Residential Plot', price: '₹45 Lakhs', area: '1200 sq.ft', category: 'residential', location: 'Pokhara Road, Butwal', image: sunriseValleyImg, badge: 'Sold' },
    { _id: '2', title: 'Manigram Plot', price: '₹32 Lakhs', area: '900 sq.ft', category: 'residential', location: 'Near Bisram Batika', image: manigramImg, badge: 'New' },
    { _id: '3', title: 'City Centre Commercial Space', price: '₹1.2 Crore', area: '2400 sq.ft', category: 'commercial', location: 'Main Bazaar, Butwal', image: butwalImg, badge: 'Premium' },
    { _id: '4', title: 'House in Pharsatikar', price: '₹80 Lakhs', area: '3200 sq.ft', category: 'residential', location: 'Near Pharsatikar Chowk', image: pharsatikarImg, badge: 'Sold' },
    { _id: '5', title: 'Fertile Agricultural Land', price: '₹18 Lakhs', area: '5 Ropani', category: 'agricultural', location: 'Tilottama, Rupandehi', image: fertileLandImg, badge: 'Sold' },
    { _id: '6', title: 'Suspura Plot', price: '₹72 Lakhs', area: '1800 sq.ft', category: 'residential', location: 'Devdaha, Rupandehi', image: suspuraImg, badge: 'Hot' },
]

export default function FeaturedPlots() {
    const [activeTab, setActiveTab] = useState('all')
    const [plots, setPlots] = useState(FALLBACK)
    const [filtered, setFiltered] = useState(FALLBACK)
    const [loading, setLoading] = useState(true)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    useEffect(() => {
        axios.get('/api/plots')
            .then(res => {
                const processed = res.data.map(p => {
                    if (p.title === 'Sunrise Valley Residential Plot') {
                        return { ...p, image: sunriseValleyImg, badge: 'Sold' };
                    }
                    if (p.title === 'Green Meadows Residential Plot' || p.title === 'Manigram Plot') {
                        return { ...p, title: 'Manigram Plot', location: 'Near Bisram Batika', image: manigramImg };
                    }
                    if (p.title === 'City Centre Commercial Space') {
                        return { ...p, image: butwalImg };
                    }
                    if (p.title === 'Lakeview Premium Residential' || p.title === 'Suspura Plot') {
                        return { ...p, title: 'Suspura Plot', image: suspuraImg };
                    }
                    if (p.title === 'Pharsatikar plot' || p.title === 'House in Pharsatikar') {
                        return { ...p, title: 'House in Pharsatikar', price: '₹80 Lakhs', category: 'residential', location: 'Near Pharsatikar Chowk', image: pharsatikarImg, badge: 'Sold' };
                    }
                    if (p.title === 'Fertile Land Agricultural Plot' || p.title === 'Fertile Agricultural Land') {
                        return { ...p, title: 'Fertile Agricultural Land', image: fertileLandImg, badge: 'Sold' };
                    }
                    return p;
                });
                setPlots(processed);
                setFiltered(processed);
            })
            .catch(() => { /* use fallback */ })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setFiltered(activeTab === 'all' ? plots : plots.filter(p => p.category === activeTab))
    }, [activeTab, plots])

    return (
        <section id="plots" className="plots" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <motion.span
                        className="section-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        Our Listings
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Featured <span>Properties</span>
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        style={{ margin: '12px auto 0' }}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Browse through our hand-picked plots with verified documentation, prime locations, and the best market pricing.
                    </motion.p>

                    {/* Filter tabs */}
                    <motion.div
                        className="filter-tabs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                className={`filter-tab${activeTab === tab ? ' active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {TAB_LABELS[tab]}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="plots-grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        {loading
                            ? Array(6).fill(0).map((_, i) => (
                                <div key={i} style={{ background: '#eee', borderRadius: 14, height: 360, animation: 'pulse 1.5s ease infinite' }} />
                            ))
                            : filtered.map((plot, i) => (
                                <PlotCard key={plot._id} plot={plot} index={i} inView={inView} />
                            ))
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    )
}
