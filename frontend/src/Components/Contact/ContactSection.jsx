import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Camera, Lock } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="bg-[#0a0a0a] text-white py-16 px-8 border-t-[8px] border-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Text and Buttons */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold uppercase mb-4">VAMOS CONVERSAR?</h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Tem interesse em um taco ou quer um modelo personalizado? Fale diretamente com a gente.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none font-bold uppercase px-6 py-6 flex items-center gap-2 cursor-pointer">
              <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
            </Button>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 hover:text-white rounded-none font-bold uppercase px-6 py-6 flex items-center gap-2 bg-transparent cursor-pointer">
              <Camera className="w-5 h-5" /> Nosso Instagram
            </Button>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-[#f4f1ea] text-[#0a0a0a] p-8 rounded-lg shadow-lg relative ml-auto w-full">
          <h3 className="font-bold text-lg uppercase mb-6">SOLICITE UM ORÇAMENTO</h3>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input placeholder="Seu nome" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
              <Input placeholder="Seu e-mail" type="email" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
              <Input placeholder="WhatsApp" type="tel" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
            </div>
            
            <Textarea 
              placeholder="Fale sobre o taco que você deseja..." 
              className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500 min-h-[120px] resize-none" 
            />
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Lock className="w-3 h-3" />
                <span>Seus dados estão protegidos. Não compartilhamos suas informações.</span>
              </div>
              <Button type="button" className="bg-[#0a0a0a] hover:bg-black text-white rounded-none font-bold uppercase px-8 cursor-pointer">
                Enviar Mensagem &rarr;
              </Button>
            </div>
          </form>
        </div>

      </div>
    </section>
  )
}
