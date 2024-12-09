import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

type ToastProps = {
  show: boolean;
  message: string;
};

export const Toast = ({ show, message }: ToastProps) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
        >
          <CheckCircle className="w-5 h-5 text-green-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};