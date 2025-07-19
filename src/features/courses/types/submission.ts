export interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
}

export interface Assignment {
  _id: string;
  title: string;
  description: string;
  max_points: number;
  due_date: string;
  status?: string;
  instructor_id?: string;
  course_id?: {
    _id: string;
    title: string;
    description: string;
    instructor_id: string;
  };
}

export interface Submission {
  _id: string;
  user_id: User;
  assignment_id: Assignment;
  submission_url: string;
  grade: number | null;
  feedback: string | null;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateSubmissionRequest {
  submission_url: string;
}

export interface UpdateSubmissionRequest {
  submission_url?: string;
  grade?: number;
  feedback?: string;
}

export interface SubmissionsResponse {
  status: string;
  results: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: {
    total: number;
    graded: number;
    ungraded: number;
    averageGrade: number;
  };
  data: {
    submissions: Submission[];
  };
}

export interface SubmissionResponse {
  status: string;
  data: {
    submission: Submission;
  };
}

export interface MySubmissionResponse {
  status: string;
  data: {
    submission: Submission | null;
    message?: string;
  };
}

export interface SubmissionsQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  graded?: string;
  ungraded?: string;
  search?: string;
  assignmentId?: string;
} 