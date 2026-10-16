import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import HeroSection from './components/home/HeroSection';
import Bestsellers from './components/home/Bestsellers';
import Categories from './components/home/Categories';
import HeroArmor from './components/home/HeroArmor';
import FourPillars from './components/home/FourPillars';
import Testimonials from './components/home/Testimonials';
import Footer from './components/common/Footer';
import WomensScrubs from './pages/WomensScrubs';
import Blouses from './pages/Blouses';
import Accessories from './pages/Accessories';
import ProductDetails from './pages/ProductDetails';
import BagPage from './pages/BagPage';
import ShopPage from './pages/ShopPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Navigation vers la Home Page
  const handleGoHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBag = () => {
    setCurrentPage('bag');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenShop = () => {
    setCurrentPage('shop');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Redirection globale vers les pages de catégories & la ShopPage
  const handleCategoryClick = (category) => {
    const title = (category.title || category.label || '').toLowerCase().trim();
    const id = (category.id || '').toLowerCase().trim();

    if (id === 'shop' || title === 'shop' || title.includes('shop all')) {
      setCurrentPage('shop');
    } else if (id.includes('women') || title.includes('women')) {
      setCurrentPage('womens-scrubs');
    } else if (id.includes('blouse') || title.includes('blouse')) {
      setCurrentPage('blouses');
    } else if (id.includes('accessor') || title.includes('accessor')) {
      setCurrentPage('accessories');
    } else {
      setCurrentPage('home');
    }

    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gestion des liens de la Navbar
  const handleNavbarClick = (linkItem) => {
    const title = (linkItem.title || linkItem.label || '').toLowerCase().trim();

    if (title === 'shop' || title === 'shop all') {
      handleOpenShop();
    } else if (title.includes('category') || title.includes('categories')) {
      // 1. Shop By Category -> Smooth Scroll vers la section Categories f l-Home
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const catElement = document.getElementById('categories-section');
          if (catElement) catElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const catElement = document.getElementById('categories-section');
        if (catElement) catElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (title.includes('about')) {
      // 2. About Us -> Smooth Scroll vers le Footer f l-taht ga3
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const footerElement = document.getElementById('footer-section');
          if (footerElement) {
            footerElement.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const footerElement = document.getElementById('footer-section');
        if (footerElement) {
          footerElement.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      }
    } else if (title.includes('bestseller')) {
      // 3. Bestsellers -> Smooth Scroll
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const bestElement = document.getElementById('bestsellers-section');
          if (bestElement) bestElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const bestElement = document.getElementById('bestsellers-section');
        if (bestElement) bestElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (title.includes('story')) {
      // 4. Our Story -> Smooth Scroll
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const storyElement = document.getElementById('story-section');
          if (storyElement) storyElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const storyElement = document.getElementById('story-section');
        if (storyElement) storyElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      handleCategoryClick(linkItem);
    }
  };

  const handleAddToCart = (cartPayload) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.productId === cartPayload.productId &&
          item.selectedColor?.id === cartPayload.selectedColor?.id &&
          item.selectedSize === cartPayload.selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevCart, { ...cartPayload, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.productId === itemToRemove.productId &&
            item.selectedColor?.id === itemToRemove.selectedColor?.id &&
            item.selectedSize === itemToRemove.selectedSize
          )
      )
    );
  };

  const handleConfirmOrder = (orderData) => {
    alert(`Commande enregistrée pour ${orderData.customer.fullName} !`);
    setCart([]);
    handleGoHome();
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white font-sans antialiased flex flex-col justify-between">
      <div>
        <Navbar 
          cartCount={totalCartCount} 
          onNavClick={handleNavbarClick}
          onLogoClick={handleGoHome}
          onCartClick={handleOpenBag}
          onProductClick={handleProductClick}
        />

        {currentPage === 'shop' && (
          <ShopPage
            onBackToHome={handleGoHome}
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        )}

        {currentPage === 'bag' && (
          <BagPage
            cart={cart}
            onBackToHome={handleGoHome}
            onConfirmOrder={handleConfirmOrder}
            onRemoveItem={handleRemoveFromCart}
          />
        )}

        {currentPage === 'product-details' && (
          <ProductDetails
            product={selectedProduct}
            onBackToHome={handleGoHome}
            onCategoryClick={handleCategoryClick}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'womens-scrubs' && (
          <WomensScrubs 
            onBackToHome={handleGoHome} 
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        )}

        {currentPage === 'blouses' && (
          <Blouses 
            onBackToHome={handleGoHome} 
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        )}

        {currentPage === 'accessories' && (
          <Accessories 
            onBackToHome={handleGoHome} 
            onAddToCart={handleAddToCart}
            onProductClick={handleProductClick}
          />
        )}

        {currentPage === 'home' && (
          <>
            <HeroSection onPrimaryCtaClick={handleOpenShop} />

            <div id="bestsellers-section">
              <Bestsellers onAddToCart={handleAddToCart} onProductClick={handleProductClick} />
            </div>

            <div id="categories-section">
              <Categories onCategoryClick={handleCategoryClick} />
            </div>

            <div id="story-section">
              <HeroArmor />
              <FourPillars />
            </div>

            <div id="testimonials-section">
              <Testimonials />
            </div>
          </>
        )}
      </div>

      <div id="footer-section">
        <Footer onCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
}

export default App;