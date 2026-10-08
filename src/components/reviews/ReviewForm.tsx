import React, { useState, useRef } from "react";
import { X, Star, Upload, Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react";
import { Review } from "./types";

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Review) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Photo File Selection (Up to 5 photos, converted to base64 for instant preview & localStorage)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    const availableSlots = 5 - photos.length;
    if (availableSlots <= 0) {
      setError("You can upload a maximum of 5 photos per review.");
      return;
    }

    const filesToProcess = Array.from(files).slice(0, availableSlots);

    filesToProcess.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are supported.");
        return;
      }

      // Check size (e.g. max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Each image should be under 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotos((prev) => {
            if (prev.length >= 5) return prev;
            return [...prev, result];
          });
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input so user can pick again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!text.trim()) {
      setError("Please write a few words about your experience.");
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      photos,
    };

    onSubmitReview(newReview);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setName("");
      setText("");
      setRating(5);
      setPhotos([]);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FFFDF5] rounded-3xl border border-[#E8E4D5] shadow-2xl p-6 sm:p-8 my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#65736F] hover:text-[#18312E] hover:bg-[#F8F5E8] transition-colors"
          aria-label="Close review modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-12 text-center flex flex-col items-center">
            <CheckCircle2 className="w-16 h-16 text-[#168C82] mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-[#164A43] font-display mb-2">
              Thank you for sharing your experience!
            </h3>
            <p className="text-sm text-[#65736F]">
              Your review has been added to Eddy’s Restaurant.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#168C82] block mb-1">
                Guest Feedback
              </span>
              <h3 className="text-2xl font-bold text-[#164A43] font-display">
                Write a Review
              </h3>
              <p className="text-xs text-[#65736F] mt-0.5">
                Share your food, dining, and hospitality thoughts at Eddy’s.
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name Input */}
            <div>
              <label htmlFor="reviewer-name" className="block text-xs font-bold text-[#164A43] uppercase tracking-wider mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="reviewer-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Sharma"
                required
                className="w-full px-4 py-2.5 bg-white border border-[#D5D0C0] rounded-xl text-sm text-[#18312E] placeholder-[#8A9692] focus:outline-none focus:border-[#168C82] focus:ring-1 focus:ring-[#168C82] transition-colors"
              />
            </div>

            {/* Interactive 1–5 Star Selector */}
            <div>
              <label className="block text-xs font-bold text-[#164A43] uppercase tracking-wider mb-1.5">
                Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled =
                      hoverRating !== null ? star <= hoverRating : star <= rating;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 text-[#F4C430] hover:scale-115 transition-transform focus:outline-none"
                        aria-label={`Rate ${star} out of 5 stars`}
                      >
                        <Star
                          className={`w-6 h-6 ${
                            isFilled
                              ? "fill-[#F4C430] text-[#F4C430]"
                              : "text-[#D5D0C0] fill-none"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs font-bold text-[#168C82] ml-1">
                  {rating === 5
                    ? "Excellent"
                    : rating === 4
                    ? "Very Good"
                    : rating === 3
                    ? "Average"
                    : rating === 2
                    ? "Below Average"
                    : "Poor"}
                </span>
              </div>
            </div>

            {/* Review Textarea */}
            <div>
              <label htmlFor="review-text" className="block text-xs font-bold text-[#164A43] uppercase tracking-wider mb-1.5">
                Your Review <span className="text-red-500">*</span>
              </label>
              <textarea
                id="review-text"
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell us what you enjoyed most — favourite dishes, flavours, service..."
                required
                className="w-full px-4 py-2.5 bg-white border border-[#D5D0C0] rounded-xl text-sm text-[#18312E] placeholder-[#8A9692] focus:outline-none focus:border-[#168C82] focus:ring-1 focus:ring-[#168C82] transition-colors resize-none"
              />
            </div>

            {/* Add Photos Section (Up to 5) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#164A43] uppercase tracking-wider">
                  Add Photos ({photos.length}/5)
                </label>
                <span className="text-[11px] text-[#65736F]">
                  Upload up to 5 photos
                </span>
              </div>

              {/* Photo Previews with × Remove */}
              {photos.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-xl overflow-hidden border border-[#D5D0C0] group bg-stone-100"
                    >
                      <img
                        src={photo}
                        alt={`Upload preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/75 hover:bg-red-600 text-white transition-colors"
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              {photos.length < 5 && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="review-photo-upload"
                  />
                  <label
                    htmlFor="review-photo-upload"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-[#168C82]/40 hover:border-[#168C82] bg-[#EBF8F6]/50 hover:bg-[#EBF8F6] text-[#168C82] font-semibold text-xs cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Select photos from your device</span>
                  </label>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#168C82] hover:bg-[#0F766E] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
