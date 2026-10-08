import React from "react";
import { Star, User, Image as ImageIcon } from "lucide-react";
import { Review } from "./types";

interface ReviewCardProps {
  review: Review;
  onPhotoClick: (photos: string[], index: number) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onPhotoClick }) => {
  return (
    <div className="p-6 rounded-2xl bg-[#FFFDF5] border border-[#E8E4D5] shadow-xs hover:shadow-md hover:border-[#168C82]/40 transition-all flex flex-col justify-between">
      <div>
        {/* Card Header: Avatar / Name / Date & Rating */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBF8F6] border border-[#168C82]/20 flex items-center justify-center text-[#168C82] font-bold text-sm shrink-0">
              {review.name ? review.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-[#164A43] font-display">
                  {review.name}
                </h4>
              </div>
              <span className="text-xs text-[#65736F] font-medium">
                {review.date}
              </span>
            </div>
          </div>

          {/* 1–5 Star Rating */}
          <div className="flex items-center gap-0.5 shrink-0" aria-label={`${review.rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= review.rating
                    ? "text-[#F4C430] fill-[#F4C430]"
                    : "text-[#D5D0C0] fill-none"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Review Text */}
        <p className="text-sm text-[#18312E] leading-relaxed mb-4 whitespace-pre-line">
          {review.text}
        </p>
      </div>

      {/* Customer-Uploaded Photo Gallery (if review contains photos) */}
      {review.photos && review.photos.length > 0 && (
        <div className="pt-3 border-t border-[#F0ECE0]">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#168C82] mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>
              {review.photos.length} {review.photos.length === 1 ? "Photo" : "Photos"}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {review.photos.map((photo, index) => (
              <button
                key={index}
                type="button"
                onClick={() => onPhotoClick(review.photos, index)}
                className="group relative aspect-square rounded-xl overflow-hidden bg-stone-100 border border-[#E8E4D5] hover:border-[#168C82] shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-[#168C82]"
                aria-label={`View photo ${index + 1} from ${review.name}`}
              >
                <img
                  src={photo}
                  alt={`Review photo ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
