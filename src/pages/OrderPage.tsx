import { motion } from 'motion/react';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Check, User, Phone, MapPin } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  emoji: string;
  description: string;
}

export function OrderPage() {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    milk: 0,
    paneer: 0,
  });
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const products: OrderItem[] = [
    {
      id: 'milk',
      name: 'Fresh Milk',
      price: 60,
      unit: 'Liter',
      emoji: '🥛',
      description: 'Pure, pasteurized milk from healthy, grass-fed cows. Rich in calcium and protein.',
    },
    {
      id: 'paneer',
      name: 'Fresh Paneer',
      price: 400,
      unit: 'Kg',
      emoji: '🧀',
      description: 'Soft, homemade cottage cheese made from pure milk. Perfect for curries and snacks.',
    },
  ];

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + (quantities[product.id] || 0) * product.price;
    }, 0);
  };

  const handlePlaceOrder = () => {
    const currentTotal = calculateTotal();
    if (currentTotal === 0) return;

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Please fill out your complete delivery details (Name, Phone, and Address) before placing your order.');
      return;
    }

    // Build unique custom formatting for the admin dashboard view contracts
    const formattedCustomerInfo = `${customerName.trim()} (${customerPhone.trim()}) — Loc: ${customerAddress.trim()}`;
    
    const itemSummaryString = products
      .filter(p => quantities[p.id] > 0)
      .map(p => `${p.name} (${quantities[p.id]} ${p.unit}s)`)
      .join(", ");

    const totalQuantityCount = products.reduce((acc, p) => acc + (quantities[p.id] || 0), 0);

    const newOrder = {
      id: Math.floor(100 + Math.random() * 900).toString(),
      customerName: formattedCustomerInfo,
      item: itemSummaryString,
      quantity: totalQuantityCount.toString(),
      status: 'Pending' as const
    };

    // Store synchronously to shared storage pipeline
    const existingOrders = JSON.parse(localStorage.getItem('white_dairy_orders') || '[]');
    existingOrders.unshift(newOrder); // unshift pushes newest elements to the top of the list
    localStorage.setItem('white_dairy_orders', JSON.stringify(existingOrders));

    setOrderPlaced(true);
    setTimeout(() => {
      setOrderPlaced(false);
      setQuantities({ milk: 0, paneer: 0 });
      setCustomerName('');
      setCustomerPhone('');
      setCustomerAddress('');
    }, 3000);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Order Fresh Dairy Products
          </h1>
          <p className="text-xl text-gray-600">
            Select your products and get them delivered fresh to your doorstep
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-8 bg-white rounded-3xl shadow-2xl border-2 border-blue-100"
              >
                <div className="text-7xl mb-4 text-center">{product.emoji}</div>
                <h3 className="text-3xl font-bold mb-2 text-gray-800 text-center">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 text-center">{product.description}</p>
                <p className="text-2xl font-bold text-blue-600 mb-6 text-center">
                  ₹{product.price}/{product.unit}
                </p>

                {/* Quantity Control Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(product.id, -1)}
                    className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-blue-600 font-bold text-xl cursor-pointer"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>

                  <div className="w-24 text-center">
                    <div className="text-4xl font-bold text-gray-800">
                      {quantities[product.id] || 0}
                    </div>
                    <div className="text-sm text-gray-500">{product.unit}(s)</div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => updateQuantity(product.id, 1)}
                    className="w-12 h-12 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center text-green-600 font-bold text-xl cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>

                {quantities[product.id] > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 text-center text-lg font-semibold text-gray-700"
                  >
                    Subtotal: ₹{(quantities[product.id] * product.price).toFixed(2)}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Details Input Forms & Checkout Calculation Panels */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-2xl border-2 border-blue-100 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delivery Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:border-blue-500 text-gray-800 text-sm"
                    placeholder="Enter full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:border-blue-500 text-gray-800 text-sm"
                    placeholder="10-digit mobile number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Drop Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    rows={2}
                    className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:border-blue-500 text-gray-800 text-sm resize-none"
                    placeholder="House Number, Street, Area..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Order Summary Summary Panel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 p-8 bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl shadow-2xl border-2 border-blue-200"
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {products.map((product) => (
                  quantities[product.id] > 0 && (
                    <div key={product.id} className="flex justify-between items-center p-4 bg-white rounded-xl">
                      <span className="text-lg font-medium text-gray-700">
                        {product.emoji} {product.name} × {quantities[product.id]} {product.unit}(s)
                      </span>
                      <span className="text-xl font-bold text-gray-800">
                        ₹{(quantities[product.id] * product.price).toFixed(2)}
                      </span>
                    </div>
                  )
                ))}
              </div>

              <div className="border-t-2 border-blue-300 pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-800">Total Amount:</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    ₹{calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: calculateTotal() > 0 ? 1.03 : 1, y: calculateTotal() > 0 ? -3 : 0 }}
                whileTap={{ scale: calculateTotal() > 0 ? 0.97 : 1 }}
                onClick={handlePlaceOrder}
                disabled={calculateTotal() === 0 || orderPlaced}
                className={`w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all cursor-pointer ${
                  calculateTotal() > 0 && !orderPlaced
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-2xl hover:shadow-3xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {orderPlaced ? (
                  <>
                    <Check className="w-6 h-6" />
                    Order Placed Successfully!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Place Order
                  </>
                )}
              </motion.button>

              {orderPlaced && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 bg-green-100 border-2 border-green-400 rounded-xl text-center"
                >
                  <p className="text-lg font-semibold text-green-800">
                    🎉 Thank you for your order! We'll deliver fresh products to your doorstep soon.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Delivery Details Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl text-center"
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Delivery Information</h3>
            <div className="grid md:grid-cols-3 gap-6 text-gray-600">
              <div>
                <div className="text-3xl mb-2">🚚</div>
                <p className="font-semibold">Free Delivery</p>
                <p className="text-sm">On orders above ₹200</p>
              </div>
              <div>
                <div className="text-3xl mb-2">⏰</div>
                <p className="font-semibold">Early Morning</p>
                <p className="text-sm">Delivered by 7 AM</p>
              </div>
              <div>
                <div className="text-3xl mb-2">❄️</div>
                <p className="font-semibold">Fresh & Cold</p>
                <p className="text-sm">Maintained at 4°C</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}