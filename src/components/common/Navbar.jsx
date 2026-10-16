import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, ShoppingBag, Ruler, Menu, X } from 'lucide-react';
import logoTali from '../../assets/images/logotali.png';

const DEFAULT_NAV_LINKS = [
  { id: 'category', label: 'Shop By Category', href: '#categories' },
  { id: 'bestsellers', label: 'Bestsellers', href: '#bestsellers' },
  { id: 'story', label: 'Our Story', href: '#story' },
  { id: 'about', label: 'About Us', href: '#about' },
];

const Navbar = ({
  logo = logoTali,
  cartCount = 0,
  navLinks = DEFAULT_NAV_LINKS,
  defaultActiveId = 'bestsellers',
  onNavClick,
  onSearchChange,
  onFitGuideClick,
  onCartClick,
}) => {
  const [activeLinkId, setActiveLinkId] = useState(defaultActiveId);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e, link) => {
    setActiveLinkId(link.id || link.label);

    if (onNavClick) {
      onNavClick(link);
    }

    // Gestion du défilement fluide si le lien pointe vers une ancre (#)
    if (link.href && link.href.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(link.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="h-16 md:h-20 px-4 sm:px-6 md:px-12 flex items-center justify-between">
        
        {/* Bouton Menu Mobile + Logo */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-700 hover:text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center w-[75px] sm:w-[85px] md:w-[105px]">
            <a href="/" className="block w-full">
              <img 
                src={logo} 
                alt="MEDNA Logo" 
                className="w-full h-auto object-contain" 
              />
            </a>
          </div>
        </div>

        {/* Liens de Navigation Desktop (Effet Survol Gras + Ligne Noire) */}
        <div className="hidden md:flex items-center space-x-8 text-[13px]">
          {navLinks.map((link) => {
            const isActive = activeLinkId === (link.id || link.label);
            return (
              <a
                key={link.id || link.label}
                href={link.href || '#'}
                onClick={(e) => handleLinkClick(e, link)}
                className={`relative py-1.5 transition-all duration-200 border-b-2 ${
                  isActive
                    ? 'font-extrabold text-black border-black'
                    : 'font-medium text-gray-700 border-transparent hover:font-extrabold hover:text-black hover:border-black'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Actions à droite */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Barre de recherche */}
          <div className="relative hidden lg:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tops, joggers..."
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[#f4f5f7] text-xs font-medium rounded-full w-48 xl:w-56 focus:outline-none focus:ring-1 focus:ring-gray-300 transition"
            />
          </div>


          {/* Panier */}
          <button
            onClick={onCartClick}
            aria-label="Voir le panier"
            className="relative p-2 sm:p-2.5 bg-[#0F3844] text-white rounded-full hover:bg-[#0a2831] transition flex items-center justify-center"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8fa0b5] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-4 flex flex-col space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeLinkId === (link.id || link.label);
            return (
              <a
                key={link.id || link.label}
                href={link.href || '#'}
                onClick={(e) => {
                  handleLinkClick(e, link);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-sm py-1 border-b-2 ${
                  isActive
                    ? 'font-extrabold text-black border-black'
                    : 'font-medium text-gray-600 border-transparent hover:font-bold hover:text-black'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logo: PropTypes.string,
  cartCount: PropTypes.number,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  defaultActiveId: PropTypes.string,
  onNavClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  onFitGuideClick: PropTypes.func,
  onCartClick: PropTypes.func,
};

export default Navbar;