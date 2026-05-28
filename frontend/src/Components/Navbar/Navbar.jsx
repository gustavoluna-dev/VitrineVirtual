import { Button } from "@/components/ui/button"
import { Camera, Phone } from "lucide-react"

export default function Navbar({ setCurrentPage, currentPage }) {
  return (
    <nav className="w-full bg-[#0a0a0a] text-white py-4 px-8 flex items-center justify-between border-b border-white/10">
      
      {/* Logo */}
      <button 
        onClick={() => setCurrentPage('home')} 
        className="flex items-center gap-2 cursor-pointer bg-transparent border-none text-left"
      >
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-black italic">N</div>
        <span className="font-bold text-xl tracking-wider uppercase text-white">Normith</span>
      </button>
      
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <button 
          onClick={() => setCurrentPage('home')} 
          className={`pb-1 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold h-full border-b-2 ${
            currentPage === 'home' ? 'text-orange-500 border-orange-500' : 'text-white border-transparent hover:text-orange-400'
          }`}
        >
          INÍCIO
        </button>
        
        <button className="pb-1 text-white border-b-2 border-transparent hover:text-orange-400 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold">
          TACOS
        </button>
        
        <button className="pb-1 text-white border-b-2 border-transparent hover:text-orange-400 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold">
          SOBRE A NORMITH
        </button>
        
        <button 
          onClick={() => setCurrentPage('orcamento')} 
          className={`pb-1 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold border-b-2 ${
            currentPage === 'orcamento' ? 'text-orange-500 border-orange-500' : 'text-white border-transparent hover:text-orange-400'
          }`}
        >
          ORÇAMENTO
        </button>
        
        <button className="pb-1 text-white border-b-2 border-transparent hover:text-orange-400 transition-all cursor-pointer bg-transparent border-none uppercase tracking-wider font-bold">
          CONTATO
        </button>
      </div>

      {/* Ícones da Direita */}
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-orange-400"><Camera className="w-5 h-5" /></a>
        <a href="#" className="hover:text-orange-400"><Phone className="w-5 h-5" /></a>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none font-bold uppercase text-xs px-6 cursor-pointer">
          Falar Conosco
        </Button>
      </div>
    </nav>
  )
}