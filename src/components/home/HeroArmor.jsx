import React from 'react';
import PropTypes from 'prop-types';
import { FlaskConical, Droplet, UserCheck } from 'lucide-react';

const DEFAULT_STANDARDS = [
  {
    id: 'std_1',
    icon: FlaskConical,
    title: 'Hospital Autoclave Tested',
    description: 'Endures 200+ high-heat institutional antimicrobial washes without color fade or fiber fatigue.',
  },
  {
    id: 'std_2',
    icon: Droplet,
    title: 'FluidBarrier™ Hydrophobic Shield',
    description: 'Repels bodily fluids, splashes, and stains while preserving 100% micro-pore air permeability.',
  },
  {
    id: 'std_3',
    icon: UserCheck,
    title: 'Body-Conscious Athletic Draping',
    description: 'Articulated knees, tapered cuffs, and contoured shoulders eliminate excess fabric bunching.',
  },
];

const DEFAULT_STATS = [
  {
    value: '4-Way',
    label: 'HYPERSTRETCH',
    detail: 'Zero restrictive pinch',
  },
  {
    value: '99.9%',
    label: 'SILVADUR™',
    detail: 'Silver-ion protection',
  },
  {
    value: '12',
    label: 'UTILITY POCKETS',
    detail: 'Trauma shears ready',
  },
];

const HeroArmor = ({
  tagline = "HAUTE ATHLEISURE MEETS CLINICAL RIGOR",
  title = "More than a scrub.\nIt’s your everyday armor.",
  description = "Born in hospital wards, re-engineered for the modern clinician. We stripped away the boxy, scratchy polyester of yesterday to build technical athleisure that breathes, stretches 4-ways, and looks exceptionally tailored from rounds to espresso bars.",
  stats = DEFAULT_STATS,
  standardsTitle = "LABORATORY STANDARDS",
  standards = DEFAULT_STANDARDS,
}) => {
  return (
    <section className="w-full bg-[#0d2d38] text-white py-16 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Partie Gauche : Textes & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            {/* Tagline Badge */}
            <div className="inline-block bg-[#164452] text-gray-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6">
              {tagline}
            </div>

            {/* Titre Principal avec Style Exact (Plus Jakarta Sans, 800 ExtraBold, 48px / 48px, -1.2px) */}
            <h2 
              className="text-white mb-6 whitespace-pre-line"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '48px',
                lineHeight: '48px',
                letterSpacing: '-1.2px',
              }}
            >
              {title}
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl mb-10">
              {description}
            </p>
          </div>

          {/* Ligne des Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-0.5">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-300">
                  {stat.label}
                </span>
                <span className="text-[11px] text-gray-400 font-light mt-0.5 hidden sm:inline">
                  {stat.detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Partie Droite : Carte Laboratory Standards */}
        <div className="lg:col-span-5">
          <div className="bg-[#123946]/90 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-300 mb-6">
              {standardsTitle}
            </h3>

            <div className="space-y-6">
              {standards.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="flex items-start space-x-4">
                    <div className="p-3 bg-[#184858] rounded-xl text-emerald-300 shrink-0">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-300 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

HeroArmor.propTypes = {
  tagline: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      detail: PropTypes.string,
    })
  ),
  standardsTitle: PropTypes.string,
  standards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default HeroArmor;