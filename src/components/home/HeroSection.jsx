import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';

import defaultCenterLogo from '../../assets/images/logotali1.png';
import defaultModelLeft from '../../assets/images/model-blue.png.png';
import defaultModelRight from '../../assets/images/model-red.png.png';

const DEFAULT_FEATURES = [
  {
    title: '4-Way',
    subtitle: 'HYPERSTRETCH MOBILITY',
    description: 'Zero-sag recovery after 14-hour trauma rotations',
  },
  {
    title: '99.9%',
    subtitle: 'ANTIMICROBIAL DEFENSE',
    description: 'SILVADUR™ silver-ion weave blocks bacteria & odors',
  },
  {
    title: '12',
    subtitle: 'FUNCTIONAL POCKETS',
    description: 'Shears holster, badge clip & concealed zip vault',
  },
  {
    title: '30-Day',
    subtitle: 'CLINICAL TRIAL',
    description: 'Wash it, wear it, or return it free of charge',
  },
];

const HeroSection = ({
  centerLogo = defaultCenterLogo,
  modelLeft = defaultModelLeft,
  modelRight = defaultModelRight,
  headingText = "Life is too short to wear boring scrubs.",
  primaryCtaText = "SHOP THE COLLECTION",
  onPrimaryCtaClick,
  features = DEFAULT_FEATURES,
}) => {
  return (
    <div className="w-full flex flex-col justify-between min-h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] md:min-h-[600px] bg-[#f4f5f7] overflow-x-hidden md:overflow-hidden">
      
      {/* Zone Héro Main */}
      <section className="relative w-full flex-1 flex items-center justify-center px-4 py-8 md:py-0 overflow-hidden">
        
        {/* Modèle Gauche */}
        <div className="absolute -left-10 md:-left-16 lg:-left-20 -bottom-24 md:-bottom-32 h-[125%] lg:h-[135%] w-auto max-w-[50%] hidden md:flex items-start justify-start z-10 pointer-events-none">
          <img
            src={modelLeft}
            alt="MEDNA Left Model"
            className="h-full w-auto object-contain object-top drop-shadow-sm transform scale-125 origin-top-left"
          />
        </div>

        {/* Modèle Droit */}
        <div className="absolute right-0 bottom-0 h-[86%] lg:h-[92%] w-auto max-w-[38%] hidden md:flex items-end justify-end z-10 pointer-events-none">
          <img
            src={modelRight}
            alt="MEDNA Right Model"
            className="h-full w-auto object-contain object-bottom pr-4 lg:pr-10 drop-shadow-sm"
          />
        </div>

        {/* Contenu Central (Centré 100%) */}
        <div className="relative z-20 text-center max-w-xl mx-auto flex flex-col items-center justify-center my-auto py-4">
          
          {/* Logo Central */}
          <img
            src={centerLogo}
            alt="MEDNA Logo"
            className="w-[220px] sm:w-[300px] md:w-[400px] h-auto object-contain mb-3 sm:mb-4" 
          />

          {/* Slogan */}
          <h1 
            className="text-2xl sm:text-4xl md:text-[44px] text-[#1f2937] leading-[1.15] mb-6 font-light tracking-wide px-2"
            style={{ fontFamily: "'Poiret One', cursive" }}
          >
            {headingText.includes("Life is too short to") ? (
              <>Life is too short to <br className="hidden sm:inline" /> wear boring scrubs.</>
            ) : (
              headingText
            )}
          </h1>

          {/* Bouton Unique (Shop The Collection Centré) */}
          <div className="flex justify-center w-full px-4 sm:px-0">
            <button
              onClick={onPrimaryCtaClick}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#0F3844] text-white text-[11px] font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#0a2831] transition shadow-md active:scale-95 cursor-pointer"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* Barre des Caractéristiques */}
      <section className="w-full bg-white py-6 md:py-5 border-t border-gray-100 z-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 text-center">
          {features.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <h3 className="text-xl font-bold text-[#11232D]">{item.title}</h3>
              <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">
                {item.subtitle}
              </p>
              <p className="text-[11px] text-gray-500 max-w-[210px] leading-relaxed md:leading-tight mt-1 md:mt-0.5">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

HeroSection.propTypes = {
  centerLogo: PropTypes.string,
  modelLeft: PropTypes.string,
  modelRight: PropTypes.string,
  headingText: PropTypes.string,
  primaryCtaText: PropTypes.string,
  onPrimaryCtaClick: PropTypes.func,
  features: PropTypes.array,
};

export default HeroSection;