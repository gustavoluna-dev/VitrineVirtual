import { ShieldCheck, Leaf, Scale, Award } from "lucide-react"

export default function Features() {
  const features = [
    {
      title: "QUALIDADE ARTESANAL",
      description: "Cada taco é produzido com atenção aos mínimos detalhes.",
      icon: ShieldCheck
    },
    {
      title: "MADEIRAS NOBRES",
      description: "Selecionamos apenas madeiras de alta qualidade e procedência.",
      icon: Leaf
    },

    {
      title: "EQUILÍBRIO PERFEITO",
      description: "Projetados para oferecer precisão, conforto e estabilidade.",
      icon: Scale
    },
    {
      title: "ACABAMENTO PREMIUM",
      description: "Acabamentos impecáveis para um taco que impressiona.",
      icon: Award
    }
  ]

  return (
    <section className="bg-[#111] text-white py-12 px-8 border-y border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat, index) => (
          <div key={index} className="flex items-start gap-4">
            <feat.icon className="w-8 h-8 text-orange-500 flex-shrink-0" />
            <div>
              <h4 className="font-bold uppercase text-sm mb-1">{feat.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{feat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
