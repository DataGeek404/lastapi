import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function MpesaForm() {
  return (
    <motion.div
      className="flex justify-center mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img
        src="/src/assetsScreenshot from 2025-05-22 14-53-50.png/"
        alt="MPESA Donation QR Code"
        className="w-64 h-64 object-contain"
      />
    </motion.div>
  );
}
