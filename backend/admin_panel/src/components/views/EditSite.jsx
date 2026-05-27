import React from 'react'

export default function EditeSiteView() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 animate-fade-in max-w-2xl">
      <h4 className="text-lg font-bold text-slate-800 mb-2">Configurações Gerais do Site</h4>
      <p className="text-xs text-slate-400 font-medium mb-6">Personalize os dados de apresentação da sua vitrine</p>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Nome da Loja</label>
          <input 
            type="text" 
            defaultValue="Vitrine Virtual IFSP" 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Descrição Institucional</label>
          <textarea 
            rows="3" 
            defaultValue="A melhor vitrine online para expor produtos locais e impulsionar suas vendas regionais de forma simples." 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail de Contato</label>
            <input 
              type="email" 
              defaultValue="contato@vitrineifsp.com.55" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone Comercial</label>
            <input 
              type="text" 
              defaultValue="(11) 98765-4321" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
            Cancelar
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  )
}