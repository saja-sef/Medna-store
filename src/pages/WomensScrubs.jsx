import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Star, Heart, Plus, Check, ArrowLeft, 
  Loader2 
} from 'lucide-react';

const MOCK_WOMENS_BACKEND_DATA = [
  {
    _id: 'w_prod_1',
    sku: 'MED-WOM-001',
    title: 'AeroForm™ Tailored Scrub Set',
    price: 4500.00,
    currency: 'Dzd',
    rating: 4.9,
    reviewsCount: 1240,
    category: "Women's Scrubs",
    badge: { text: 'RESTOCKED', type: 'dark' },
    description: 'Top & Kinetic Jogger • 3 Smart Pockets',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { id: 'col_1', name: 'Eucalyptus Green', hex: '#586A5A', inStock: true },
      { id: 'col_2', name: 'Navy', hex: '#1F2937', inStock: true },
      { id: 'col_3', name: 'Charcoal', hex: '#4B5563', inStock: true },
      { id: 'col_4', name: 'Rust', hex: '#A0522D', inStock: true },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800&auto=format&fit=crop',
  },
  {
    _id: 'w_prod_2',
    sku: 'MED-WOM-002',
    title: 'Kinetic™ High-Waist Jogger',
    price: 3200.00,
    currency: 'Dzd',
    rating: 5.0,
    reviewsCount: 2410,
    category: "Women's Scrubs",
    badge: { text: 'TOP SELLER', type: 'gray' },
    description: 'Sculpt Rib Waist • 7 Deep Pockets',
    sizes: ['XS', 'S', 'M', 'L', '2XL'],
    colors: [
      { id: 'col_2', name: 'Navy', hex: '#1F2937', inStock: true },
      { id: 'col_4', name: 'Black', hex: '#111827', inStock: true },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
  },
  {
    _id: 'w_prod_3',
    sku: 'MED-WOM-003',
    title: 'Strata™ Clinical Bomber Jacket',
    price: 5800.00,
    currency: 'Dzd',
    rating: 4.8,
    reviewsCount: 840,
    category: "Women's Scrubs",
    badge: { text: 'NEW', type: 'light-green' },
    description: 'Thermal Micro-Fleece • Fluid Shield',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { id: 'col_1', name: 'Sage Green', hex: '#829384', inStock: true },
      { id: 'col_4', name: 'Black', hex: '#111827', inStock: true },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
  },
  {
    _id: 'w_prod_4',
    sku: 'MED-WOM-004',
    title: 'Shift™ Contour Straight Leg Pant',
    price: 3600.00,
    currency: 'Dzd',
    rating: 4.9,
    reviewsCount: 620,
    category: "Women's Scrubs",
    badge: { text: 'BEST FIT', type: 'dark' },
    description: 'Yoga Waistband • Ultra-stretch',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { id: 'col_2', name: 'Navy', hex: '#1F2937', inStock: true },
      { id: 'col_3', name: 'Charcoal', hex: '#4B5563', inStock: true },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=800&auto=format&fit=crop',
  },
];

const WomenProductCard = ({ product, onAddToCart, onToggleWishlist, onProductClick }) => {
  const availableColors = product.colors || [];
  const defaultColor = availableColors.find((c) => c.inStock) || availableColors[0] || null;

  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [currentImage] = useState(product.imageUrl);
  const [isLiked, setIsLiked] = useState(product.isFavorite || false);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleWishlist = async (e) => {
    e.stopPropagation(); 
    const newState = !isLiked;
    setIsLiked(newState);
    if (onToggleWishlist) {
      await onToggleWishlist(product.id || product._id, newState);
    }
  };

  const handleQuickAdd = async (e) => {
    e.stopPropagation();
    if (!selectedColor || !selectedSize) return;
    setIsAdding(true);

    const cartPayload = {
      productId: product.id || product._id,
      sku: product.sku || `MED-${product.id || product._id}`,
      title: product.title,
      price: Number(product.price),
      currency: product.currency || 'Dzd',
      selectedColor: {
        id: selectedColor.id,
        name: selectedColor.name,
        hex: selectedColor.hex,
      },
      selectedSize,
      quantity: 1,
      variantImage: currentImage,
    };

    if (onAddToCart) {
      await onAddToCart(cartPayload);
    }

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
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                product.badge.type === 'dark'
                  ? 'bg-[#0F3844] text-white'
                  : product.badge.type === 'light-green'
                  ? 'bg-[#c5d8c9] text-[#1f3024]'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {product.badge.text}
            </span>
          </div>
        )}

        <button
          onClick={handleWishlist}
          aria-label="Wishlist"
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition active:scale-90 text-gray-700"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-700'
            }`}
          />
        </button>

        <button
          onClick={handleQuickAdd}
          disabled={isAdding || (selectedColor && !selectedColor.inStock)}
          aria-label="Add to Cart"
          className={`absolute bottom-3 right-3 z-10 p-3 rounded-full shadow-md transition active:scale-95 flex items-center justify-center ${
            isAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#0F3844] hover:bg-[#0a2831] text-white disabled:opacity-50'
          }`}
        >
          {isAdding ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : isAdded ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="px-1 flex-1 flex flex-col justify-between">
        <div onClick={handleCardClick} className="cursor-pointer">
          <div className="flex items-center space-x-1.5 mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-900">
              {Number(product.rating || 5.0).toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              ({product.reviewsCount || 0})
            </span>
          </div>

          <h3 className="text-sm font-bold text-[#0F3844] leading-snug mb-1 line-clamp-1 hover:underline">
            {product.title}
          </h3>

          <div className="text-sm font-extrabold text-[#0F3844] mb-1">
            {product.price} {product.currency || 'Dzd'}
          </div>

          <p className="text-[11px] text-gray-400 font-medium line-clamp-1 mb-3">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5">
            {availableColors.map((color) => {
              const isSelected = selectedColor?.id === color.id;
              return (
                <button
                  key={color.id || color.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (color.inStock) setSelectedColor(color);
                  }}
                  disabled={!color.inStock}
                  className={`w-4 h-4 rounded-full transition-all relative ${
                    !color.inStock ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
                  } ${
                    isSelected ? 'ring-2 ring-offset-1 ring-[#0F3844] scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              );
            })}
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
                  selectedSize === size
                    ? 'bg-[#0F3844] text-white font-extrabold'
                    : 'hover:text-black'
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

const WomensScrubs = ({
  onBackToHome,
  onAddToCart,
  onToggleWishlist,
  onProductClick,
}) => {
  const safeProductsList = MOCK_WOMENS_BACKEND_DATA;

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
            Women's Scrubs
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Where modern elegance meets clinical performance and effortless mobility ({safeProductsList.length} items)
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {safeProductsList.map((product) => (
            <WomenProductCard
              key={product._id || product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onProductClick={onProductClick}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

WomensScrubs.propTypes = {
  onBackToHome: PropTypes.func,
  onAddToCart: PropTypes.func,
  onToggleWishlist: PropTypes.func,
  onProductClick: PropTypes.func,
};

export default WomensScrubs;