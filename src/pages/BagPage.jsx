import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Check, Trash2, ShoppingBag, ChevronDown } from 'lucide-react';

const ALGERIAN_WILAYAS = [
  '01 - Adrar', '02 - Chlef', '03 - Laghouat', '04 - Oum El Bouaghi', '05 - Batna',
  '06 - Béjaïa', '07 - Biskra', '08 - Béchar', '09 - Blida', '10 - Bouira',
  '11 - Tamanrasset', '12 - Tébessa', '13 - Tlemcen', '14 - Tiaret', '15 - Tizi Ouzou',
  '16 - Alger', '17 - Djelfa', '18 - Jijel', '19 - Sétif', '20 - Saïda',
  '21 - Skikda', '22 - Sidi Bel Abbès', '23 - Annaba', '24 - Guelma', '25 - Constantine',
  '26 - Médéa', '27 - Mostaganem', "28 - M'Sila", '29 - Mascara', '30 - Ouargla',
  '31 - Oran', '32 - El Bayadh', '33 - Illizi', '34 - Bordj Bou Arreridj', '35 - Boumerdès',
  '36 - El Tarf', '37 - Tindouf', '38 - Tissemsilt', '39 - El Oued', '40 - Khenchela',
  '41 - Souk Ahras', '42 - Tipaza', '43 - Mila', '44 - Aïn Defla', '45 - Naâma',
  '46 - Aïn Témouchent', '47 - Ghardaïa', '48 - Relizane', '49 - Timimoun',
  '50 - Bordj Badji Mokhtar', '51 - Ouled Djellal', '52 - Béni Abbès', '53 - In Salah',
  '54 - In Guezzam', '55 - Touggourt', '56 - Djanet', "57 - El M'Ghair", '58 - El Meniaa',
  '59 - Aflou', '60 - Barika', '61 - El Kantara', '62 - Bir El Ater', '63 - El Aricha',
  '64 - Ksar Chellala', '65 - Aïn Ouessara', '66 - Messaad', '67 - Ksar El Boukhari',
  '68 - Bou Saâda', '69 - El Abiodh Sidi Cheikh',
];

