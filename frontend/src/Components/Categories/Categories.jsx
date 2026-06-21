import { Card } from "@/Components/ui/card"
import { GraduationCap, Star, Crown, Wrench } from "lucide-react"

export default function Categories() {
  const categories = [
    {
      title: "TACOS PARA INICIANTES",
      description: "Modelos com excelente custo-benefício para quem está começando.",
      icon: GraduationCap,
      image: "https://placehold.co/400x300/111/333?text=Taco+Iniciante"
    },
    {
      title: "TACOS PARA ENTUSIASTAS",
      description: "Mais tecnologia e controle para elevar seu nível de jogo.",
      icon: Star,
      image: "https://placehold.co/400x300/111/333?text=Taco+Entusiasta"
    },
    {
      title: "TACOS PARA PROFISSIONAIS",
      description: "Desempenho máximo com materiais selecionados e acabamento premium.",
      icon: Crown,
      image: "https://placehold.co/400x300/111/333?text=Taco+Profissional"
    },
    {
      title: "PERSONALIZE SEU TACO",
      description: "Crie um taco único com sua escolha de madeira, peso e detalhes.",
      icon: Wrench,
      image: "https://placehold.co/400x300/111/333?text=Taco+Personalizado"
    }
  ]

  return (
    <section className="bg-[#f4f1ea] py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-xl font-bold tracking-widest uppercase mb-12 text-[#0a0a0a] relative flex items-center justify-center">
          <span className="bg-[#f4f1ea] px-4 z-10">NOSSAS CATEGORIAS</span>
          <div className="absolute w-full h-[1px] bg-gray-300 top-1/2 left-0 -z-0"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Card key={index} className="bg-[#0a0a0a] border-none text-white overflow-hidden rounded-lg group cursor-pointer h-[280px] flex flex-col relative">
              <div className="absolute right-0 top-1/4 h-3/4 w-3/4 bg-gradient-to-l from-transparent to-[#0a0a0a] z-10 pointer-events-none"></div>
              <img src={cat.image} alt={cat.title} className="absolute right-0 top-0 h-full w-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-80 transition-opacity" />
              
              <div className="relative z-20 p-6 flex flex-col h-full bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent w-[85%]">
                <div className="flex items-start gap-3 mb-4">
                  <cat.icon className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                  <h3 className="font-bold text-lg leading-tight uppercase text-white">{cat.title}</h3>
                </div>
                <p className="text-gray-400 text-sm mb-8 flex-grow">
                  {cat.description}
                </p>
                <span className="text-orange-500 font-bold text-sm uppercase flex items-center mt-auto group-hover:text-orange-400">
                  {index === 3 ? "SAIBA MAIS" : "VER TACOS"} <span className="ml-2">&rarr;</span>
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
