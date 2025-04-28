import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      when: "beforeChildren", // Animate container first
      staggerChildren: 0.6,   // 0.6s delay for children
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  return (
    <motion.div 
      className="bg-[url('/E-Shop/back.jpg')] bg-cover bg-center h-[80vh] w-full flex items-center justify-center mt-2"
      aria-label="Background image"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="px-6 py-3 bg-amber-200 text-black font-bold rounded-lg cursor-pointer hover:bg-amber-400 transition-colors"
        variants={childVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/Shop"><span className='font-christian'>SHOP NoW</span></Link>
      </motion.div>
    </motion.div>
  )
}

export default Hero
