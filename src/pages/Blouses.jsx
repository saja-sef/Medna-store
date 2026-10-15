import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star, Heart, Plus, Check, ArrowLeft, Loader2 } from 'lucide-react';

const MOCK_BLOUSES_DATA = [
  {
    _id: 'bl_prod_1',
    sku: 'MED-BLO-001',
    title: 'AeroForm™ V-Neck Lab Blouse',
    price: 3800.0,
    currency: 'Dzd',
    rating: 4.9,
    reviewsCount: 890,
    category: 'Blouses',
    badge: { text: 'BESTSELLER', type: 'dark' },
    description: '4-Way Stretch • Fluid-Barrier Finish',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { id: 'col_1', name: 'Sage Green', hex: '#586A5A', inStock: true },
      { id: 'col_2', name: 'Navy', hex: '#1F2937', inStock: true },
      { id: 'col_3', name: 'White', hex: '#F9FAFB', inStock: true },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    _id: 'bl_prod_2',
    sku: 'MED-BLO-002',
    title: 'Kinetic™ Tuckable Scrub Top',
    price: 3400.0,
    currency: 'Dzd',
    rating: 5.0,
    reviewsCount: 1120,
    category: 'Blouses',
    badge: { text: 'TOP RATED', type: 'gray' },
    description: 'Contoured Side Panels • Hidden Zip Pocket',
    sizes: ['XS', 'S', 'M', 'L', '2XL'],
    colors: [
      { id: 'col_2', name: 'Navy', hex: '#1F2937', inStock: true },
      { id: 'col_4', name: 'Black', hex: '#111827', inStock: true },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    _id: 'bl_prod_3',
    sku: 'MED-BLO-003',
    title: 'Strata™ Zip-Front Clinical Top',
    price: 4200.0,
    currency: 'Dzd',
    rating: 4.8,
    reviewsCount: 530,
    category: 'Blouses',
    badge: { text: 'NEW', type: 'light-green' },
    description: 'Antimicrobial Silver-Ion • Micro-Mesh Vents',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { id: 'col_1', name: 'Sage Green', hex: '#829384', inStock: true },
      { id: 'col_4', name: 'Black', hex: '#111827', inStock: true },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
  },
];

const BlouseCard = ({ product, onAddToCart, onProductClick }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'S');
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleQuickAdd = async (e) => {
    e.stopPropagation();
    setIsAdding(true);

    const cartPayload = {
      productId: product._id || product.id,
      sku: product.sku || `MED-${product._id}`,
      title: product.title,
      price: Number(product.price),
      currency: product.currency || 'Dzd',
      selectedColor,
      selectedSize,
      quantity: 1,
      variantImage: product.imageUrl,
    };

    if (onAddToCart) await onAddToCart(cartPayload);

    setIsAdding(false);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div className="bg-white rounded-3xl p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group">
      <div 
        onClick={handleCardClick}
        className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-4 cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#0F3844] text-white">
              {product.badge.text}
            </span>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition text-gray-700"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
        </button>

        <button
          onClick={handleQuickAdd}
          disabled={isAdding}
          className={`absolute bottom-3 right-3 z-10 p-3 rounded-full shadow-md transition flex items-center justify-center ${
            isAdded ? 'bg-emerald-600 text-white' : 'bg-[#0F3844] hover:bg-[#0a2831] text-white'
          }`}
        >
          {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      </div>

      <div className="px-1 flex-1 flex flex-col justify-between">
        <div onClick={handleCardClick} className="cursor-pointer">
          <div className="flex items-center space-x-1.5 mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-900">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewsCount})</span>
          </div>

          <h3 className="text-sm font-bold text-[#0F3844] leading-snug mb-1 line-clamp-1 hover:underline">
            {product.title}
          </h3>
          <div className="text-sm font-extrabold text-[#0F3844] mb-1">{product.price} {product.currency || 'Dzd'}</div>
          <p className="text-[11px] text-gray-400 mb-3">{product.description}</p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5">
            {product.colors?.map((color) => (
              <button
                key={color.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`w-4 h-4 rounded-full transition ${
                  selectedColor?.id === color.id ? 'ring-2 ring-offset-1 ring-[#0F3844] scale-110' : ''
                }`}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>

          <div className="flex items-center space-x-1 text-[10px] font-bold text-gray-500 uppercase">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-1 py-0.5 rounded transition ${
                  selectedSize === size ? 'bg-[#0F3844] text-white font-extrabold' : 'hover:text-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Blouses = ({ onBackToHome, onAddToCart, onProductClick }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 px-4 sm:px-8 md:px-12 lg:px-16 font-sans">
      <div className="max-w-7xl mx-auto">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-600 hover:text-[#0F3844] mb-6 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="mb-8 pb-6 border-b border-gray-200/60">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-1.5 block">
            COLLECTION
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F3844] tracking-tight mb-2">
            Blouses
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Where modern elegance meets clinical performance and effortless mobility ({MOCK_BLOUSES_DATA.length} items)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_BLOUSES_DATA.map((product) => (
            <BlouseCard
              key={product._id || product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Blouses.propTypes = {
  onBackToHome: PropTypes.func,
  onAddToCart: PropTypes.func,
  onProductClick: PropTypes.func,
};

export default Blouses;