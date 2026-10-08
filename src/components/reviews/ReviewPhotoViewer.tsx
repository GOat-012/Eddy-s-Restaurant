import React, { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ReviewPhotoViewerProps {
  photos: string[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const ReviewPhotoViewer: React.FC<ReviewPhotoViewerProps> = ({
  photos,
  currentIndex,
  onClose,
  onIndexChange,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onIndexChange((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === "ArrowRight") {
        onIndexChange((currentIndex + 1) % photos.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, photos.length, onClose, onIndexChange]);

  if (photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onIndexChange((currentIndex + 1) % photos.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      {/* Top Bar: Counter & Close button */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-white text-xs font-semibold tabular-nums pointer-events-auto">
          {currentIndex + 1} / {photos.length}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/15 transition-all pointer-events-auto shadow-lg"
          aria-label="Close fullscreen photo"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentPhoto}
          alt={`Review photo ${currentIndex + 1}`}
          className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl select-none"
        />

        {/* Previous Button (if multiple photos) */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/65 hover:bg-[#168C82] text-white border border-white/15 transition-all shadow-xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Button (if multiple photos) */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/65 hover:bg-[#168C82] text-white border border-white/15 transition-all shadow-xl"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip (if multiple photos) */}
      {photos.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2 rounded-2xl bg-black/70 border border-white/10 z-20 overflow-x-auto max-w-[90vw]"
          onClick={(e) => e.stopPropagation()}
        >
          {photos.map((photo, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onIndexChange(idx)}
              className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                idx === currentIndex
                  ? "border-[#F4C430] scale-105"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={photo}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
