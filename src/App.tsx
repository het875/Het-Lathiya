import Navigation from './components/layout/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
