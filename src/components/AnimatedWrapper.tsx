'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

type AnimatedWrapperProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function AnimatedWrapper({ children, className = '', style = {} }: AnimatedWrapperProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
