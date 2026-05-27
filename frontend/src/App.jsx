import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Categories from './components/categories/Categories'
import Features from './components/features/Features'
import ContactSection from './components/contact/ContactSection'

function App() {
  return (
    <div className="min-h-screen font-sans bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <Categories />
      <Features />
      <ContactSection />
    </div>
  )
}

export default App
