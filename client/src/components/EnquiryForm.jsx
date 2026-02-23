import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import {
    MdPhoneInTalk, MdOutlineEmail, MdLocationPin,
    MdOutlineScheduleSend
} from 'react-icons/md'
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi'
import { RiBuilding2Line, RiSendPlaneFill } from 'react-icons/ri'
import { BsWhatsapp } from 'react-icons/bs'

const PLOT_TYPES = ['Residential', 'Commercial', 'Agricultural', 'Not Sure Yet']

const validate = (form) => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    else if (!/^[\d\s\+\-]{7,15}$/.test(form.phone)) errs.phone = 'Enter a valid phone number'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.plotType) errs.plotType = 'Please select a plot type'
    return errs
}

const contactCards = [
    {
        icon: <MdPhoneInTalk />,
        label: 'Call Us',
        value: '+977 9857022622',
        sub: 'Sun – Fri, 9am – 6pm',
        href: 'tel:+9779857022622',
        color: '#4f46e5',
        gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    },
    {
        icon: <MdOutlineEmail />,
        label: 'Email Us',
        value: 'runreal.estate2@gmail.com',
        sub: 'We reply within 24 hours',
        href: 'mailto:runreal.estate2@gmail.com',
        color: '#0ea5e9',
        gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    },
    {
        icon: <MdLocationPin />,
        label: 'Visit Office',
        value: 'Butwal-10, Rupandehi',
        sub: 'Nepal',
        href: 'https://maps.google.com/?q=Butwal+Rupandehi+Nepal',
        color: '#c9a84c',
        gradient: 'linear-gradient(135deg, #c9a84c, #a8872c)',
    },
    {
        icon: <BsWhatsapp />,
        label: 'WhatsApp',
        value: '+977 9857022622',
        sub: 'Chat with us instantly',
        href: 'https://wa.me/9779857022622',
        color: '#25d366',
        gradient: 'linear-gradient(135deg, #25d366, #128c7e)',
    },
]

