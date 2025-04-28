import React from 'react'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-800 text-white p-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm">&copy; 2025 E-Store. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-gray-400 transition">Contact</a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
