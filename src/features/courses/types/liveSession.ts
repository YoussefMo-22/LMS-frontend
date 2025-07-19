export interface LiveSession {
  _id: string;
  course_id: string;
  instructor_id: string | { _id: string; name: string; email: string };
  title: string;
  description: string;
  session_link: string;
  scheduled_at: string;
  duration_minutes: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface LiveSessionResponse {
  message?: string;
  liveSession: LiveSession;
}

export interface LiveSessionListResponse {
  status: string;
  results: number;
  data: LiveSession[];
} 