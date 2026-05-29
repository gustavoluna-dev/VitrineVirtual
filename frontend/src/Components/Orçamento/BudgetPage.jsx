import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Lock, ArrowLeft, ClipboardList, Search, CheckCircle2, Clock, Hammer, Truck } from "lucide-react"
import { featuredTacos } from "../Data/tacos"

export default function BudgetPage({ onBack }) {
  // 'solicitar' ou 'status'
  const [activeTab, setActiveTab] = useState("solicitar")
  const [searchCode, setSearchCode] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [showStatusResult, setShowStatusResult] = useState(false)

  // Dados fictícios para simular a busca de um status
  const mockStatus = {
    codigo: "NOR-9843",
    cliente: "Arthur",
    taco: "Taco Y (Premium)",
    etapaAtual: 3, // 1: Solicitado, 2: Em Análise, 3: Em Produção, 4: Concluído
    atualizadoEm: "28/05/2026"
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchCode.trim() !== "") {
      setShowStatusResult(true)
    }
  }

  return (
    <section className="bg-[#0a0a0a] text-white min-h-screen py-16 px-8 flex flex-col justify-center items-center">
      <div className="max-w-4xl w-full">
        
        {/* Botão de Voltar */}
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-500 mb-8 font-bold uppercase text-sm transition-colors cursor-pointer bg-transparent border-none"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Início
          </button>
        )}

        {/* CONTEÚDO 1: FORMULÁRIO DE SOLICITAÇÃO */}
        {activeTab === "solicitar" && (
          <div className="bg-[#f4f1ea] text-[#0a0a0a] p-8 md:p-12 rounded-lg shadow-lg w-full animate-fadeIn">
            <h2 className="font-bold text-2xl md:text-3xl uppercase mb-2 text-center text-black">
              Solicite seu Orçamento Personalizado
            </h2>
            <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
              Preencha as especificações abaixo para montarmos o taco ideal para você.
            </p>
            
            <form className="space-y-6">
              {/* Dados Pessoais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Seu Nome</label>
                  <Input placeholder="Ex: Arthur" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Seu E-mail</label>
                  <Input placeholder="Ex: nome@email.com" type="email" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">WhatsApp</label>
                  <Input placeholder="(00) 00000-0000" type="tel" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
                </div>
              </div>

              {/* Especificações do Taco */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Modelo do Taco</label>
                  <select
                    value={selectedModel}
                    onChange={(event) => setSelectedModel(event.target.value)}
                    className="flex h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <option value="">Selecione um modelo...</option>
                    {featuredTacos.map((taco) => (
                      <option key={taco.id} value={taco.name}>
                        {taco.name} ({taco.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Peso Desejado</label>
                  <select className="flex h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
                    <option value="">Selecione o peso estimado...</option>
                    <option value="490-520">490g a 520g</option>
                    <option value="520-540">520g a 540g</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Tamanho (Comprimento)</label>
                  <select className="flex h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
                    <option value="">Selecione o tamanho...</option>
                    <option value="1.45">1,45m</option>
                    <option value="1.50">1,50m</option>
                  </select>
                </div>
              </div>
              
              {/* Detalhes */}
              <div className="flex flex-col gap-1 border-t border-gray-200 pt-6">
                <label className="text-xs font-bold uppercase text-gray-700">Detalhes ou Observações</label>
                <Textarea 
                  placeholder="Fale mais sobre personalizações, tipo de virola, sola ou cores que deseja..." 
                  className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500 min-h-[120px] resize-none" 
                />
              </div>
              
              {/* Rodapé */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Lock className="w-3 h-3" />
                  <span>Seus dados estão protegidos.</span>
                </div>
                <Button type="button" className="bg-[#0a0a0a] hover:bg-black text-white rounded-none font-bold uppercase px-8 py-6 w-full sm:w-auto cursor-pointer">
                  Enviar Orçamento &rarr;
                </Button>
              </div>
            </form>
          </div>
        )}

      </div>
    </section>
  )
}