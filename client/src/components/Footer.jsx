import { FiFacebook, FiArrowRight } from 'react-icons/fi'
import { SiTiktok } from 'react-icons/si'
import { BsWhatsapp } from 'react-icons/bs'
import logo from '../assets/logo final.png'

export default function Footer() {
    const scroll = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

    return (
        <footer className="footer" id="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div className="footer-logo">
                            <div className="footer-logo-wrap">
                                <img src={logo} alt="Run Real Estate Logo" className="logo-icon" />
                            </div>
                            Run <span>Real Estate</span>
                        </div>
                        <p className="footer-desc">
                            Nepal's trusted land experts since 2014. We help you find, verify, and register
                            your perfect plot — with full transparency and zero hassle.
                        </p>
                        <div className="footer-socials">
                            {[
                                { Icon: FiFacebook, href: 'https://www.facebook.com/run.realestate', label: 'Facebook' },
                                { Icon: SiTiktok, href: 'https://www.tiktok.com/', label: 'TikTok' },
                                { Icon: BsWhatsapp, href: 'https://wa.me/9779857022622', label: 'WhatsApp' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-social"
                                    aria-label={label}
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            {[
                                { label: 'Home', id: '#home' },
                                { label: 'Featured Plots', id: '#plots' },
                                { label: 'Why Choose Us', id: '#why' },
                                { label: 'About Us', id: '#about' },
                                { label: 'Contact', id: '#contact' },
                            ].map(l => (
                                <li key={l.label}>
                                    <a href={l.id} onClick={e => { e.preventDefault(); scroll(l.id) }}>
                                        <FiArrowRight size={12} /> {l.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Plot types */}
                    <div className="footer-col">
                        <h4>Plot Types</h4>
                        <ul>
                            {['Residential Plots', 'Commercial Plots', 'Agricultural Land', 'Highway-Side Plots', 'Corner Plots'].map(l => (
                                <li key={l}>
                                    <a href="#plots" onClick={e => { e.preventDefault(); scroll('#plots') }}>
                                        <FiArrowRight size={12} /> {l}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-col footer-newsletter">
                        <h4>Stay Updated</h4>
                        <p>Subscribe to get the latest plot listings and market updates directly to your inbox.</p>
                        <div className="newsletter-form">
                            <input className="newsletter-input" type="email" placeholder="your@email.com" />
                            <button className="newsletter-btn"><FiArrowRight /></button>
                        </div>
                        <p style={{ marginTop: 20, fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.9 }}>
                            📍 Butwal-10, Rupandehi, Nepal<br />
                            📞 <a href="tel:+9779857022622" style={{ color: 'inherit' }}>+977 9857022622</a><br />
                            💬 <a href="https://wa.me/9779857022622" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>WhatsApp: +977 9857022622</a><br />
                            ✉️ <a href="mailto:runreal.estate2@gmail.com" style={{ color: 'inherit' }}>runreal.estate2@gmail.com</a>
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Run Real Estate. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
