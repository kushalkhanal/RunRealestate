import { motion, AnimatePresence } from 'framer-motion'
import logo from '../assets/logo final.png'

export default function Loader() {
    return (
        <AnimatePresence>
            <motion.div
                className="loader-overlay"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="loader-logo">
                        <div className="loader-logo-wrap">
                            <img src={logo} alt="Run Real Estate Logo" className="loader-logo-img" />
                        </div>
                        Run <span>Real Estate</span>
                    </div>
                </motion.div>
                <motion.div
                    className="loader-bar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="loader-bar-fill" />
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '14px', letterSpacing: '2px' }}
                >
                    LOADING YOUR DREAM PROPERTY…
                </motion.p>
            </motion.div>
        </AnimatePresence>
    )
}
