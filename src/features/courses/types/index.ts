export interface Instructor {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

export interface Course {
  _id: string;
  title: string;
  price: number;
  priceAfterDiscount?: number;
  language?: string;
  Language?: string;
  status: string;
  instructor: Instructor;
  prerequisites: string[];
  whatYouWillLearn: string[];
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CoursesResponse {
  status: string;
  results: number;
  data: {
    courses: Course[];
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
} 