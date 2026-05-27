import { Button } from "@/components/ui/button"
import { Camera, Phone } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0a0a0a] text-white py-4 px-8 flex items-center justify-between border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-black italic">N</div>
        <span className="font-bold text-xl tracking-wider uppercase">Normith</span>
      </div>
      
      <div className="hidden md:flex items-center gap-6 text-sm font-medium">
        <a href="#" className="text-orange-500 border-b-2 border-orange-500 pb-1">INÍCIO</a>
        <a href="#" className="hover:text-orange-400 transition-colors">TACOS</a>
        <a href="#" className="hover:text-orange-400 transition-colors">SOBRE A NORMITH</a>
        <a href="#" className="hover:text-orange-400 transition-colors">PERSONALIZE SEU TACO</a>
        <a href="#" className="hover:text-orange-400 transition-colors">CONTATO</a>
      </div>

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
