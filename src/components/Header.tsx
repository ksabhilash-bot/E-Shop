import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'CART', path: '/cart' },
    { name: 'LOGIN', path: '/login' },
    { name: 'SIGNUP', path: '/signup' },
    { name: 'ORDER', path: '/order' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-blue-600 font-letme">E-Store</div>
        
        {/* Desktop Menu */}
        <motion.ul 
          className="hidden md:flex items-center space-x-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {menuItems.map((item, index) => (
            <motion.li 
              key={index}
              className="hover:text-blue-500 cursor-pointer font-bold"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              <Link to={item.path}>
                <span className='font-christian'>{item.name}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50"
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="py-2"
            >
              {menuItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-2"
                >
                  <Link 
                    to={item.path}
                    className="block font-christian font-bold hover:text-blue-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;