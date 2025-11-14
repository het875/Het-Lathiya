import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import SkillAwards from './components/sections/SkillAwards'
import Achievements from './components/sections/Achievements'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <SkillAwards />
      <Achievements />
      <Contact />
      <Footer />
      <ScrollToTop />
    </Layout>
  )
}

export default App
