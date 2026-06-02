import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Phone } from "lucide-react"
import logo from "@/assets/logoNavbar.png"
import WhatsappLogo from "@/assets/WhatsApp.png"
import InstagramLogo from "@/assets/Instagram.png"

export default function Navbar({ setCurrentPage, currentPage }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Controla o background e altura da Navbar no Scroll
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

  // Fecha a mini página de contato se o usuário clicar fora dela
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsContactOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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
    <nav className={`fixed top-0 left-0 z-50 w-full bg-[#0a0a0a]/95 backdrop-blur-md text-white px-8 flex items-center justify-between border-b border-white/10 transition-all duration-300 ${
      isScrolled ? "h-16 shadow-lg shadow-black/20" : "h-24"
    }`}>
      
      {/* Logo (Canto Esquerdo) */}
      <button 
        onClick={() => navigateTo('home')} 
        className={`flex items-center gap-2 cursor-pointer bg-transparent border-none text-left transition-all duration-300 ${
          isScrolled ? "min-h-[60px]" : "min-h-[80px]"
        }`}
      >
        <img 
          src={logo} 
          alt="Logo" 
          className="w-70 h-auto object-contain" />
      </button>
      
      {/* Menu Central (Forçado no centro exato da tela) */}
      <div className="hidden md:flex items-center gap-6 text-sm font-medium absolute left-1/2 -translate-x-1/2 h-full">
        <button 
          onClick={() => navigateTo('home')} 
          className={`pb-1 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold border-b-2 ${
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
      </div>

      {/* Botão Interativo com Mini Página Flutuante (Canto Direito) */}
      <div className="relative flex items-center h-full" ref={dropdownRef}>
        <button 
          onClick={() => setIsContactOpen(!isContactOpen)}
          className="flex items-center gap-2 border-b-2 border-orange-500 hover:border-white pb-1 text-white hover:text-orange-500 transition-all font-bold uppercase text-sm tracking-wider cursor-pointer bg-transparent border-t-0 border-x-0"
        >
          <span>Contato</span>
          <span className={`text-[10px] transition-transform duration-300 ${isContactOpen ? 'rotate-180 text-orange-500' : 'text-gray-400'}`}>
            ▼
          </span>
        </button>

        {/* Mini Página Flutuante */}
        {isContactOpen && (
          <div className="absolute right-0 top-[120%] w-72 bg-[#121212] border border-white/10 rounded-2xl p-4 shadow-2xl z-50 transition-all duration-200">
            
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 border-b border-white/5 pb-2">
              Canais de Atendimento
            </p>

            <div className="flex flex-col gap-3">
              {/* Card Instagram */}
              <a 
                href="https://www.instagram.com/normithtacos/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20 transition-all group"
              >
                <img 
                  src={InstagramLogo} 
                  alt="Instagram" 
                  className="w-15 h-15 object-contain group-hover:scale-105 transition-transform" 
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white group-hover:text-orange-500 transition-colors">Instagram</span>
                  <span className="text-[10px] text-gray-400 font-medium">@normithtacos</span>
                </div>
              </a>

              {/* Card WhatsApp */}
              <a 
                href="https://wa.me/5511961924104" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20 transition-all group"
              >
                <img 
                  src={WhatsappLogo} 
                  alt="WhatsApp" 
                  className="w-15 h-15 object-contain group-hover:rotate-12 transition-transform" 
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white group-hover:text-orange-500 transition-colors">WhatsApp</span>
                  <span className="text-[10px] text-gray-400 font-medium">Fale Direto Conosco</span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>

    </nav>
  )
}