import React from 'react';
import PropTypes from 'prop-types';
import { Lock, ShieldCheck, RefreshCw } from 'lucide-react';
import defaultLogo from '../../assets/images/logotali.png';

const Footer = ({
  logo = defaultLogo,
  instagramUrl = "https://www.instagram.com/_medna._/",
  tiktokUrl = "https://www.tiktok.com/@_.medna._",
  onCategoryClick,
}) => {
  const handleLinkClick = (e, target) => {
    e.preventDefault();
    if (onCategoryClick) {
      onCategoryClick(target);
    }
  };

  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8 px-4 sm:px-8 md:px-12 lg:px-16 text-gray-600">
      <div className="max-w-7xl mx-auto">
        
        {/* Grille Principale */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          
          {/* Brand */}
          <div className="md:col-span-5 pr-0 md:pr-8">
            <div className="w-28 sm:w-32 mb-5">
              <img src={logo} alt="MEDNA Logo" className="w-full h-auto object-contain" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-normal leading-relaxed max-w-md">
              Modern clinical athleisure. High-performance antimicrobial textiles infused with body-sculpting recovery technology for 14-hour medical rotations.
            </p>
          </div>

          {/* Colonne SHOP (Navigation par catégories) */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F3844] mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, { title: "Women's Scrubs", id: 'cat_womens_scrubs' })}
                  className="hover:text-black transition text-left cursor-pointer"
                >
                  Women's Scrubs
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, { title: 'Blouses', id: 'cat_blouses' })}
                  className="hover:text-black transition text-left cursor-pointer"
                >
                  Blouses
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, { title: 'Accessories', id: 'cat_accessories' })}
                  className="hover:text-black transition text-left cursor-pointer"
                >
                  Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne LINKS */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F3844] mb-4">
              LINKS
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, { title: 'Home', id: 'home' })}
                  className="hover:text-black transition text-left cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleLinkClick(e, { title: 'Shop', id: 'shop' })}
                  className="hover:text-black transition text-left cursor-pointer"
                >
                  Shop
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne SOCIAL MEDIA */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F3844] mb-4">
              SOCIAL MEDIA
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition inline-block"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition inline-block"
                >
                  Tiktok
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Barre inférieure */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 MEDNA Shop All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-medium text-gray-500">
            <div className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              <span>256-Bit Encrypted</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
              <span>HIPAA Verified</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-gray-400" />
              <span>30-Day Clinical Wear Test</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

Footer.propTypes = {
  logo: PropTypes.string,
  instagramUrl: PropTypes.string,
  tiktokUrl: PropTypes.string,
  onCategoryClick: PropTypes.func,
};

export default Footer;