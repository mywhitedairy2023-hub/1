import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { InteractiveCow } from '../components/InteractiveCow';
import { Milk, Droplet, Award, Leaf } from 'lucide-react';

export function DairyHome() {
  const features = [
    { icon: Milk, title: 'Pure Milk', desc: 'Fresh from our farm to your home' },
    { icon: Droplet, title: 'No Preservatives', desc: '100% natural and organic' },
    { icon: Award, title: 'Premium Quality', desc: 'Award-winning dairy products' },
    { icon: Leaf, title: 'Eco-Friendly', desc: 'Sustainable farming practices' },
  ];

  // Lock in position variables so animations do not reset during re-renders
  const fluidDrops = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: `${(i * 13) % 100}%`, // Distributes the positions uniformly across the screen
      top: `${(i * 17) % 100}%`,
      duration: 5 + (i % 5),
      delay: i * 0.3,
    }));
  }, []);

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 bg-clip-text text-transparent">
            Welcome to White Dairy
          </h1>
          <p className="text-2xl text-gray-700 mb-8">
            Farm Fresh Milk & Pure Dairy Products
          </p>
        </motion.div>

        {/* Interactive Cow Canvas */}
        <InteractiveCow />
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 text-gray-800"
        >
          Why Choose White Dairy?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all text-center"
            >
              <feature.icon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products Preview */}
      <section className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold mb-8 text-gray-800">Our Fresh Products</h2>
          <p className="text-xl text-gray-600 mb-12">Delivered fresh to your doorstep every morning</p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              className="p-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl border-2 border-blue-200"
            >
              <div className="text-6xl mb-4">🥛</div>
              <h3 className="text-3xl font-bold mb-3 text-blue-600">Fresh Milk</h3>
              <p className="text-gray-600 mb-4">Pure, pasteurized milk from healthy cows</p>
              <p className="text-2xl font-bold text-gray-800">₹60/Liter</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              className="p-10 bg-gradient-to-br from-green-50 to-white rounded-3xl shadow-2xl border-2 border-green-200"
            >
              <div className="text-6xl mb-4">🧀</div>
              <h3 className="text-3xl font-bold mb-3 text-green-600">Fresh Paneer</h3>
              <p className="text-gray-600 mb-4">Soft, homemade cottage cheese</p>
              <p className="text-2xl font-bold text-gray-800">₹400/Kg</p>
            </motion.div>
          </div>

          <Link to="/order">
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-xl font-bold shadow-2xl cursor-pointer"
            >
              Order Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Floating Milk Drops Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {fluidDrops.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute w-12 h-12 text-4xl opacity-20"
            style={{
              left: drop.left,
              top: drop.top,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🥛
          </motion.div>
        ))}
      </div>
    </div>
  );
}