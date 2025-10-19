import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="from-python-blue to-python-electric hover:shadow-python-blue/50 fixed right-4 bottom-4 z-50 flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-gradient-to-r p-3 text-white shadow-lg transition-all duration-300 sm:right-8 sm:bottom-8 sm:p-3"
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ArrowUp size={20} className="sm:h-5 sm:w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop
