import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFacebook } from 'react-icons/fi'
import { SiTiktok } from 'react-icons/si'
import { BsWhatsapp } from 'react-icons/bs'
import logo from '../assets/logo final.png'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Plots', href: '#plots' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (href) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <motion.nav
                className={`navbar${scrolled ? ' scrolled' : ''}`}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="container">
                    <a className="nav-logo" href="#home" onClick={e => { e.preventDefault(); scrollTo('#home') }}>
                        <div className="nav-logo-wrap">
                            <img src={logo} alt="Run Real Estate Logo" className="logo-icon" />
                        </div>
                        Run <span>Real Estate</span>
                    </a>

                    {/* Desktop nav */}
                    <ul className="nav-links">
                        {navLinks.map(link => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-socials">
                            <a href="https://www.facebook.com/run.realestate" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FiFacebook /></a>
                            <a href="https://www.tiktok.com/@run.realestate" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><SiTiktok /></a>
                            <a href="https://wa.me/9779857022622" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><BsWhatsapp /></a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="nav-cta"
                                onClick={e => { e.preventDefault(); scrollTo('#contact') }}
                            >
                                Enquire Now
                            </a>
                        </li>
                    </ul>

                    {/* Hamburger */}
                    <button
                        className={`hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-nav"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                                initial={{ x: 40, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.07 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                        <div className="mobile-socials">
                            <motion.a href="https://www.facebook.com/run.realestate" target="_blank" rel="noopener noreferrer" aria-label="Facebook" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: navLinks.length * 0.07 + 0.1 }}><FiFacebook /></motion.a>
                            <motion.a href="https://www.tiktok.com/@run.realestate" target="_blank" rel="noopener noreferrer" aria-label="TikTok" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: navLinks.length * 0.07 + 0.15 }}><SiTiktok /></motion.a>
                            <motion.a href="https://wa.me/9779857022622" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: navLinks.length * 0.07 + 0.2 }}><BsWhatsapp /></motion.a>
                        </div>
                        <motion.a
                            href="#contact"
                            className="mobile-close-btn"
                            onClick={e => { e.preventDefault(); scrollTo('#contact') }}
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: navLinks.length * 0.07 }}
                        >
                            🏡 Enquire Now
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
