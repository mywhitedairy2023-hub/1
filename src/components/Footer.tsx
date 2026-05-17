import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Order Online', path: '/order' },
    // You can add these routes later, they default to home for now
    { label: 'About Us', path: '/' }, 
    { label: 'Contact', path: '/' },
  ];

  const products = [
    'Farm Fresh Milk',
    'Organic Paneer',
    'Pure Cow Ghee',
    'Fresh Cream',
    'Homemade Curd',
  ];

  const promises = [
    '100% Organic',
    'Zero Preservatives',
    'Farm to Table',
    'Cold Chain Delivery',
    'Eco-Friendly Packaging',
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900 text-white pt-20 pb-10 z-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              White Dairy
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Delivering pure, farm-fresh dairy products straight to your doorstep every morning. Nature's goodness, uncompromised.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-10 h-10 rounded-full bg-blue-600/20 hover:bg-blue-500 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-4 text-gray-100">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-4 text-gray-100">Our Products</h4>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li key={index} className="text-gray-300">
                  {product}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Promise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-4 text-gray-100">Our Promise</h4>
            <ul className="space-y-2">
              {promises.map((promise, index) => (
                <li key={index} className="text-gray-300 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  {promise}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 p-8 bg-gradient-to-r from-blue-900/40 to-green-900/20 rounded-3xl border border-blue-500/20 shadow-xl"
        >
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-blue-400" />
            <h4 className="text-2xl font-bold mb-2 text-white">Get Fresh Offers</h4>
            <p className="text-gray-300 mb-6">
              Subscribe to get updates on seasonal dairy products, delivery schedules, and exclusive healthy recipes.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-blue-500/30 focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-500 rounded-full font-bold text-white shadow-lg cursor-pointer"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-gray-400 text-sm">
            © {currentYear} White Dairy. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span>Proudly serving our local community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}