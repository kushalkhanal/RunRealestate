import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { FiHome, FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi'

const stats = [
    { icon: <FiHome />, end: 500, suffix: '+', label: 'Plots Available' },
    { icon: <FiUsers />, end: 200, suffix: '+', label: 'Happy Clients' },
    { icon: <FiAward />, end: 10, suffix: '+', label: 'Years of Trust' },
    { icon: <FiCheckCircle />, end: 100, suffix: '%', label: 'Legal Verified' },
]

function Counter({ end, suffix, start }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!start) return
        let startTime = null
        const duration = 1800

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [start, end])

    return <>{count}{suffix}</>
}

export default function StatsBar() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section className="statsbar" ref={ref}>
            <div className="container">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        className="stat-card"
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: i * 0.12 }}
                    >
                        <div className="stat-icon">{stat.icon}</div>
                        <div className="stat-number">
                            <Counter end={stat.end} suffix={stat.suffix} start={inView} />
                        </div>
                        <div className="stat-label">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
