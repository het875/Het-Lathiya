import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypingAnimationProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
  className?: string
  cursorClassName?: string
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  speed = 150,
  deleteSpeed = 100,
  pauseDuration = 2000,
  className = '',
  cursorClassName = ''
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex]
      
      if (!isDeleting) {
        // Typing phase
        if (currentText.length < fullText.length) {
          setCurrentText(fullText.substring(0, currentText.length + 1))
        } else {
          // Finished typing current text, start pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration)
          return
        }
      } else {
        // Deleting phase
        if (currentText.length > 0) {
          setCurrentText(fullText.substring(0, currentText.length - 1))
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deleteSpeed : speed
    )

    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseDuration])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className={`inline-block ml-1 ${cursorClassName}`}
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        |
      </motion.span>
    </span>
  )
}

export default TypingAnimation
