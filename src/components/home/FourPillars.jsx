import React from 'react';
import PropTypes from 'prop-types';
import { Cloud, ShieldCheck, BriefcaseMedical, Maximize2 } from 'lucide-react';

const DEFAULT_PILLARS = [
  {
    id: 'pillar_1',
    number: '01',
    category: 'SOFTNESS',
    title: 'Cloud Touch',
    description: 'Cloud-soft bamboo-poly micro-knit blend engineered to never chafe or pinch on back-to-back 14-hour double shifts.',
    icon: Cloud,
  },
  {
    id: 'pillar_2',
    number: '02',
    category: 'LONGEVITY',
    title: 'Lab Durability',
    description: 'Triple-needle lockstitch reinforcement tested for 200+ industrial antimicrobial washes without structural breakdown.',
    icon: ShieldCheck,
  },
  {
    id: 'pillar_3',
    number: '03',
    category: 'UTILITY',
    title: 'Utility Pockets',
    description: 'Dedicated trauma shears holster, badge lanyard loop, and concealed waterproof zip pocket for personal jewelry.',
    icon: BriefcaseMedical,
  },
  {
    id: 'pillar_4',
    number: '04',
    category: 'CONTOUR',
    title: 'Tailored Form',
    description: 'Athletic, body-conscious drape that feels and fits like luxury streetwear while honoring hospital dress codes.',
    icon: Maximize2,
  },
];

const FourPillars = ({
  subtitle = "ENGINEERED ANATOMY",
  title = "Four Pillars of Shift Supremacy",
  description = "Tested in live trauma bays and surgical suites by 12,000+ clinicians.",
  pillars = DEFAULT_PILLARS,
}) => {
  return (
    <section className="w-full bg-[#f8f9fa] py-20 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F3844] tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-normal">
            {description}
          </p>
        </div>

        {/* Grille des 4 Piliers avec Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                style={{ transitionDelay: `${index * 50}ms` }}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between 
                           border border-gray-100 shadow-sm
                           hover:shadow-2xl hover:shadow-[#0F3844]/10 hover:-translate-y-2.5 hover:border-[#0F3844]/20
                           transition-all duration-300 ease-out cursor-pointer overflow-hidden"
              >
                {/* Subtle top accent line on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#0F3844] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Container Icône animé */}
                  <div className="w-12 h-12 rounded-2xl bg-[#f4f6f8] flex items-center justify-center text-gray-500 mb-6 
                                  group-hover:bg-[#0F3844] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 
                                  transition-all duration-300 shadow-none group-hover:shadow-md">
                    <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Numéro et Catégorie */}
                  <div className="text-[11px] font-bold text-gray-400 group-hover:text-[#0F3844]/70 uppercase tracking-widest mb-2 transition-colors duration-300">
                    {item.number} // {item.category}
                  </div>

                  {/* Titre du Pilier */}
                  <h3 className="text-xl font-extrabold text-[#0F3844] mb-3 group-hover:translate-x-0.5 transition-transform duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

FourPillars.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  pillars: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
};

export default FourPillars;