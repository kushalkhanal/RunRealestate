import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const cards = [
    { icon: '📍', title: 'Prime Location', desc: 'Every plot is in a strategically chosen location with excellent connectivity and future growth potential.' },
    { icon: '📋', title: 'Transparent Deals', desc: 'No hidden charges. Complete price transparency from listing to registration — always.' },
    { icon: '⚖️', title: 'Legal Clarity', desc: 'All plots are fully verified with clear titledeed, land registration, and legal documentation.' },
    { icon: '💳', title: 'Easy EMI Options', desc: 'Flexible payment plans and EMI options in partnership with leading Nepali banks.' },
    { icon: '🤝', title: 'Trusted Advisors', desc: 'Our experienced team walks you through every step of your land purchase journey.' },
    { icon: '🔒', title: 'Secure Investment', desc: 'Land always appreciates. Invest with confidence in one of Nepal\'s fastest-growing regions.' },
]

const slideVariant = (dir) => ({
    hidden: { opacity: 0, x: dir === 'left' ? -60 : 60 },
    visible: { opacity: 1, x: 0 },
})

export default function WhyUs() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <section id="why" className="whyus" ref={ref}>
            <div className="container">
                <div className="whyus-grid">
                    {/* Left: cards */}
                    <div>
                        <div className="section-header" style={{ textAlign: 'left' }}>
                            <motion.span
                                className="section-tag"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                Why Us
                            </motion.span>
                            <motion.h2
                                className="section-title"
                                initial={{ opacity: 0, y: 30 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Why Choose <span>Run Real Estate?</span>
                            </motion.h2>
                            <motion.p
                                className="section-subtitle"
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                We bring integrity, expertise, and a personal touch to every property transaction.
                            </motion.p>
                        </div>

                        <div className="whyus-cards" style={{ marginTop: 36 }}>
                            {cards.map((card, i) => (
                                <motion.div
                                    key={card.title}
                                    className="why-card"
                                    variants={slideVariant(i % 2 === 0 ? 'left' : 'right')}
                                    initial="hidden"
                                    animate={inView ? 'visible' : 'hidden'}
                                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                                >
                                    <div className="why-icon">{card.icon}</div>
                                    <div className="why-title">{card.title}</div>
                                    <div className="why-desc">{card.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: image */}
                    <motion.div
                        className="whyus-image"
                        initial={{ opacity: 0, x: 80 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format"
                            alt="Why choose us"
                        />
                        <div className="whyus-badge">
                            <div className="num">500+</div>
                            <div className="label">Successful<br />Transactions</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
