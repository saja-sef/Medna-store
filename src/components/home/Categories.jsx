import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRight } from 'lucide-react';

// Nouvelles catégories configurées pour le Backend
const DEFAULT_CATEGORIES = [
  {
    id: 'cat_womens_scrubs',
    subtitle: '38 ENGINEERED STYLES',
    title: "Women's Scrubs",
    description: 'Sculpted tops, high-waist joggers & contour lab layers.',
    ctaText: 'SHOP WOMEN',
    link: '/collections/womens-scrubs',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cat_blouses',
    subtitle: 'ESSENTIAL CLINICAL FITS',
    title: 'Blouses',
    description: 'Athletic raglan tops, V-necks & fluid-barrier lab blouses.',
    ctaText: 'SHOP BLOUSES',
    link: '/collections/blouses',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cat_accessories',
    subtitle: 'CLINICAL GEAR & ACCENTS',
    title: 'Accessories',
    description: 'Compression socks, badge reels & medical utility essentials.',
    ctaText: 'SHOP ACCESSORIES',
    link: '/collections/accessories',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
  },
];

const Categories = ({
  title = 'Shop By Category',
  exploreText = 'EXPLORE ENTIRE LINE',
  onExploreClick,
  categories = DEFAULT_CATEGORIES,
  onCategoryClick,
}) => {
  return (
    <section className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-8 md:px-12 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête avec Style Exact (Plus Jakarta Sans, 800 ExtraBold, 30px / 36px) */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 
            className="text-[#0F3844] tracking-normal"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '30px',
              lineHeight: '36px',
              letterSpacing: '0px',
            }}
          >
            {title}
          </h2>

          <button
            onClick={onExploreClick}
            className="flex items-center space-x-2 text-xs font-bold text-[#0F3844] hover:text-[#0a2831] uppercase tracking-wider transition group cursor-pointer"
          >
            <span>{exploreText}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grille des 3 Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onCategoryClick && onCategoryClick(cat)}
              className="relative group cursor-pointer rounded-[2rem] overflow-hidden aspect-[4/5] min-h-[440px] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
            >
              {/* Image de fond avec effet Zoom */}
              <img
                src={cat.imageUrl}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Sombre */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent transition-opacity duration-300" />

              {/* Contenu Texte */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-300 mb-1.5">
                  {cat.subtitle}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                  {cat.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 font-light mb-6 line-clamp-2 max-w-[90%] leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-emerald-300 transition-colors">
                  <span>{cat.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

Categories.propTypes = {
  title: PropTypes.string,
  exploreText: PropTypes.string,
  onExploreClick: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      ctaText: PropTypes.string.isRequired,
      link: PropTypes.string,
      imageUrl: PropTypes.string.isRequired,
    })
  ),
  onCategoryClick: PropTypes.func,
};

export default Categories;