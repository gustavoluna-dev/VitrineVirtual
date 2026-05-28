import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { featuredTacos } from '../Data/tacos';

export default function ProductCarousel() {
  return (
    <section id="tacos" className="bg-[#0e0e0e] py-16 px-8 border-t border-b border-white/5 relative overflow-hidden">
      {/* Custom styled overrides for Splide focus-center effects */}
      <style dangerouslySetInnerHTML={{__html: `
        .splide__pagination {
          bottom: -1.5rem !important;
        }
        .splide__pagination__page {
          background: #374151 !important;
          opacity: 1 !important;
          transition: transform 0.2s, background-color 0.2s;
        }
        .splide__pagination__page.is-active {
          background: #f97316 !important;
          transform: scale(1.3) !important;
        }
        .splide__arrow {
          background: rgba(18, 18, 18, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          width: 2.8rem !important;
          height: 2.8rem !important;
          transition: border-color 0.2s, background-color 0.2s;
          z-index: 10 !important;
        }
        .splide__arrow:hover {
          background: #1f2937 !important;
          border-color: #f97316 !important;
        }
        .splide__arrow svg {
          fill: #f97316 !important;
        }
        /* Focus center styles for adjacent slides */
        .splide__list {
          align-items: center;
        }
        .splide__slide {
          z-index: 1;
          transition: z-index 0.4s ease;
        }
        .splide__slide.is-active {
          z-index: 5;
        }
        .splide__slide .carousel-card {
          opacity: 0.4;
          transform: scale(0.82);
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .splide__slide.is-active .carousel-card {
          opacity: 1;
          transform: scale(1.06);
        }
      `}} />

      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-xl font-bold tracking-widest uppercase mb-12 text-white relative flex items-center justify-center">
          <span className="bg-[#0e0e0e] px-6 z-10">TACOS EM DESTAQUE</span>
          <div className="absolute w-full h-[1px] bg-white/10 top-1/2 left-0 -z-0"></div>
        </h2>

        <div className="px-4 md:px-8">
          <Splide
            options={{
              type: 'loop',
              focus: 'center',
              perPage: 3,
              perMove: 1,
              gap: '2rem',
              autoplay: true,
              interval: 10000, // Moves automatically after 10 seconds
              pauseOnHover: true,
              arrows: true,
              pagination: true,
              breakpoints: {
                1024: {
                  perPage: 3,
                  gap: '1.5rem',
                },
                768: {
                  perPage: 1,
                  gap: '1rem',
                  padding: { left: '15%', right: '15%' }, // Keeps side slides visible on mobile
                }
              }
            }}
          >
            {featuredTacos.map((taco) => (
              <SplideSlide key={taco.id}>
                <div className="carousel-card bg-[#161616] border border-white/5 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[500px] transition-all duration-300 hover:border-orange-500/30 group">
                  <div className="h-56 relative overflow-hidden">
                    <img
                      src={taco.image}
                      alt={taco.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-orange-500 text-black text-[10px] font-black uppercase px-3 py-1 rounded-sm italic tracking-wider">
                      {taco.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors uppercase leading-snug">
                      {taco.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                      {taco.description}
                    </p>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </section>
  );
}
