import { motion } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const badgeClass = { Hot: 'hot', New: 'new', Featured: 'featured', Premium: 'premium' }

export default function PlotCard({ plot, index, inView }) {
    const navigate = useNavigate()

    const handleNavigation = () => {
        const plotId = plot._id || plot.title.replace(/\s+/g, '-').toLowerCase()
        navigate(`/plot/${plotId}`)
    }

    return (
        <motion.div
            className="plot-card"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="plot-card-image">
                <img src={plot.image} alt={plot.title} loading="lazy" />
                {plot.badge && (
                    <span className={`plot-badge plot-badge-${badgeClass[plot.badge] || 'new'}`}>
                        {plot.badge}
                    </span>
                )}
            </div>
            <div className="plot-card-body">
                <div className="plot-category">{plot.category}</div>
                <h3 className="plot-title">{plot.title}</h3>
                <div className="plot-location">
                    <FiMapPin /> {plot.location}
                </div>
                <div className="plot-details">
                    <div>
                        <div className="plot-price">{plot.price}</div>
                        <div className="plot-area">{plot.area}</div>
                    </div>
                    <button className="plot-enquire-btn" onClick={handleNavigation}>
                        View Details →
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
