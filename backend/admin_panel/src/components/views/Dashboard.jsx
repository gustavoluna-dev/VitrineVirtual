import React from 'react'

export default function DashboardView() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Grade de 3 Colunas de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total de Acessos */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              {/* Ícone de Acessos (Gráfico de Linha) */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              +12.5%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-sm text-slate-500 font-medium">Total de Acessos</span>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">34.200</h3>
          </div>
        </div>

        {/* Card 2: Tacos mais clicados */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              {/* Ícone de Usuários */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              +8.2%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-sm text-slate-500 font-medium">Tacos mais clicados</span>
            <div className="space-y-1.5 mt-2">
              <div className="flex justify-between text-sm"><span className="font-semibold text-slate-700">Taco 1</span> <span className="text-slate-500">3.420</span></div>
              <div className="flex justify-between text-sm"><span className="font-semibold text-slate-700">Taco 2</span> <span className="text-slate-500">2.891</span></div>
              <div className="flex justify-between text-sm"><span className="font-semibold text-slate-700">Taco 3</span> <span className="text-slate-500">2.121</span></div>
            </div>
          </div>
        </div>

        {/* Card 3: Estado que Mais Acessou */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
              {/* Ícone de Pin de Localização */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              +15%
            </span>
          </div>
          <div className="mt-4">
            <span className="text-sm text-slate-500 font-medium">Estado que Mais Acessou</span>
            <div className="space-y-1.5 mt-2">
              <div className="flex justify-between text-sm"><span className="text-slate-700 font-medium"><span className="text-blue-600 font-bold">1º</span> São Paulo</span> <span className="text-slate-500">8.542</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-700 font-medium"><span className="text-blue-600 font-bold">2º</span> Rio de Janeiro</span> <span className="text-slate-500">5.231</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-700 font-medium"><span className="text-blue-600 font-bold">3º</span> Minas Gerais</span> <span className="text-slate-500">4.890</span></div>
            </div>
          </div>
        </div>

      </div>

      {/* Gráfico 1: Gráfico de Acessos (Últimos 7 dias) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <h4 className="text-lg font-bold text-slate-800">Gráfico de Acessos</h4>
        <p className="text-xs text-slate-400 font-medium mb-6">Últimos 7 dias</p>
        
        {/* Renderização de barras puras responsivas via CSS Flexbox */}
        <div className="h-64 flex items-end justify-between gap-2 md:gap-4 px-2 border-b border-slate-100 pb-2">
          {[
            { label: 'Seg', val: 4200, h: '50%' },
            { label: 'Ter', val: 5100, h: '62%' },
            { label: 'Qua', val: 4800, h: '58%' },
            { label: 'Qui', val: 6300, h: '76%' },
            { label: 'Sex', val: 8000, h: '98%' },
            { label: 'Sáb', val: 3400, h: '40%' },
            { label: 'Dom', val: 2900, h: '35%' },
          ].map((bar, index) => (
            <div key={index} className="flex-1 flex flex-col items-center group cursor-pointer">
              {/* Tooltip ao passar o mouse */}
              <div className="opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs px-2 py-1 rounded-md mb-2 transition-all duration-200 shadow-md transform -translate-y-1">
                {bar.val.toLocaleString()}
              </div>
              <div 
                style={{ height: bar.h }} 
                className="w-full bg-blue-500 rounded-t-lg group-hover:bg-blue-600 transition-all duration-300"
              ></div>
              <span className="text-xs font-semibold text-slate-400 mt-2 block">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico 2: Tendência de Crescimento */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
        <h4 className="text-lg font-bold text-slate-800">Tendência de Crescimento</h4>
        <p className="text-xs text-slate-400 font-medium mb-6">Evolução mensal</p>
        
        {/* Gráfico Linear usando um elemento SVG suave */}
        <div className="relative w-full h-48">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Linha de preenchimento inferior */}
            <path 
              d="M0 80 Q 116 65, 233 70 T 466 20 T 700 95 L 700 100 L 0 100 Z" 
              fill="url(#gradient)" 
            />
            {/* Linha principal azul */}
            <path 
              d="M0 80 Q 116 65, 233 70 T 466 20 T 700 95" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="3.5" 
              strokeLinecap="round"
            />
            {/* Pontos chave de destaque (Marcadores) */}
            <circle cx="0" cy="80" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
            <circle cx="233" cy="70" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
            <circle cx="466" cy="20" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
            <circle cx="700" cy="95" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  )
}