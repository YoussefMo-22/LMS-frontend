export interface Instructor {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  instructor: string | Instructor;
  status: CourseStatus;
  priceAfterDiscount?: number;
  language?: string;
  Language?: string;
  prerequisites?: string[];
  whatYouWillLearn?: string[];
  image?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CourseStatus = 'draft' | 'pending' | 'published' | 'rejected' | 'archived';

export interface CreateCourseData {
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

export interface UpdateCourseData {
  title?: string;
  description?: string;
  price?: number;
  duration?: string;
  category?: string;
  status?: CourseStatus;
}

export interface CourseFilters {
  keyword?: string;
  page?: number;
  limit?: number;
  sort?: string;
  fields?: string;
  instructorName?: string;
  status?: CourseStatus;
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

export interface SingleCourseResponse {
  status: string;
  data: Course;
}

export interface CreateCourseResponse {
  status: string;
  data: {
    course: Course;
  };
}

export interface UpdateCourseResponse {
  status: string;
  data: Course;
}

export interface DeleteCourseResponse {
  status: string;
  data: Course;
  message: string;
} 