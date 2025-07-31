import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="relative">
        {children}
      </main>
    </div>
  )
}

export default Layout
