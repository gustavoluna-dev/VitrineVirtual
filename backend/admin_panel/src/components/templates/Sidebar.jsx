import React from 'react'
import logoNormith from '../../assets/Logo_Original_icon.png'

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
  
  // Array de navegação contendo os IDs, Rótulos e os SVGs puros correspondentes
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      )
    },
    {
      id: 'usuarios',
      label: 'Usuários',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: 'edite-site',
      label: 'Edite o Site',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      id: 'atividades',
      label: 'Atividades',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ]

  // Função interna que trata o clique no menu
  const handleItemClick = (tabId) => {
    setActiveTab(tabId);
    setIsCollapsed(true); // Retrai a barra lateral após clicar, mostrando apenas ícones!
  }

  return (
    <aside 
      className={`h-screen bg-white border-r border-slate-100 flex flex-col justify-between py-6 transition-all duration-300 ease-in-out fixed left-0 top-0 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col gap-8">
        {/* Cabeçalho da Sidebar (Logo) */}
        <div className={`px-6 flex flex-col transition-opacity duration-200 ${
          isCollapsed ? 'items-center' : 'items-start'
        }`}>
          {isCollapsed ? (
            /* Logo compacta quando retraído */
            <div className="w-10 h-10 bg-black-600 rounded-xl flex items-center justify-center text-black font-black shadow-black text-xl shadow-xs">
              N
            </div>
          ) : (
            /* Logo da Normith quando a Sidebar é expandida */
            <>
              <img src={logoNormith} alt='Logo do Site' className='w-38 h-20 items-center justify-center ml-5 mt-5' />
            </>
          )}
        </div>

        {/* Menu de Opções de Navegação */}
        <nav className="flex flex-col gap-1.5 px-3">
          {navigationItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                title={isCollapsed ? item.label : ''} // Exibe tooltip se encolhido
                className={`flex items-center gap-4 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-xs' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                } ${isCollapsed ? 'justify-center' : 'justify-start'}`}
              >
                {/* Ícone */}
                <div className={`transition-transform duration-200 ${isActive ? 'scale-105' : ''}`}>
                  {item.icon}
                </div>
                
                {/* Rótulo de Texto (Ocultado suavemente se estiver colapsado) */}
                {!isCollapsed && (
                  <span className="transition-opacity duration-200 whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Botão de Rodapé para Expansão Manual se necessário */}
      <div className="px-3">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`w-full flex items-center gap-4 py-3 px-4 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-700 font-semibold text-sm transition-all cursor-pointer ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
        >
          <svg className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!isCollapsed && <span className="whitespace-nowrap">Recolher</span>}
        </button>
      </div>
    </aside>
  )
}