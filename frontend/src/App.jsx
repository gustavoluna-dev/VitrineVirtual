import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero'
import ProductCarousel from './Components/ProductCarousel/ProductCarousel'
import Categories from './Components/Categories/Categories'
import Features from './Components/Features/Features'
import About from './Components/About/About'
import ContactSection from './Components/Contact/ContactSection'
import BudgetPage from './Components/Orçamento/BudgetPage' 

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen font-sans bg-[#0a0a0a]">
      {/* O Navbar precisa dessas propriedades para controlar a troca de telas */}
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />

      {currentPage === 'home' ? (
        <>
          <Hero />
          <ProductCarousel />
          <Categories />
          <Features />
          <About />
          <ContactSection />
        </>
      ) : (
        <BudgetPage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  )
}

export default App