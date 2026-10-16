import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star, Send } from 'lucide-react';

const DEFAULT_REVIEWS = [
  {
    id: 'rev_1',
    rating: 5,
    text: '"Finally, scrubs that actually look tailored and don\'t feel like a potato sack during 14-hour emergency room rounds. The waist ribbing stays put through constant squatting."',
    authorName: 'Dr. Maya Patel',
    authorRole: 'ER Resident, NYC Health',
    avatarInitials: 'MP',
  },
  {
    id: 'rev_2',
    rating: 5,
    text: '"The jogger silhouette is on par with premium athletic apparel. Trauma shears don\'t pierce the pocket gusset, and fluids bead right off in the trauma bay."',
    authorName: 'Marcus Vance, BSN, RN',
    authorRole: 'Trauma ICU, Chicago',
    avatarInitials: 'MV',
  },
  {
    id: 'rev_3',
    rating: 5,
    text: '"I bought two pairs for our pediatric surgery team. The silver-ion finish keeps them smelling freshly laundered even after 36-hour on-call marathons."',
    authorName: 'Dr. Elena Rostova',
    authorRole: 'Pediatric Surgery Fellow, Boston',
    avatarInitials: 'ER',
  },
];

const Testimonials = ({
  title = "Medna’s Clients",
  reviews = DEFAULT_REVIEWS,
  onSubmitReview,
}) => {
  const [newReview, setNewReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    if (onSubmitReview) {
      onSubmitReview(newReview);
    }

    setNewReview('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="w-full bg-[#f8f9fa] py-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Titre Principal */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F3844] tracking-tight mb-10">
          {title}
        </h2>

        {/* Cards ta3 Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-sm border border-gray-100/80 transition-all duration-300 hover:shadow-md"
            >
              <div>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 italic font-light leading-relaxed mb-6">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#0F3844] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {item.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F3844]">
                    {item.authorName}
                  </h4>
                  <p className="text-xs text-gray-400 font-normal">
                    {item.authorRole}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar  */}
        <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder={
              isSubmitted
                ? "Merci! Your review has been submitted."
                : "Write your review"
            }
            disabled={isSubmitted}
            className="w-full bg-white border border-gray-200/80 rounded-full py-3.5 pl-6 pr-12 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F3844]/20 focus:border-[#0F3844] transition shadow-sm"
          />
          <button
            type="submit"
            disabled={!newReview.trim() || isSubmitted}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#0F3844] hover:bg-gray-100 rounded-full transition disabled:opacity-40 disabled:hover:bg-transparent"
            aria-label="Submit review"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </section>
  );
};

Testimonials.propTypes = {
  title: PropTypes.string,
  reviews: PropTypes.array,
  onSubmitReview: PropTypes.func,
};

export default Testimonials;