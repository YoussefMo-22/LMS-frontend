export type LessonContentType = "video" | "pdf" | "text" | "audio" | "other";

export interface Lesson {
  _id: string;
  title: string;
  content_type: LessonContentType;
  content_url: string;
  lesson_order: number;
  course_id?: string;
  [key: string]: any;
}

export interface LessonResponse {
  status: string;
  data: Lesson;
}

export interface LessonListResponse {
  status: string;
  results: number;
  data: Lesson[];
} 