export interface Quiz {
  _id: string;
  course_id: string;
  instructor_id: string;
  title: string;
  time_limit: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateQuizRequest {
  course_id: string;
  title: string;
  time_limit: number;
}

export interface UpdateQuizRequest {
  title?: string;
  time_limit?: number;
}

export interface QuizzesResponse {
  status: string;
  total: number;
  results: number;
  data: Quiz[];
}

export interface QuizResponse {
  status: string;
  data: Quiz;
}

export interface QuizzesQueryParams {
  course_id?: string;
  title?: string;
  page?: number;
  limit?: number;
} 