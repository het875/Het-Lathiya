import React, { useState } from 'react'
import Navigation from './Navigation'
import PageReveal from '../common/PageReveal'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showReveal, setShowReveal] = useState(true)
  const [revealComplete, setRevealComplete] = useState(false)

  const handleRevealComplete = () => {
    setShowReveal(false)
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setRevealComplete(true)
    }, 100)
  }

  return (
    <>
      {/* Premium Page Reveal Animation */}
      {showReveal && <PageReveal onComplete={handleRevealComplete} />}

      {/* Main content - only render after reveal completes */}
      {revealComplete && (
        <div className="min-h-screen bg-black font-sans text-white">
          <Navigation />

          <main className="relative">{children}</main>
        </div>
      )}
    </>
  )
}

export default Layout
