import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Check, Minus } from 'lucide-react';

const RECOMMENDED_ESSENTIALS = [
  {
    id: 'rec_1',
    title: 'Shift™ Seamless Underscrub',
    price: '38.00',
    currency: '$',
    description: 'Second-skin thermal base layer',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec_2',
    title: 'CloudCushion™ Compression Socks',
    price: '18.00',
    currency: '$',
    description: '20-30 mmHg circulation support',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec_3',
    title: 'Precision Anodized Badge Reel',
    price: '14.00',
    currency: '$',
    description: 'Aircraft-grade alloy casing',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
];

const ProductDetails = ({
  product,
  onBackToHome,
  onCategoryClick,
  onAddToCart,
}) => {
  const defaultProduct = {
    id: 'prod_default',
    title: 'AeroForm™ Tailored Scrub Set',
    price: 4500.0,
    currency: 'Dzd',
    subtitle: 'Top & Kinetic Jogger',
    edition: "EDITION 04 — WOMEN'S SET",
    category: "Women's Scrubs",
    colors: [
      { id: 'c1', name: 'Eucalyptus Green', hex: '#586A5A', inStock: true },
      { id: 'c2', name: 'Navy', hex: '#1F2937', inStock: true },
      { id: 'c3', name: 'Charcoal', hex: '#4B5563', inStock: true },
      { id: 'c4', name: 'Rust', hex: '#A0522D', inStock: true },
      { id: 'c5', name: 'Soft Off-White', hex: '#F3F4F6', inStock: true },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800&auto=format&fit=crop',
  };

  const currentProduct = product || defaultProduct;

  const [selectedColor, setSelectedColor] = useState(
    currentProduct.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart({
        productId: currentProduct.id || currentProduct._id,
        title: currentProduct.title,
        price: currentProduct.price,
        currency: currentProduct.currency || 'Dzd',
        selectedColor,
        selectedSize,
        quantity,
        variantImage: currentProduct.imageUrl,
      });
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-8 md:px-12 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Path */}
        <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-8 font-medium">
          <button onClick={onBackToHome} className="hover:text-black transition">
            Home
          </button>
          <span>›</span>
          <button 
            onClick={() => onCategoryClick && onCategoryClick({ title: currentProduct.category || "Women's Scrubs" })} 
            className="hover:text-black transition"
          >
            {currentProduct.category || "Women's Scrubs"}
          </button>
          <span>›</span>
          <span className="text-black font-bold truncate max-w-[200px] sm:max-w-none">
            {currentProduct.title}
          </span>
        </nav>

        {/* Section Principale Produit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20">
          
          {/* Colonne Gauche: Image */}
          <div className="lg:col-span-6">
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100">
              <img
                src={currentProduct.imageUrl}
                alt={currentProduct.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          {/* Colonne Droite: Détails & Options */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              {currentProduct.edition || "EDITION 04 — WOMEN'S SET"}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F3844] mb-3 leading-tight">
              {currentProduct.title}
            </h1>

            <div className="flex items-baseline space-x-3 mb-6">
              <span className="text-2xl font-bold text-[#0F3844]">
                {currentProduct.price} {currentProduct.currency || 'Dzd'}
              </span>
              {currentProduct.subtitle && (
                <span className="text-xs text-gray-400 font-normal">
                  [{currentProduct.subtitle}]
                </span>
              )}
            </div>

            {/* Sélecteur de Couleur */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-800">
                  Color:{' '}
                  <span className="font-normal text-gray-500">
                    {selectedColor?.name || 'Eucalyptus Green'}
                  </span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  READY TO SHIP
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {(currentProduct.colors || defaultProduct.colors).map((color) => {
                  const isSelected = selectedColor?.id === color.id;
                  return (
                    <button
                      key={color.id || color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full transition-transform ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-[#0F3844] scale-110'
                          : 'hover:scale-105 opacity-80'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Sélecteur de Taille */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-800">Size</span>
                <button className="text-xs text-gray-400 underline hover:text-black">
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {(currentProduct.sizes || ['XS', 'S', 'M', 'L', 'XL', '2XL']).map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-full text-xs font-bold transition flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#0F3844] text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantité & Bouton Add to Bag */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-3 space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="text-gray-500 hover:text-black transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-gray-800">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="text-gray-500 hover:text-black transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 px-8 rounded-full text-xs font-bold uppercase tracking-widest transition flex items-center justify-center space-x-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#0F3844] hover:bg-[#0a2831] text-white shadow-md'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <span>ADD TO BAG</span>
                )}
              </button>
            </div>

          </div>

        </div>

       
        <div className="pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
                CURATED ESSENTIALS
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F3844]">
                Complete The Uniform
              </h2>
            </div>
            <button className="text-xs font-bold text-[#0F3844] hover:underline">
              View Capsule
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RECOMMENDED_ESSENTIALS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-3 border border-gray-100 shadow-sm flex flex-col justify-between group"
              >
                <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-3 relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-bold text-[#0F3844] truncate">{item.title}</h3>
                    <span className="text-xs font-bold text-[#0F3844]">{item.currency}{item.price}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 mb-3">{item.description}</p>
                  <button
                    onClick={() => onAddToCart && onAddToCart(item)}
                    className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-[#0F3844] rounded-full text-[11px] font-bold transition"
                  >
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object,
  onBackToHome: PropTypes.func,
  onCategoryClick: PropTypes.func,
  onAddToCart: PropTypes.func,
};

export default ProductDetails;