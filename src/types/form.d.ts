// Form-specific type declarations for the LMS application

// Common form field types
export interface FormField {
  id: string;
  value: string;
  error?: string;
}

// Question form specific types
export interface QuestionFormData {
  quiz_id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  options: string[];
  correct_answer: string;
  points: number;
}

// Authentication form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface TwoFAFormData {
  token: string;
}

// Form validation types
export interface FormValidation {
  isValid: boolean;
  errors: Record<string, string>;
}

// Export to make this a module
export {}; 