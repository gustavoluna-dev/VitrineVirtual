import { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import Categories from './components/categories/Categories'
import Features from './components/features/Features'
import ContactSection from './components/contact/ContactSection'
import BudgetPage from './components/Orçamento/BudgetPage' 

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="min-h-screen font-sans bg-[#0a0a0a]">
      {/* O Navbar precisa dessas propriedades para controlar a troca de telas */}
      <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />

      {currentPage === 'home' ? (
        <>
          <Hero />
          <Categories />
          <Features />
          <ContactSection />
        </>
      ) : (
        <BudgetPage onBack={() => setCurrentPage('home')} />
      )}
    </div>
  )
}

export default App