const BagPage = ({ cart = [], onBackToHome, onConfirmOrder, onRemoveItem }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [deliveryService] = useState('ZR Express');
  const [deliveryType, setDeliveryType] = useState('Stopdesk');
  const [wilaya, setWilaya] = useState('16 - Alger');
  const [isBoxedOrder, setIsBoxedOrder] = useState(false);

  const [isWilayaOpen, setIsWilayaOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);

  const wilayaRef = useRef(null);
  const typeRef = useRef(null);

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wilayaRef.current && !wilayaRef.current.contains(event.target)) {
        setIsWilayaOpen(false);
      }
      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setIsTypeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16 px-4 text-center font-sans">
        <div className="max-w-md mx-auto bg-[#FAF8F5] rounded-3xl p-8 border border-gray-100 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-[#0F3844] mb-2">Votre panier est vide</h2>
          <p className="text-xs text-gray-500 mb-6">
            Vous n'avez encore ajouté aucun article à votre panier.
          </p>
          <button
            onClick={onBackToHome}
            className="bg-[#0F3844] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#0a2831] transition"
          >
            Découvrir les produits
          </button>
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  
  const deliveryFee = deliveryType === 'Stopdesk' ? 400 : 700;
  const boxFee = isBoxedOrder ? 250 : 0;
  const grandTotal = subtotal + deliveryFee + boxFee - appliedDiscount;
  const totalArticles = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\s+/g, '');
    setPhone(value);
    if (phoneError) setPhoneError('');
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MEDNA10') {
      setAppliedDiscount(subtotal * 0.1);
      setPromoError('');
    } else {
      setAppliedDiscount(0);
      setPromoError('Code promo invalide');
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const dzPhoneRegex = /^(05|06|07)[0-9]{8}$/;
    if (!dzPhoneRegex.test(phone)) {
      setPhoneError('Veuillez entrer un numéro valide (ex: 06XXXXXXXX)');
      return;
    }

    const orderData = {
      customer: { fullName, phone },
      shipping: { deliveryService, deliveryType, wilaya },
      isBoxedOrder,
      items: cart,
      summary: {
        subtotal,
        deliveryFee,
        boxFee,
        discount: appliedDiscount,
        total: grandTotal,
      },
    };

    if (onConfirmOrder) {
      onConfirmOrder(orderData);
    } else {
      alert('Commande confirmée avec succès !');
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-8 md:px-12 lg:px-16 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Bouton Retour */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 text-xs font-bold text-gray-500 hover:text-[#0F3844] mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continuer mes achats</span>
        </button>

        {/* Grille 2 Boxes Séparées */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* BOX 1 (GAUCHE): Formulaire des Coordonnées & Livraison */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    NOM COMPLET
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-gray-200/80 rounded-xl px-4 py-3 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0F3844]"
                    placeholder="Dr. Amine Mansouri"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    TELEPHONE
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`w-full bg-white border ${
                      phoneError ? 'border-red-500' : 'border-gray-200/80'
                    } rounded-xl px-4 py-3 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0F3844]`}
                    placeholder="06XXXXXXXX"
                  />
                  {phoneError && (
                    <p className="text-[10px] text-red-500 font-medium mt-1">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                  SERVICE DE LIVRAISON
                </label>
                <div className="w-full bg-white border border-gray-200/80 rounded-xl px-4 py-3 text-xs font-medium text-gray-800">
                  {deliveryService}
                </div>
              </div>

              <div className="relative" ref={typeRef}>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                  TYPE DE LIVRAISON
                </label>
                <button
                  type="button"
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  className="w-full bg-white border border-gray-200/80 rounded-xl px-4 py-3 text-xs font-medium text-gray-800 flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#0F3844] cursor-pointer"
                >
                  <span>{deliveryType === 'Stopdesk' ? 'Stopdesk (Bureau)' : 'À domicile'}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTypeOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div
                      onClick={() => { setDeliveryType('Stopdesk'); setIsTypeOpen(false); }}
                      className={`px-4 py-3 text-xs font-medium cursor-pointer hover:bg-gray-50 transition ${
                        deliveryType === 'Stopdesk' ? 'bg-[#0F3844] text-white font-bold' : 'text-gray-800'
                      }`}
                    >
                      Stopdesk (Bureau)
                    </div>
                    <div
                      onClick={() => { setDeliveryType('A domicile'); setIsTypeOpen(false); }}
                      className={`px-4 py-3 text-xs font-medium cursor-pointer hover:bg-gray-50 transition ${
                        deliveryType === 'A domicile' ? 'bg-[#0F3844] text-white font-bold' : 'text-gray-800'
                      }`}
                    >
                      À domicile
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={wilayaRef}>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                  WILAYA
                </label>
                <button
                  type="button"
                  onClick={() => setIsWilayaOpen(!isWilayaOpen)}
                  className="w-full bg-white border border-gray-200/80 rounded-xl px-4 py-3 text-xs font-medium text-gray-800 flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#0F3844] cursor-pointer"
                >
                  <span>{wilaya}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isWilayaOpen ? 'rotate-180' : ''}`} />
                </button>

                {isWilayaOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto divide-y divide-gray-100">
                    {ALGERIAN_WILAYAS.map((w) => (
                      <div
                        key={w}
                        onClick={() => {
                          setWilaya(w);
                          setIsWilayaOpen(false);
                        }}
                        className={`px-4 py-2.5 text-xs font-medium cursor-pointer hover:bg-[#0F3844] hover:text-white transition ${
                          wilaya === w ? 'bg-gray-100 text-[#0F3844] font-bold' : 'text-gray-700'
                        }`}
                      >
                        {w}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div 
                onClick={() => setIsBoxedOrder(!isBoxedOrder)}
                className="bg-white border border-gray-200/80 rounded-xl p-4 flex items-start space-x-3 cursor-pointer hover:border-gray-300 transition"
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition ${
                  isBoxedOrder ? 'bg-[#0F3844] border-[#0F3844] text-white' : 'border-gray-300 bg-white'
                }`}>
                  {isBoxedOrder && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="flex-1 flex items-start justify-between">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-[#0F3844] block">
                      WOULD YOU PREFER A BOXED ORDER
                    </span>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Boîte rigide signature Medna avec ruban et carte de vœux personnalisée.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#0F3844] whitespace-nowrap pl-2">
                    + 250 DA
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0F3844] hover:bg-[#0a2831] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-[0.99]"
              >
                Confirm Order
              </button>

            </form>
          </div>

          {/* BOX 2 (DROITE): Box Résumé de la Commande */}
          <div className="lg:col-span-5 bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/60 mb-6">
                <div>
                  <h2 className="text-sm font-bold text-[#0F3844]">
                    Resume de la commande
                  </h2>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {totalArticles} {totalArticles > 1 ? 'ARTICLES' : 'ARTICLE'}
                  </span>
                </div>
                <span className="text-sm font-bold text-[#0F3844]">
                  {subtotal.toLocaleString()} DA
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.productId}-${item.selectedColor?.id}-${item.selectedSize}-${idx}`}
                    className="flex items-center justify-between space-x-3"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.variantImage || item.imageUrl}
                        alt={item.title}
                        className="w-14 h-16 object-cover rounded-lg border border-gray-200 bg-white"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#0F3844]">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 font-medium">
                          {item.selectedColor?.name || 'Standard'} · {item.selectedSize || 'M'} · x{item.quantity || 1}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#0F3844]">
                        {((Number(item.price) || 0) * (item.quantity || 1)).toLocaleString()} DA
                      </span>
                      {onRemoveItem && (
                        <button
                          onClick={() => onRemoveItem(item)}
                          className="text-gray-300 hover:text-red-500 transition p-1"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6 pt-4 border-t border-gray-200/60">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                  CODE PROMO
                </label>
                <form onSubmit={handleApplyPromo} className="flex space-x-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="MEDNA10"
                    className="flex-1 bg-white border border-gray-200/80 rounded-xl px-4 py-2.5 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#0F3844]"
                  />
                  <button
                    type="submit"
                    className="bg-[#0F3844] hover:bg-[#0a2831] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
                  >
                    Appliquer
                  </button>
                </form>
                {promoError && (
                  <p className="text-[11px] text-red-500 font-medium mt-1.5">
                    {promoError}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-gray-200/60 text-xs text-gray-600 font-medium">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-bold text-gray-800">{subtotal.toLocaleString()} DA</span>
              </div>

              <div className="flex justify-between">
                <div>
                  <span className="block">Livraison</span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    {wilaya.split('-')[1] || wilaya} · {deliveryType}
                  </span>
                </div>
                <span className="font-bold text-gray-800">{deliveryFee} DA</span>
              </div>

              {isBoxedOrder && (
                <div className="flex justify-between">
                  <span>Coffret cadeau Medna</span>
                  <span className="font-bold text-gray-800">250 DA</span>
                </div>
              )}

              {appliedDiscount > 0 && (
                <div className="flex justify-between">
                  <span>Remise</span>
                  <span className="font-bold text-emerald-600">
                    - {appliedDiscount.toLocaleString()} DA
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-gray-300 text-sm font-extrabold text-[#0F3844]">
                <span>Total</span>
                <span className="text-base">{grandTotal.toLocaleString()} DA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

BagPage.propTypes = {
  cart: PropTypes.array,
  onBackToHome: PropTypes.func,
  onConfirmOrder: PropTypes.func,
  onRemoveItem: PropTypes.func,
};

export default BagPage;