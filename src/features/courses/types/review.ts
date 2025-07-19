export interface Review {
  _id: string;
  course_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    profile_picture?: string;
  };
}

export interface CreateReviewRequest {
  rating: number;
  comment: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
}

export interface ReviewsResponse {
  status: string;
  total: number;
  results: number;
  data: Review[];
}

export interface ReviewResponse {
  status: string;
  data: Review;
}

export interface ReviewsQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface CourseAverageRating {
  _id: string;
  avgRating: number;
  numReviews: number;
}

export interface CourseAverageRatingResponse {
  status: string;
  data: CourseAverageRating;
} 