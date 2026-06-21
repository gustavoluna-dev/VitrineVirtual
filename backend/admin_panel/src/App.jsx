import React, { useState, useEffect } from 'react'

// Importa os Componentes Globais de Layout
import Sidebar from './components/templates/Sidebar'

// Importa as Visualizações Dinâmicas (Views)
import DashboardView from './components/views/Dashboard'
import UsuariosView from './components/views/Users'
import EditeSiteView from './components/views/EditSite'
import AtividadesView from './components/views/Activities'

export default function App() {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('adminActiveTab') || 'dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  // Mapeamento dos títulos dinâmicos de acordo com a página selecionada
  const pageTitles = {
    dashboard: {
      title: 'Visão Geral',
      subtitle: 'Acompanhe as métricas principais do sistema'
    },
    usuarios: {
      title: 'Usuários',
      subtitle: 'Gerencie as permissões e contas de acesso'
    },
    'edite-site': {
      title: 'Edite o Site',
      subtitle: 'Personalize o visual e textos expostos na vitrine'
    },
    atividades: {
      title: 'Atividades',
      subtitle: 'Histórico de ações e eventos do sistema em tempo real'
    }
  };

  // Função auxiliar para renderizar a página correta sob demanda
  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'usuarios':
        return <UsuariosView />;
      case 'edite-site':
        return <EditeSiteView />;
      case 'atividades':
        return <AtividadesView />;
      default:
        return <DashboardView />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Componente da Barra Lateral (Sidebar) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* Área Principal de Conteúdo do Painel */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Cabeçalho Superior (Header) */}
        <header className="bg-white border-b border-slate-100 py-6 px-8 flex justify-between items-center sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight" style={{ color: '#1e293b'}}>
              {pageTitles[activeTab]?.title}
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-1">
              {pageTitles[activeTab]?.subtitle}
            </p>
          </div>

          {/* Botão de Sair (Logout) */}
          <button 
            onClick={() => console.log('Logout placeholder - to be implemented')}
            className="p-2.5 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl transition-all cursor-pointer border border-slate-100 hover:border-rose-100"
            aria-label="Sair do sistema"
            title="Sair do sistema"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
            </svg>
          </button>
        </header>

        {/* Corpo Interno da Página */}
        <main className="flex-1 p-8 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  )
}