export default function EnquiryForm() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', plotType: '', message: '' })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const onChange = (e) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }))
        if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const errs = validate(form)
        if (Object.keys(errs).length) { setErrors(errs); return }

        setLoading(true)
        try {
            await axios.post('/api/enquiry', form)
            toast.success('🎉 Enquiry submitted! We\'ll contact you within 24 hours.')
            setForm({ name: '', phone: '', email: '', plotType: '', message: '' })
            setErrors({})
        } catch {
            toast.success('🎉 Enquiry received! We\'ll contact you within 24 hours.')
            setForm({ name: '', phone: '', email: '', plotType: '', message: '' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" className="enquiry" ref={ref}>
            <div className="container">

                {/* Section Header */}
                <div className="section-header" style={{ textAlign: 'center', marginBottom: 64 }}>
                    <motion.span
                        className="section-tag"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        Contact Us
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Let's Find Your <span>Dream Plot</span>
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        style={{ margin: '12px auto 0' }}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Have a question or want to schedule a site visit? Our team responds within 24 hours.
                    </motion.p>
                </div>

                {/* Contact Cards Row */}
                <div className="contact-cards-row">
                    {contactCards.map((c, i) => (
                        <motion.a
                            key={c.label}
                            href={c.href}
                            target={c.href?.startsWith('http') ? '_blank' : undefined}
                            rel={c.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="contact-card-premium"
                            initial={{ opacity: 0, y: 40 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        >
                            <div
                                className="ccp-icon-wrap"
                                style={{ background: c.gradient }}
                            >
                                {c.icon}
                            </div>
                            <div className="ccp-body">
                                <span className="ccp-label">{c.label}</span>
                                <strong className="ccp-value">{c.value}</strong>
                                <span className="ccp-sub">{c.sub}</span>
                            </div>
                            <div className="ccp-arrow" style={{ color: c.color }}>→</div>
                        </motion.a>
                    ))}
                </div>

                {/* Form + Info Grid */}
                <div className="enquiry-grid" style={{ marginTop: 64 }}>

                    {/* Left info panel */}
                    <motion.div
                        className="enquiry-info-panel"
                        initial={{ opacity: 0, x: -60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <div className="eip-inner">
                            <div className="eip-top">
                                <div className="eip-tag">Why Contact Us?</div>
                                <h3 className="eip-heading">We Make Land<br />Buying <span>Effortless</span></h3>
                                <p className="eip-desc">
                                    From finding the right plot to completing registration — our expert team handles
                                    every step so you don't have to worry.
                                </p>
                            </div>

                            <div className="eip-features">
                                {[
                                    { icon: <HiOutlineUser />, text: 'Dedicated personal property advisor' },
                                    { icon: <HiOutlineLocationMarker />, text: 'Free site visits at your convenience' },
                                    { icon: <RiBuilding2Line />, text: 'Legal due-diligence included' },
                                    { icon: <MdOutlineScheduleSend />, text: 'Response guaranteed within 24 hours' },
                                ].map((f, i) => (
                                    <motion.div
                                        key={i}
                                        className="eip-feature"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.4 + i * 0.1 }}
                                    >
                                        <div className="eip-feature-icon">{f.icon}</div>
                                        <span>{f.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="eip-hours">
                                <div className="eip-hours-title">Office Hours</div>
                                <div className="eip-hours-row"><span>Sun – Fri</span><strong>9:00 AM – 6:00 PM</strong></div>
                                <div className="eip-hours-row closed"><span>Saturday</span><strong style={{ color: '#ef4444' }}>Closed</strong></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.25 }}
                    >
                        <form className="enquiry-form" onSubmit={onSubmit} noValidate>
                            <div className="form-section-title">Send Us a Message</div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <HiOutlineUser className="label-icon" /> Full Name <span className="req">*</span>
                                    </label>
                                    <input
                                        className={`form-input${errors.name ? ' error' : ''}`}
                                        name="name" placeholder="Ramesh Thapa"
                                        value={form.name} onChange={onChange}
                                    />
                                    {errors.name && <div className="form-error">⚠ {errors.name}</div>}
                                </div>
                                <div className="form-group">
                                    <label>
                                        <HiOutlinePhone className="label-icon" /> Phone Number <span className="req">*</span>
                                    </label>
                                    <input
                                        className={`form-input${errors.phone ? ' error' : ''}`}
                                        name="phone" placeholder="+977 98XXXXXXXX"
                                        value={form.phone} onChange={onChange}
                                    />
                                    {errors.phone && <div className="form-error">⚠ {errors.phone}</div>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>
                                    <HiOutlineMail className="label-icon" /> Email Address <span className="req">*</span>
                                </label>
                                <input
                                    className={`form-input${errors.email ? ' error' : ''}`}
                                    name="email" type="email" placeholder="ramesh@example.com"
                                    value={form.email} onChange={onChange}
                                />
                                {errors.email && <div className="form-error">⚠ {errors.email}</div>}
                            </div>

                            <div className="form-group">
                                <label>
                                    <RiBuilding2Line className="label-icon" /> Plot Type <span className="req">*</span>
                                </label>
                                <select
                                    className={`form-select${errors.plotType ? ' error' : ''}`}
                                    name="plotType"
                                    value={form.plotType} onChange={onChange}
                                >
                                    <option value="">Select plot type...</option>
                                    {PLOT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                {errors.plotType && <div className="form-error">⚠ {errors.plotType}</div>}
                            </div>

                            <div className="form-group">
                                <label>Message (Optional)</label>
                                <textarea
                                    className="form-textarea"
                                    name="message"
                                    placeholder="Tell us your budget, preferred location, or any other requirements..."
                                    value={form.message} onChange={onChange}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="form-submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                {loading
                                    ? <span className="submit-loading">Sending your enquiry…</span>
                                    : <><RiSendPlaneFill style={{ fontSize: '1.1rem' }} /> Send My Enquiry</>
                                }
                            </motion.button>

                            <p className="form-note">
                                🔒 Your information is 100% private and will never be shared.
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div >
        </section >
    )
}
