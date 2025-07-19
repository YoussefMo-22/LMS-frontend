export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export interface Question {
  _id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  options?: string[];
  correct_answer: string;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface CreateQuestionRequest {
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  options?: string[];
  correct_answer: string;
  points: number;
}

export interface UpdateQuestionRequest {
  question_text?: string;
  question_type?: QuestionType;
  options?: string[];
  correct_answer?: string;
  points?: number;
}

export interface QuestionsResponse {
  status: string;
  total: number;
  results: number;
  data: Question[];
}

export interface QuestionResponse {
  status: string;
  data: Question;
}

export interface QuestionsQueryParams {
  question_type?: QuestionType;
  page?: number;
  limit?: number;
} 