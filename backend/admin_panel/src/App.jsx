import React, { useState } from 'react'

// Importa os Componentes Globais de Layout
import Sidebar from './components/templates/Sidebar'

// Importa as Visualizações Dinâmicas (Views)
import DashboardView from './components/views/Dashboard'
import UsuariosView from './components/views/Users'
import EditeSiteView from './components/views/EditSite'
import AtividadesView from './components/views/Activities'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

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
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              {pageTitles[activeTab]?.title}
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-1">
              {pageTitles[activeTab]?.subtitle}
            </p>
          </div>

          {/* Botão Hambúrguer de Controle da Barra Lateral */}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2.5 hover:bg-slate-50 text-slate-600 rounded-xl transition-all cursor-pointer border border-slate-100 hover:border-slate-200"
            aria-label="Alternar menu lateral"
            title="Alternar menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
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