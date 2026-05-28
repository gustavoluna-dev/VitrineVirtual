import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Lock, ArrowLeft, ClipboardList, Search, CheckCircle2, Clock, Hammer, Truck } from "lucide-react"

export default function BudgetPage({ onBack }) {
  // 'solicitar' ou 'status'
  const [activeTab, setActiveTab] = useState("solicitar")
  const [searchCode, setSearchCode] = useState("")
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

        {/* Abas de Navegação Internas */}
        <div className="flex border-b border-white/10 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab("solicitar")}
            className={`flex-1 py-3 text-center font-bold uppercase text-sm transition-all cursor-pointer border-none bg-transparent ${
              activeTab === "solicitar" 
                ? "text-orange-500 border-b-2 border-orange-500" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Solicitar Orçamento
          </button>
          <button
            onClick={() => setActiveTab("status")}
            className={`flex-1 py-3 text-center font-bold uppercase text-sm transition-all cursor-pointer border-none bg-transparent ${
              activeTab === "status" 
                ? "text-orange-500 border-b-2 border-orange-500" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            Acompanhar Status
          </button>
        </div>

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
                  <select className="flex h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
                    <option value="">Selecione um modelo...</option>
                    <option value="taco-x">Taco X (Madeira Tradicional)</option>
                    <option value="taco-y">Taco Y (Premium)</option>
                    <option value="outro">Outro (Especificar abaixo)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Peso Desejado</label>
                  <Input placeholder="Ex: 510g a 540g" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold uppercase text-gray-700">Tamanho (Comprimento)</label>
                  <Input placeholder="Ex: 1,45m" className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500" />
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

        {/* CONTEÚDO 2: ACOMPANHAR STATUS */}
        {activeTab === "status" && (
          <div className="bg-[#f4f1ea] text-[#0a0a0a] p-8 md:p-12 rounded-lg shadow-lg w-full animate-fadeIn">
            <h2 className="font-bold text-2xl md:text-3xl uppercase mb-2 text-center text-black flex items-center justify-center gap-2">
              <ClipboardList className="w-8 h-8 text-orange-500" /> Acompanhar Pedido
            </h2>
            <p className="text-gray-600 text-center mb-8 text-sm md:text-base">
              Insira o código do seu orçamento para rastrear o andamento da sua fabricação.
            </p>

            {/* Campo de Busca */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 mb-10">
              <Input 
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Ex: NOR-9843" 
                className="bg-white border-gray-300 rounded-sm focus-visible:ring-orange-500 uppercase font-mono font-bold"
              />
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-none font-bold uppercase px-6 cursor-pointer">
                <Search className="w-4 h-4 mr-2" /> Buscar
              </Button>
            </form>

            {/* Linha do Tempo do Status (Aparece após o submit) */}
            {showStatusResult ? (
              <div className="border-t border-gray-200 pt-6 max-w-xl mx-auto">
                <div className="bg-white p-4 rounded border border-gray-200 mb-8 flex justify-between text-sm shadow-sm">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold">Código do Orçamento</p>
                    <p className="font-mono font-bold text-base text-orange-500">{mockStatus.codigo}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold">Produto</p>
                    <p className="font-bold text-black">{mockStatus.taco}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase font-bold">Última Atualização</p>
                    <p className="font-medium">{mockStatus.atualizadoEm}</p>
                  </div>
                </div>

                {/* Fluxo Visual das Etapas */}
                <div className="relative pl-8 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[15px] before:w-0.5 before:bg-gray-300">
                  
                  {/* Etapa 1 */}
                  <div className="relative">
                    <span className={`absolute -left-[31px] top-0 rounded-full w-8 h-8 flex items-center justify-center z-10 ${mockStatus.etapaAtual >= 1 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                    <h4 className={`font-bold text-sm uppercase ${mockStatus.etapaAtual >= 1 ? 'text-green-600' : 'text-gray-400'}`}>1. Proposta Recebida</h4>
                    <p className="text-xs text-gray-500">Recebemos suas especificações e o orçamento foi gerado.</p>
                  </div>

                  {/* Etapa 2 */}
                  <div className="relative">
                    <span className={`absolute -left-[31px] top-0 rounded-full w-8 h-8 flex items-center justify-center z-10 ${
                      mockStatus.etapaAtual > 2 ? 'bg-green-600 text-white' : mockStatus.etapaAtual === 2 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      <Clock className="w-5 h-5" />
                    </span>
                    <h4 className={`font-bold text-sm uppercase ${mockStatus.etapaAtual >= 2 ? 'text-black' : 'text-gray-400'}`}>2. Em Análise Técnica</h4>
                    <p className="text-xs text-gray-500">Nossa equipe de artesãos está validando a viabilidade das madeiras e medidas.</p>
                  </div>

                  {/* Etapa 3 */}
                  <div className="relative">
                    <span className={`absolute -left-[31px] top-0 rounded-full w-8 h-8 flex items-center justify-center z-10 ${
                      mockStatus.etapaAtual > 3 ? 'bg-green-600 text-white' : mockStatus.etapaAtual === 3 ? 'bg-orange-500 text-white animate-pulse' : 'bg-gray-300 text-gray-600'
                    }`}>
                      <Hammer className="w-5 h-5" />
                    </span>
                    <h4 className={`font-bold text-sm uppercase ${mockStatus.etapaAtual >= 3 ? 'text-black font-extrabold' : 'text-gray-400'}`}>
                      3. Na Bancada (Em Fabricação) {mockStatus.etapaAtual === 3 && <span className="text-xs text-orange-600 lowercase font-normal">(etapa atual)</span>}
                    </h4>
                    <p className="text-xs text-gray-500">Seu taco personalizado está sendo esculpido, balanceado e recebendo acabamento.</p>
                  </div>

                  {/* Etapa 4 */}
                  <div className="relative">
                    <span className={`absolute -left-[31px] top-0 rounded-full w-8 h-8 flex items-center justify-center z-10 ${mockStatus.etapaAtual === 4 ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                      <Truck className="w-5 h-5" />
                    </span>
                    <h4 className={`font-bold text-sm uppercase ${mockStatus.etapaAtual === 4 ? 'text-green-600' : 'text-gray-400'}`}>4. Pronto para Envio / Retirada</h4>
                    <p className="text-xs text-gray-500">O controle de qualidade foi aprovado e o produto está pronto para envio.</p>
                  </div>

                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8 border-t border-dashed border-gray-300 text-xs">
                Nenhum código consultado ainda.
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  )
}