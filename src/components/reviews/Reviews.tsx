import React, { useState, useEffect } from "react";
import { Star, MessageSquarePlus, MessageCircle } from "lucide-react";
import { Review } from "./types";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";
import { ReviewPhotoViewer } from "./ReviewPhotoViewer";

const LOCAL_STORAGE_KEY = "eddys_restaurant_reviews_v1";

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  // Lightbox state
  const [activePhotos, setActivePhotos] = useState<string[]>([]);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // ignore quota errors
    }
  }, [reviews]);

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleOpenPhoto = (photos: string[], index: number) => {
    setActivePhotos(photos);
    setActivePhotoIndex(index);
    setIsViewerOpen(true);
  };

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <section id="reviews" className="py-16 lg:py-24 bg-[#F8F5E8] border-b border-[#E8E4D5] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF8F6] text-[#168C82] text-xs font-bold uppercase tracking-widest mb-2.5">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Guest Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#164A43] font-display mb-2">
              What Our Guests Say
            </h2>
            <p className="text-sm sm:text-base text-[#65736F] max-w-xl">
              Share your experience at Eddy’s Restaurant.
            </p>
          </div>

          {/* Right Action: Write a Review Button + Rating Summary */}
          <div className="flex items-center gap-4 shrink-0">
            {reviews.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 p-2.5 rounded-2xl bg-white border border-[#E8E4D5] shadow-2xs">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#F4C430] text-[#F4C430]" />
                  <span className="text-sm font-bold text-[#164A43] tabular-nums">
                    {averageRating}
                  </span>
                </div>
                <span className="text-xs text-[#65736F]">
                  ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#168C82] hover:bg-[#0F766E] text-white font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#F4C430]" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onPhotoClick={handleOpenPhoto}
              />
            ))}
          </div>
        ) : (
          /* Empty State as requested */
          <div className="text-center py-16 px-4 rounded-3xl bg-[#FFFDF5] border border-[#E8E4D5] shadow-xs max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#EBF8F6] text-[#168C82] flex items-center justify-center mx-auto mb-4">
              <Star className="w-7 h-7 text-[#F4C430] fill-[#F4C430]" />
            </div>
            <h3 className="text-xl font-bold text-[#164A43] font-display mb-1.5">
              Be the first to review Eddy’s
            </h3>
            <p className="text-sm text-[#65736F] mb-6">
              Share your experience with us.
            </p>
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#168C82] hover:bg-[#0F766E] text-white font-bold text-sm shadow-sm transition-all"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#F4C430]" />
              <span>Write a Review</span>
            </button>
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      <ReviewForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmitReview={handleAddReview}
      />

      {/* Fullscreen Photo Lightbox */}
      {isViewerOpen && (
        <ReviewPhotoViewer
          photos={activePhotos}
          currentIndex={activePhotoIndex}
          onClose={() => setIsViewerOpen(false)}
          onIndexChange={(idx) => setActivePhotoIndex(idx)}
        />
      )}
    </section>
  );
};
