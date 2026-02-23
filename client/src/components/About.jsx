import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

const points = [
    { title: 'Community-First Approach', desc: 'We serve local families and investors with equal dedication and honesty.' },
    { title: '10+ Years of Experience', desc: 'A decade of land deals, market knowledge, and trusted relationships across Rupandehi.' },
    { title: 'End-to-End Support', desc: 'From site visits to land registration — we handle every step for you.' },
]

export default function About() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="about" className="about" ref={ref}>
            <div className="container">
                <div className="about-grid">
                    {/* Image */}
                    <motion.div
                        className="about-image-wrap"
                        initial={{ opacity: 0, x: -80 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format"
                            alt="About Run Real Estate"
                        />
                        <div className="about-img-overlay">
                            <span className="big">10+</span>
                            <span className="sm">Years of<br />Trust</span>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: 80 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.85, ease: 'easeOut', delay: 0.15 }}
                    >
                        <span className="section-tag">Our Story</span>
                        <h2 className="section-title" style={{ color: '#fff' }}>
                            Building Dreams,<br />
                            One <span>Plot at a Time</span>
                        </h2>
                        <p className="section-subtitle" style={{ marginTop: 16 }}>
                            Run Real Estate was founded with a simple mission: make land buying in Nepal transparent,
                            simple, and trustworthy. Based in Butwal, we've spent over a decade helping families,
                            entrepreneurs, and investors find their perfect plot.
                        </p>

                        <div className="about-points">
                            {points.map((pt, i) => (
                                <motion.div
                                    key={pt.title}
                                    className="about-point"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                                >
                                    <div className="about-point-icon"><FiCheckCircle /></div>
                                    <div className="about-point-text">
                                        <h4>{pt.title}</h4>
                                        <p>{pt.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            className="btn-primary"
                            style={{ marginTop: 32 }}
                            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            Get In Touch →
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
