import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Phone } from "lucide-react"
import logo from "@/assets/logoNavbar.png"

export default function Navbar({ setCurrentPage, currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigateTo = (page, sectionId) => {
    if (page === 'orcamento') {
      setCurrentPage('orcamento');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (sectionId) {
        if (currentPage === 'home') {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`sticky top-0 z-50 w-full bg-[#0a0a0a]/95 backdrop-blur-md text-white px-8 flex items-center justify-between border-b border-white/10 transition-all duration-300 ${
      isScrolled ? "py-2 shadow-lg shadow-black/20" : "py-4"
    }`}>
      
      {/* Logo */}
      <button 
        onClick={() => navigateTo('home')} 
        className={`flex items-center gap-2 cursor-pointer bg-transparent border-none text-left transition-all duration-300 ${
          isScrolled ? "min-h-[60px]" : "min-h-[80px]"
        }`}
      >
        <img 
          src={logo} 
          alt="Logo" 
          className={`rounded-full object-cover transition-all duration-300 ${
            isScrolled ? "w-48 h-36" : "w-70 h-50"
          }`} 
        />
      </button>
      
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button 
          onClick={() => navigateTo('home')} 
          className={`pb-1 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold h-full border-b-2 ${
            currentPage === 'home' ? 'text-orange-500 border-orange-500' : 'text-white border-transparent hover:text-orange-400'
          }`}
        >
          INÍCIO
        </button>
        
        <button 
          onClick={() => navigateTo('home', 'tacos')}
          className="pb-1 text-white border-b-2 border-transparent hover:text-orange-400 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold"
        >
          TACOS
        </button>
        
        <button 
          onClick={() => navigateTo('home', 'sobre')}
          className="pb-1 text-white border-b-2 border-transparent hover:text-orange-400 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold"
        >
          SOBRE A NORMITH
        </button>
        
        <button 
          onClick={() => navigateTo('orcamento')} 
          className={`pb-1 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold border-b-2 ${
            currentPage === 'orcamento' ? 'text-orange-500 border-orange-500' : 'text-white border-transparent hover:text-orange-400'
          }`}
        >
          ORÇAMENTO
        </button>
        
        <button 
          onClick={() => navigateTo('home', 'contato')}
          className="pb-1 text-white border-b-2 border-transparent hover:text-orange-400 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold"
        >
          CONTATO
        </button>
      </div>

      {/* Ícones da Direita */}
      <div className="flex items-center gap-4">
        <a href="https://www.instagram.com/normithtacos/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">
          <Camera className="w-5 h-5" />
        </a>
        <a href="tel:5511961924104" className="hover:text-orange-400">
          <Phone className="w-5 h-5" />
        </a>
        <a href="https://wa.me/5511961924104" target="_blank" rel="noopener noreferrer">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none font-bold uppercase text-xs px-6 cursor-pointer">
            Falar Conosco
          </Button>
        </a>
      </div>
    </nav>
  )
}