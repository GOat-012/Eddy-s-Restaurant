export interface Review {
  id: string;
  name: string;
  rating: number; // 1 to 5
  text: string;
  date: string;
  photos: string[]; // Base64 or image URLs
  isDemo?: boolean;
}
