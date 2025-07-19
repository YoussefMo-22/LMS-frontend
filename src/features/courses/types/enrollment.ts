export interface Enrollment {
  _id: string;
  user_id: string | EnrollmentUser;
  course_id: string | EnrollmentCourse;
  __v: number;
}

export interface EnrollmentUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

export interface EnrollmentCourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  language: string;
  status: string;
  image: string;
}

export interface EnrollmentResponse {
  status: string;
  message?: string;
  data: {
    url?: string;
    success_url?: string;
    cancel_url?: string;
    expires_at?: string;
    sessionId?: string;
    totalPrice?: number;
    enrollment?: Enrollment;
  };
}

export interface EnrollmentListResponse {
  status: string;
  results?: number;
  data: {
    enrollments: Enrollment[];
  } | Enrollment[];
} 