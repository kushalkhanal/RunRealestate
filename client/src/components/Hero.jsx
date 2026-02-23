import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { BsPlayCircleFill, BsPauseCircleFill } from 'react-icons/bs'
import heroVideo from '../assets/to keep in stie .mp4'

export default function Hero() {
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const videoRef = useRef(null)
    const [playing, setPlaying] = useState(true)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 60 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
            )
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.7 }
            )
        })
        return () => ctx.revert()
    }, [])

    const scrollToPlots = () => {
        document.querySelector('#plots')?.scrollIntoView({ behavior: 'smooth' })
    }
    const scrollToContact = () => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    const togglePlay = () => {
        if (!videoRef.current) return
        if (playing) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setPlaying(!playing)
    }

    return (
        <section id="home" className="hero">
            <div className="hero-bg" />
            <div className="hero-gradient" />
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />

            <div className="container">
                <div className="hero-layout">

                    {/* ── LEFT: Text content ── */}
                    <div className="hero-content">
                        <h1 className="hero-title" ref={titleRef} style={{ opacity: 0 }}>
                            Find Your Perfect<br />
                            <span className="highlight">Plot of Land</span><br />
                            in Nepal
                        </h1>

                        <p className="hero-subtitle" ref={subtitleRef} style={{ opacity: 0 }}>
                            Discover premium residential, commercial, and agricultural plots
                            across Butwal, Bhairahawa, and the Rupandehi district —
                            with full legal clarity and transparent pricing.
                        </p>

                        <motion.div
                            className="hero-buttons"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 1.0 }}
                        >
                            <button className="btn-primary" onClick={scrollToPlots}>
                                🔍 Explore Plots
                            </button>
                            <button className="btn-ghost" onClick={scrollToContact}>
                                📞 Talk to Expert
                            </button>
                        </motion.div>

                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 1.3 }}
                        >
                            {[
                                { num: '500+', label: 'Plots Sold' },
                                { num: '10+', label: 'Years Experience' },
                                { num: '200+', label: 'Happy Families' },
                                { num: '100%', label: 'Legal Verified' },
                            ].map((s) => (
                                <div className="hero-stat-item" key={s.label}>
                                    <div className="hero-stat-num"><span>{s.num}</span></div>
                                    <div className="hero-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Video panel ── */}
                    <motion.div
                        className="hero-video-wrap"
                        initial={{ opacity: 0, x: 60, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    >
                        {/* Decorative glow ring behind the card */}
                        <div className="hero-video-glow" />

                        {/* Floating card */}
                        <motion.div
                            className="hero-video-card"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            {/* Top bar — like a browser chrome */}
                            <div className="hero-video-topbar">
                                <div className="hv-dots">
                                    <span /><span /><span />
                                </div>
                                <span className="hv-label">Run Real Estate · Property Showcase</span>
                            </div>

                            {/* Video */}
                            <div className="hero-video-container" onClick={togglePlay}>
                                <video
                                    ref={videoRef}
                                    src={heroVideo}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="hero-video"
                                />
                                {/* Hover overlay with play/pause */}
                                <div className="hero-video-overlay">
                                    <motion.div
                                        className="hero-video-playbtn"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {playing
                                            ? <BsPauseCircleFill />
                                            : <BsPlayCircleFill />
                                        }
                                    </motion.div>
                                </div>
                            </div>

                            {/* Bottom pill badge */}
                            <div className="hero-video-badge">
                                <span className="hvb-dot" />
                                Live Property Tour — Butwal, Nepal
                            </div>
                        </motion.div>

                        {/* Floating stat cards */}
                        <motion.div
                            className="hero-float-tag hero-float-tag-1"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            ✅ 100% Legal Verified
                        </motion.div>

                        <motion.div
                            className="hero-float-tag hero-float-tag-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            🏡 500+ Plots Sold
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero-scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
            >
                <div className="hero-scroll-line" />
                <span>Scroll</span>
            </motion.div>
        </section>
    )
}
