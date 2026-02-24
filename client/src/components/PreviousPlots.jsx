import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MdLocationPin } from 'react-icons/md'
import { HiOutlineTag } from 'react-icons/hi'
import manigramImg from '../assets/manigram plot.jpeg'
import butwalImg from '../assets/butwal_commercial_plot.png'
import suspuraImg from '../assets/suspura plot.jpg'

// ── When you're ready, create a /public/plots/ folder and replace
//    the `image` paths below with your actual filenames, e.g.:
//       image: '/plots/sunrise-valley.jpg'
// ─────────────────────────────────────────────────────────────────
const previousPlots = [
    {
        title: 'Sunrise Valley Plot',
        location: 'Pokhara Road, Butwal',
        category: 'Residential',
        area: '1200 sq.ft',
        status: 'Sold',
        image: null,
        color: '#4f46e5',
    },
    {
        title: 'Manigram Plot',
        location: 'Near Bisram Batika',
        category: 'Residential',
        area: '900 sq.ft',
        status: 'Sold',
        image: manigramImg,
        color: '#0ea5e9',
    },
    {
        title: 'City Centre Commercial',
        location: 'Main Bazaar, Butwal',
        category: 'Commercial',
        area: '2400 sq.ft',
        status: 'Sold',
        image: butwalImg,
        color: '#c9a84c',
    },
    {
        title: 'Tinau Riverside Land',
        location: 'Tinau Belt, Rupandehi',
        category: 'Agricultural',
        area: '8 Ropani',
        status: 'Sold',
        image: null,
        color: '#10b981',
    },
    {
        title: 'Pharsatikar plot',
        location: 'Near Pharsatikar Chowk',
        category: 'Commercial',
        area: '3200 sq.ft',
        status: 'Sold',
        image: null,
        color: '#f59e0b',
    },
    {
        title: 'Suspura Plot',
        location: 'Devdaha, Rupandehi',
        category: 'Residential',
        area: '1800 sq.ft',
        status: 'Sold',
        image: suspuraImg,
        color: '#ec4899',
    },
    {
        title: 'Tilottama Fertile Land',
        location: 'Tilottama, Rupandehi',
        category: 'Agricultural',
        area: '5 Ropani',
        status: 'Sold',
        image: null,
        color: '#8b5cf6',
    },
    {
        title: 'Industrial Zone Plot',
        location: 'Industrial Area, Butwal',
        category: 'Commercial',
        area: '6000 sq.ft',
        status: 'Sold',
        image: null,
        color: '#ef4444',
    },
]

// Duplicate for seamless infinite loop
const allCards = [...previousPlots, ...previousPlots]

const categoryColors = {
    Residential: { bg: 'rgba(79,70,229,0.10)', text: '#4f46e5' },
    Commercial: { bg: 'rgba(201,168,76,0.12)', text: '#a8872c' },
    Agricultural: { bg: 'rgba(16,185,129,0.10)', text: '#059669' },
}

export default function PreviousPlots() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section className="prev-plots" ref={ref}>
            <div className="container">
                <div className="section-header">
                    <motion.span
                        className="section-tag"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        Our Track Record
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Our Previous <span>Plots</span>
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        style={{ margin: '12px auto 0' }}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        A glimpse of the plots we've successfully sold. Every one of them, legally verified and
                        handed over with complete satisfaction.
                    </motion.p>
                </div>
            </div>

            {/* Rolling marquee track */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.35 }}
                style={{ overflow: 'hidden', marginTop: 40 }}
            >
                <div className="prev-plots-track">
                    {allCards.map((plot, i) => (
                        <div className="prev-plot-card" key={i}>
                            {/* Image area */}
                            <div
                                className="ppc-image"
                                style={{ background: `linear-gradient(135deg, ${plot.color}22, ${plot.color}44)` }}
                            >
                                {plot.image ? (
                                    <img src={plot.image} alt={plot.title} />
                                ) : (
                                    <div className="ppc-placeholder">
                                        <div
                                            className="ppc-placeholder-icon"
                                            style={{ background: plot.color }}
                                        >
                                            🏡
                                        </div>
                                        <span className="ppc-placeholder-text">Photo Coming Soon</span>
                                    </div>
                                )}
                                {/* Sold badge */}
                                <div className="ppc-sold-badge">✓ {plot.status}</div>
                            </div>

                            {/* Card body */}
                            <div className="ppc-body">
                                <div
                                    className="ppc-category"
                                    style={{
                                        background: categoryColors[plot.category]?.bg,
                                        color: categoryColors[plot.category]?.text,
                                    }}
                                >
                                    <HiOutlineTag /> {plot.category}
                                </div>
                                <h4 className="ppc-title">{plot.title}</h4>
                                <div className="ppc-location">
                                    <MdLocationPin /> {plot.location}
                                </div>
                                <div className="ppc-area">{plot.area}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.p
                className="prev-plots-note"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
            >
                📸 Real plot images will be added shortly — <strong>500+ successful transactions</strong> and counting.
            </motion.p>
        </section>
    )
}
