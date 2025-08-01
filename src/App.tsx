import { useEffect, useRef } from 'react'
import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import { initializeLocomotiveScroll, destroyLocomotiveScroll } from './lib/locomotive-scroll'

function App() {
  const locomotiveScrollRef = useRef<any>(null)

  useEffect(() => {
    // Initialize Locomotive Scroll v5
    locomotiveScrollRef.current = initializeLocomotiveScroll()

    // Cleanup
    return () => {
      destroyLocomotiveScroll()
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
