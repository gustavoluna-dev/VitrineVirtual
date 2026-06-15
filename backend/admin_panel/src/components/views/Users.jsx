import React, { useState, useEffect } from 'react';

export default function UsuariosView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({ nome: '', email: '', senha: '', tipo: 'colaborador' });
  const [showModal, setShowModal] = useState(false);

  const API_URL = 'http://localhost:5000/api/usuarios';

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Não foi possível obter os dados da API.');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NOME: formData.nome,
          EMAIL: formData.email,
          SENHA: formData.senha,
          TIPO: formData.tipo
        })
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erro ao cadastrar usuário.');

      alert('Usuário cadastrado com sucesso!');
      setFormData({ nome: '', email: '', senha: '', tipo: 'colaborador' });
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Deseja realmente excluir este usuário permanentemente?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const result = await response.json();
      
      if (!response.ok) throw new Error(result.error || 'Erro ao deletar usuário.');

      alert(result.mensagem);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-slate-500 font-semibold p-6">Carregando usuários do banco de dados...</div>;
  if (error) return <div className="text-rose-500 font-semibold p-6">Erro: {error}</div>;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-6">
      { }
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-bold text-slate-800">Gerenciamento de Usuários</h4>
        <button 
          onClick={() => setShowModal(true)} 
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer"
        >
          Adicionar Usuário
        </button>
      </div>

      { }
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase">
              <th className="py-3 px-4">Nome</th>
              <th className="py-3 px-4">E-mail</th>
              <th className="py-3 px-4">Cargo</th>
              <th className="py-3 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
            {users.map((user) => (
              <tr key={user.ID_USUARIO} className="hover:bg-slate-50/50">
                <td className="py-4 px-4 font-bold text-slate-900">{user.NOME}</td>
                <td className="py-4 px-4 text-slate-500">{user.EMAIL}</td>
                <td className="py-4 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    user.TIPO === 'admin' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.TIPO}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <button 
                    onClick={() => handleDeleteUser(user.ID_USUARIO)} 
                    className="text-rose-500 hover:text-rose-700 font-semibold text-sm cursor-pointer"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      { }
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50">
          <form onSubmit={handleAddUser} className="bg-white p-6 rounded-2xl w-full max-w-md border border-slate-100">
            <h5 className="text-lg font-bold text-slate-800 mb-4">Adicionar Novo Usuário</h5>
            
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                placeholder="Nome Completo" 
                required 
                className="border p-2 rounded-xl"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                required 
                className="border p-2 rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input 
                type="password" 
                placeholder="Senha" 
                required 
                className="border p-2 rounded-xl"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
              />
              <select 
                className="border p-2 rounded-xl"
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              >
                <option value="colaborador">Colaborador</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-500 font-semibold">Cancelar</button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold">Salvar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}