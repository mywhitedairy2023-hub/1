import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Milk, ShoppingCart } from 'lucide-react';

export function DairyNav() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b-2 border-blue-200"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Milk className="w-10 h-10 text-blue-600" />
            </motion.div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              White Dairy
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`text-lg font-semibold cursor-pointer ${
                  location.pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'
                }`}
              >
                Home
              </motion.span>
            </Link>

            <Link to="/order">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-semibold shadow-lg cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Now
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}