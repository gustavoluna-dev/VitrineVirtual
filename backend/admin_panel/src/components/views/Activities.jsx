import React from 'react'

export default function AtividadesView() {
  const logs = [
    { time: 'Há 5 min', action: 'Visualização de Painel', desc: 'Usuário desconhecido acessou o painel de São Paulo', iconBg: 'bg-blue-50 text-blue-600' },
    { time: 'Há 42 min', action: 'Atualização de Configurações', desc: 'Mateus Silva editou a descrição principal do site institucional', iconBg: 'bg-emerald-50 text-emerald-600' },
    { time: 'Há 2 horas', action: 'Novo Usuário Registrado', desc: 'Ana Oliveira cadastrou o editor Carla Rocha no sistema', iconBg: 'bg-purple-50 text-purple-600' },
    { time: 'Ontem', action: 'Excesso de Requisições Detectado', desc: 'Bloqueio preventivo temporário ativado no endpoint /api/v1/auth', iconBg: 'bg-rose-50 text-rose-600' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 animate-fade-in max-w-3xl">
      <h4 className="text-lg font-bold text-slate-800 mb-6">Registro Geral de Atividades</h4>
      
      <div className="relative border-l-2 border-slate-100 ml-4 pl-6 space-y-8">
        {logs.map((log, index) => (
          <div key={index} className="relative">
            {/* Bolinha Indicadora com o Ícone */}
            <span className={`absolute -left-11 top-0.5 flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-white shadow-xs ${log.iconBg}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            
            {/* Detalhes da Atividade */}
            <div>
              <span className="text-xs font-semibold text-slate-400">{log.time}</span>
              <h5 className="text-sm font-bold text-slate-800 mt-0.5">{log.action}</h5>
              <p className="text-sm text-slate-500 font-medium mt-1">{log.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}