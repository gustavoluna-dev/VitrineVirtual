import React, { useState, useEffect } from 'react';

export default function EditeSiteView() {
  // Estados para as configurações textuais e de imagens do site
  const [nomeLoja, setNomeLoja] = useState('');
  const [descricao, setDescricao] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [heroBanner, setHeroBanner] = useState('');
  const [galeria, setGaleria] = useState(['', '', '', '']); // 4 fotos secundárias

  // Estados de controle da interface
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeUploadTarget, setActiveUploadTarget] = useState(null); // 'hero_banner' ou 'galeria_1'...'galeria_4'
  const [modalTab, setModalTab] = useState('file'); // 'file' ou 'url'
  const [inputUrl, setInputUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  // Estados para edição dos produtos (tabela PRODUTOS)
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingGalleryIndex, setEditingGalleryIndex] = useState(0);
  const [categoriasList, setCategoriasList] = useState([]);
  const [prodId, setProdId] = useState(1);
  const [prodNome, setProdNome] = useState('');
  const [prodDescricao, setProdDescricao] = useState('');
  const [prodPreco, setProdPreco] = useState(0);
  const [prodImagemUrl, setProdImagemUrl] = useState('');
  const [prodEstoque, setProdEstoque] = useState(1);
  const [prodMadeira, setProdMadeira] = useState('');
  const [prodPeso, setProdPeso] = useState('');
  const [prodTamanho, setProdTamanho] = useState('');
  const [prodVirola, setProdVirola] = useState('');
  const [prodCategoriaId, setProdCategoriaId] = useState('');
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [productFile, setProductFile] = useState(null);
  const [productUploadLoading, setProductUploadLoading] = useState(false);

  const API_URL = 'http://localhost:5000/api/configuracoes';
  const UPLOAD_URL = 'http://localhost:5000/api/upload';

  // Carrega todas as configurações do site vindas do MySQL
  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Não foi possível obter as configurações do site.');
      const data = await response.json();

      // Mapeia os dados do banco para os estados locais
      setNomeLoja(data.nome_loja || '');
      setDescricao(data.descricao_institucional || '');
      setEmail(data.email_contato || '');
      setTelefone(data.telefone_comercial || '');
      setHeroBanner(data.hero_banner || '');
      setGaleria([
        data.galeria_1 || '',
        data.galeria_2 || '',
        data.galeria_3 || '',
        data.galeria_4 || ''
      ]);
    } catch (err) {
      console.error(err);
      alert('Erro ao carregar dados do banco de dados.');
    } finally {
      setIsLoading(false);
    }
  };

  // Abre o editor de produto para a posição correspondente (idx) da lista
  const openProductEditor = async (idx) => {
    try {
      const response = await fetch('http://localhost:5000/api/produtos');
      if (!response.ok) throw new Error('Erro ao buscar produtos.');
      const data = await response.json();
      if (data && data.length > idx) {
        const prod = data[idx];
        setProdId(prod.ID_PRODUTO);
        setProdNome(prod.NOME || '');
        setProdDescricao(prod.DESCRICAO || '');
        setProdPreco(prod.PRECO || 0);
        setProdImagemUrl(prod.IMAGEM_URL || '');
        setProdEstoque(prod.ESTOQUE || 1);
        setProdMadeira(prod.MADEIRA || '');
        setProdPeso(prod.PESO || '');
        setProdTamanho(prod.TAMANHO || '');
        setProdVirola(prod.VIROLA || '');
        setProdCategoriaId(prod.CATEGORIA_ID || '');
        
        setEditingGalleryIndex(idx);
        setIsEditingProduct(true);
      } else {
        alert(`Não há um produto correspondente no banco de dados para a posição ${idx + 1}.`);
      }
    } catch (err) {
      console.error('Erro ao carregar produto para edição:', err);
      alert('Erro ao buscar dados do produto.');
    }
  };

  // Carrega a lista de categorias do banco
  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categorias');
      if (response.ok) {
        const data = await response.json();
        setCategoriasList(data);
      }
    } catch (err) {
      console.error('Erro ao buscar categorias:', err);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchCategorias();
  }, []);

  // Salva apenas as informações textuais do site no banco de dados
  const handleSaveTextSettings = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const payload = {
        nome_loja: nomeLoja,
        descricao_institucional: descricao,
        email_contato: email,
        telefone_comercial: telefone
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Erro ao salvar as configurações.');
      alert('Configurações salvas com sucesso!');
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Salva uma configuração individual de imagem diretamente no banco
  const saveImageConfig = async (chave, valor) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [chave]: valor })
      });
      if (!response.ok) throw new Error('Erro ao persistir imagem no banco.');
    } catch (err) {
      console.error('Erro de persistência:', err);
    }
  };

  // Trata o envio/seleção de imagem (Upload Físico ou URL)
  const handleImageSubmit = async () => {
    if (!activeUploadTarget) return;

    let finalImageUrl = '';

    if (modalTab === 'url') {
      if (!inputUrl.trim()) {
        alert('Por favor, informe uma URL válida.');
        return;
      }
      finalImageUrl = inputUrl.trim();
    } else {
      if (!selectedFile) {
        alert('Por favor, selecione um arquivo de imagem.');
        return;
      }

      try {
        setUploadLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Erro no upload.');
        finalImageUrl = result.url;
      } catch (err) {
        alert(`Falha no upload: ${err.message}`);
        setUploadLoading(false);
        return;
      }
    }

    // Atualiza o estado correspondente
    if (activeUploadTarget === 'hero_banner') {
      setHeroBanner(finalImageUrl);
      await saveImageConfig('hero_banner', finalImageUrl);
    } else {
      const match = activeUploadTarget.match(/galeria_(\d)/);
      if (match) {
        const index = parseInt(match[1]) - 1;
        const novaGaleria = [...galeria];
        novaGaleria[index] = finalImageUrl;
        setGaleria(novaGaleria);
        await saveImageConfig(activeUploadTarget, finalImageUrl);
      }
    }

    // Limpa estados do modal e fecha
    setInputUrl('');
    setSelectedFile(null);
    setUploadLoading(false);
    setActiveUploadTarget(null);
  };

  // Remove uma imagem da galeria ou do banner
  const handleRemoveImage = async (target, e) => {
    e.stopPropagation(); // Impede clique de abrir o modal
    if (!confirm('Deseja realmente remover esta imagem?')) return;

    if (target === 'hero_banner') {
      setHeroBanner('');
      await saveImageConfig('hero_banner', '');
    } else {
      const match = target.match(/galeria_(\d)/);
      if (match) {
        const index = parseInt(match[1]) - 1;
        const novaGaleria = [...galeria];
        novaGaleria[index] = '';
        setGaleria(novaGaleria);
        await saveImageConfig(target, '');
      }
    }
  };

  // Salva os dados atualizados do produto no MySQL
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      setIsSavingProduct(true);
      
      let finalImageUrl = prodImagemUrl;
      if (productFile) {
        setProductUploadLoading(true);
        const formData = new FormData();
        formData.append('file', productFile);
        
        const uploadResponse = await fetch(UPLOAD_URL, {
          method: 'POST',
          body: formData
        });
        
        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadResult.error || 'Erro no upload da imagem.');
        finalImageUrl = uploadResult.url;
        setProdImagemUrl(finalImageUrl);
        setProductFile(null);
      }

      const payload = {
        NOME: prodNome,
        DESCRICAO: prodDescricao,
        PRECO: parseFloat(prodPreco),
        IMAGEM_URL: finalImageUrl,
        ESTOQUE: parseInt(prodEstoque),
        MADEIRA: prodMadeira,
        PESO: prodPeso,
        TAMANHO: prodTamanho,
        VIROLA: prodVirola,
        CATEGORIA_ID: prodCategoriaId ? parseInt(prodCategoriaId) : null
      };

      const response = await fetch(`http://localhost:5000/api/produtos/${prodId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao atualizar produto.');
      }
      
      alert('Produto atualizado com sucesso no banco de dados!');
      setIsEditingProduct(false);

      // Sincroniza a imagem correspondente do carrossel/galeria
      const novaGaleria = [...galeria];
      novaGaleria[editingGalleryIndex] = finalImageUrl;
      setGaleria(novaGaleria);
      await saveImageConfig(`galeria_${editingGalleryIndex + 1}`, finalImageUrl);
      
    } catch (err) {
      alert(`Falha ao salvar produto: ${err.message}`);
    } finally {
      setIsSavingProduct(false);
      setProductUploadLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-slate-500 font-semibold p-6">Carregando...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* 1. SEÇÃO DE PREVIEW VISUAL DO SITE (MOCKUP INTERATIVO) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6 space-y-6">
        <div>
          <h4 className="text-lg font-bold text-slate-800 uppercase">Normith Tacos</h4>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Edite aqui as imagens do site.
          </p>
        </div>

        {/* MOCKUP DO HERO BANNER PRINCIPAL (ESTILO 21:9) */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Banner Principal</span>
          
          <div className="relative w-full aspect-[21/9] rounded-[24px] bg-[#0a0a0a] overflow-hidden border border-slate-100 shadow-xs group">
            {heroBanner ? (
              <>
                <img 
                  src={heroBanner} 
                  alt="Preview Hero Banner" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-102"
                />
                
                {/* Overlay de Edição ao passar o mouse */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
                  <button 
                    onClick={() => setActiveUploadTarget('hero_banner')}
                    className="bg-white hover:bg-slate-100 text-slate-800 p-3.5 rounded-full transition-all shadow-md hover:scale-110 cursor-pointer"
                    title="Alterar Imagem"
                  >
                    <svg className="w-6 h-6 text-blue-600 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </button>
                  <button 
                    onClick={(e) => handleRemoveImage('hero_banner', e)}
                    className="bg-rose-500 hover:bg-rose-600 text-white p-3.5 rounded-full transition-all shadow-md hover:scale-110 cursor-pointer"
                    title="Remover Imagem"
                  >
                    <svg className="w-6 h-6 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <div 
                onClick={() => setActiveUploadTarget('hero_banner')}
                className="absolute inset-0 bg-slate-50 border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/10 flex items-center justify-center cursor-pointer transition-all duration-200 text-slate-400 hover:text-blue-500"
              >
                <svg className="w-12 h-12 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            )}
            
            {/* Gradiente e Textos Simulados */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10"></div>
            <div className="relative z-10 p-8 flex flex-col justify-center h-full max-w-md pointer-events-none select-none">
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase italic mb-2">
                A PRECISÃO QUE <span className="text-orange-500">DEFINE</span> SEU JOGO.
              </h1>
              <p className="text-slate-300 text-[10px] leading-relaxed">
                Tacos de bilhar artesanais, feitos com materiais nobres, equilíbrio perfeito e acabamento impecável.
              </p>
            </div>
          </div>
        </div>

        {/* MOCKUP DO GRID DA GALERIA SECUNDÁRIA (ESTILO 4 COLUNAS) */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Carrossel</span>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galeria.map((imgUrl, idx) => {
              const targetKey = `galeria_${idx + 1}`;
              return (
                <div 
                  key={idx}
                  onClick={() => openProductEditor(idx)}
                  className="relative aspect-video rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden cursor-pointer hover:border-blue-400 hover:bg-slate-100/50 transition-all duration-300 group flex items-center justify-center"
                >
                  {imgUrl ? (
                    <>
                      <img 
                        src={imgUrl} 
                        alt={`Galeria ${idx + 1}`} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                      />
                      
                      {/* Overlay de Ação */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductEditor(idx);
                          }}
                          className="bg-white/90 hover:bg-white p-2.5 rounded-full text-slate-800 hover:text-blue-600 transition-all shadow-md hover:scale-110 cursor-pointer"
                          title="Editar Produto"
                        >
                          <svg className="w-5 h-5 stroke-[2.2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                      <svg className="w-6 h-6 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. FORMULÁRIO DE TEXTOS INSTITUCIONAIS GERAIS */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xs p-6">
        <h4 className="text-lg font-bold text-slate-800 mb-2">Configurações Gerais do Site</h4>
        <p className="text-xs text-slate-400 font-medium mb-6">Personalize os dados de apresentação da sua vitrine</p>

        <form className="space-y-6" onSubmit={handleSaveTextSettings}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nome da Loja</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              value={nomeLoja}
              onChange={(e) => setNomeLoja(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Descrição Institucional</label>
            <textarea 
              rows="3" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">E-mail de Contato</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Telefone Comercial</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={fetchSettings}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>

      {/* 3. MODAL DE SELEÇÃO E UPLOAD DE IMAGEM */}
      {activeUploadTarget && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 w-full max-w-md animate-scale-in">
            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-center mb-4">
              <h5 className="text-lg font-bold text-slate-800">Alterar Imagem</h5>
              <button 
                onClick={() => setActiveUploadTarget(null)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Alternadores de Aba */}
            <div className="flex border-b border-slate-100 mb-6 gap-4">
              <button 
                className={`pb-2.5 font-bold text-sm transition-all border-b-2 cursor-pointer ${
                  modalTab === 'file' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
                onClick={() => setModalTab('file')}
              >
                Carregar Arquivo Local
              </button>
              <button 
                className={`pb-2.5 font-bold text-sm transition-all border-b-2 cursor-pointer ${
                  modalTab === 'url' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
                onClick={() => setModalTab('url')}
              >
                Colar URL da Web
              </button>
            </div>

            {/* Corpo do Modal de acordo com a aba */}
            {modalTab === 'file' ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:bg-slate-50 flex flex-col items-center justify-center gap-3 transition cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <svg className="w-10 h-10 text-slate-400 stroke-[1.8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                  <span className="text-xs font-semibold text-slate-500">
                    {selectedFile ? selectedFile.name : 'Clique ou arraste a imagem aqui'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Link da Imagem (Web URL)</label>
                <input 
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium text-slate-800 text-sm"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />
              </div>
            )}

            {/* Ações do Modal */}
            <div className="flex justify-end gap-3 mt-8">
              <button 
                type="button" 
                onClick={() => {
                  setSelectedFile(null);
                  setInputUrl('');
                  setActiveUploadTarget(null);
                }}
                className="text-slate-500 font-semibold text-sm cursor-pointer"
              >
                Cancelar
              </button>
              <button 
                type="button"
                onClick={handleImageSubmit}
                disabled={uploadLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm cursor-pointer disabled:opacity-50"
              >
                {uploadLoading ? 'Enviando...' : 'Salvar Imagem'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL DE EDIÇÃO DE PRODUTO COMPLETO */}
      {isEditingProduct && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl p-6 w-full max-w-2xl my-8 animate-scale-in max-h-[90vh] overflow-y-auto">
            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <div>
                <h5 className="text-xl font-bold text-slate-800">Editar Produto Relacionado</h5>
                <p className="text-xs text-slate-400 font-medium mt-1">Altere todos os atributos do taco na tabela PRODUTOS</p>
              </div>
              <button 
                onClick={() => setIsEditingProduct(false)}
                className="text-slate-400 hover:text-slate-600 transition cursor-pointer p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* Nome e Preço */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Nome do Produto</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium text-slate-800"
                    value={prodNome}
                    onChange={(e) => setProdNome(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Preço (R$)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium text-slate-800"
                    value={prodPreco}
                    onChange={(e) => setProdPreco(e.target.value)}
                  />
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Descrição Completa</label>
                <textarea 
                  rows="3" 
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium text-slate-800"
                  value={prodDescricao}
                  onChange={(e) => setProdDescricao(e.target.value)}
                ></textarea>
              </div>

              {/* Imagem do Produto: URL ou Arquivo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">URL da Imagem</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium text-slate-800 text-sm"
                    value={prodImagemUrl}
                    onChange={(e) => setProdImagemUrl(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Ou Upload de Foto Local</label>
                  <div className="relative border border-slate-200 rounded-xl p-2.5 hover:bg-slate-50 flex items-center justify-between transition cursor-pointer">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setProductFile(e.target.files[0]);
                        }
                      }}
                    />
                    <span className="text-xs text-slate-500 truncate max-w-[180px]">
                      {productFile ? productFile.name : 'Selecionar arquivo...'}
                    </span>
                    <span className="bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600">Escolher</span>
                  </div>
                </div>
              </div>

              {/* Especificações Físicas */}
              <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 space-y-4">
                <h6 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Especificações do Taco</h6>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Madeira</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm text-slate-800"
                      value={prodMadeira}
                      onChange={(e) => setProdMadeira(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Peso</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 540g"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm text-slate-800"
                      value={prodPeso}
                      onChange={(e) => setProdPeso(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Tamanho</label>
                    <input 
                      type="text" 
                      placeholder="Ex: 1.45m"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm text-slate-800"
                      value={prodTamanho}
                      onChange={(e) => setProdTamanho(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Virola</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Celerom 11mm"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm text-slate-800"
                      value={prodVirola}
                      onChange={(e) => setProdVirola(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Estoque e Categoria */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Estoque Disponível</label>
                  <input 
                    type="number" 
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium text-slate-800"
                    value={prodEstoque}
                    onChange={(e) => setProdEstoque(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Categoria</label>
                  <select 
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium text-slate-800"
                    value={prodCategoriaId}
                    onChange={(e) => setProdCategoriaId(e.target.value)}
                  >
                    <option value="">Selecione uma categoria...</option>
                    {categoriasList.map((cat) => (
                      <option key={cat.ID_CATEGORIA} value={cat.ID_CATEGORIA}>
                        {cat.NOME}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Ações */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsEditingProduct(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSavingProduct || productUploadLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSavingProduct || productUploadLoading ? 'Salvando...' : 'Salvar no Banco'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
