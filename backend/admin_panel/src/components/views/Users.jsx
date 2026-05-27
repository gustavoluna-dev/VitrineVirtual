import React from 'react'

export default function UsuariosView() {
  const users = [
    { id: 1, name: 'Mateus Silva', email: 'mateus@exemplo.com', role: 'Administrador', status: 'Ativo' },
    { id: 2, name: 'Ana Oliveira', email: 'ana@exemplo.com', role: 'Editor', status: 'Ativo' },
    { id: 3, name: 'Pedro Santos', email: 'pedro@exemplo.com', role: 'Visualizador', status: 'Pendente' },
    { id: 4, name: 'Carla Rocha', email: 'carla@exemplo.com', role: 'Editor', status: 'Inativo' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-slate-800">Gerenciamento de Usuários</h4>
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors duration-200 flex items-center gap-2 cursor-pointer shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Adicionar Usuário
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">E-mail</th>
              <th className="py-3 px-4">Cargo</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm text-slate-700 font-medium">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/55 transition-all">
                <td className="py-4 px-4 font-bold text-slate-900">{user.name}</td>
                <td className="py-4 px-4 text-slate-500">{user.email}</td>
                <td className="py-4 px-4">{user.role}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' :
                    user.status === 'Pendente' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-right space-x-2">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1 cursor-pointer">Editar</button>
                  <button className="text-slate-400 hover:text-rose-600 transition-colors p-1 cursor-pointer">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}