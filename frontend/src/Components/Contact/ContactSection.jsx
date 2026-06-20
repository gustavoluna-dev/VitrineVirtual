import { MessageCircle, Camera } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contato" className="bg-[#0a0a0a] text-white py-20 px-8 border-t-[8px] border-[#0a0a0a]">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        
        <h2 className="text-3xl font-bold uppercase mb-4 tracking-wider">VAMOS CONVERSAR?</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Tem interesse em um taco ou quer conhecer nossos produtos de perto? Fale diretamente com a gente.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <a 
            href="https://wa.me/5511961924104" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border border-gray-600 text-white hover:bg-gray-800 hover:text-white rounded-none font-bold uppercase px-8 py-5 flex items-center gap-2 bg-transparent cursor-pointer transition-colors"
          >
            <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
          </a>
          <a 
            href="https://www.instagram.com/normithtacos/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border border-gray-600 text-white hover:bg-gray-800 hover:text-white rounded-none font-bold uppercase px-8 py-5 flex items-center gap-2 bg-transparent cursor-pointer transition-colors"
          >
            <Camera className="w-5 h-5" /> Nosso Instagram
          </a>
        </div>

      </div>
    </section>
  )
}
