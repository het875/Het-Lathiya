import React from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black font-sans text-white">
      <Navigation />

      <main className="relative">{children}</main>
    </div>
  )
}

export default Layout
