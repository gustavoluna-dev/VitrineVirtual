import { Button } from "@/Components/ui/button"
import { Play } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] bg-[#0a0a0a] flex items-center">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://placehold.co/1920x600/1a1a1a/333333?text=Pool+Cues+Image" 
          alt="Pool cues background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent"></div>
      </div>

      <div className="relative z-10 px-12 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase italic mb-6">
          A PRECISÃO QUE <br/> <span className="text-orange-500">DEFINE</span> SEU JOGO.
        </h1>
        <p className="text-gray-300 mb-8 max-w-lg text-sm md:text-base leading-relaxed">
          Tacos de bilhar artesanais, feitos com materiais nobres, equilíbrio perfeito e acabamento impecável. <br/>
          Para jogadores que valorizam performance e identidade.
        </p>
        
        <div className="flex items-center gap-6">
          <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-none font-bold uppercase tracking-wider px-6 h-12 bg-transparent cursor-pointer">
            Conheça nossos tacos <span className="ml-2">&gt;</span>
          </Button>
          <button className="flex items-center gap-2 text-white hover:text-orange-400 font-medium uppercase text-sm group cursor-pointer">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-500 group-hover:border-orange-400 transition-colors">
              <Play className="w-4 h-4 ml-1" />
            </span>
            Assista ao vídeo
          </button>
        </div>
      </div>
    </section>
  )
}
