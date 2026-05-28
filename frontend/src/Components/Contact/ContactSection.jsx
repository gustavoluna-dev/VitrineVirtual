import { Button } from "@/components/ui/button"
import { MessageCircle, Camera } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contato" className="bg-[#0a0a0a] text-white py-20 px-8 border-t-[8px] border-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        
        <h2 className="text-3xl font-bold uppercase mb-4 tracking-wider">VAMOS CONVERSAR?</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Tem dúvidas, quer conhecer nossos produtos de perto ou prefere um atendimento direto? Fale com a gente agora mesmo.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none font-bold uppercase px-8 py-6 flex items-center gap-2 cursor-pointer transition-colors">
            <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
          </Button>
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 hover:text-white rounded-none font-bold uppercase px-8 py-6 flex items-center gap-2 bg-transparent cursor-pointer transition-colors">
            <Camera className="w-5 h-5" /> Nosso Instagram
          </Button>
        </div>

      </div>
    </section>
  )
}