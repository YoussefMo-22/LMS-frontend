export interface Payment {
  _id: string;
  course_id: { _id: string; title: string; price: number } | string;
  student_id: string;
  amount: number;
  payment_method: string;
  payment_date: string;
  [key: string]: any;
}

export interface PaymentListResponse {
  status: string;
  results: number;
  data: {
    payments: Payment[];
  };
}

export interface InstructorEnrollment {
  _id: string;
  user: { _id: string; name: string };
  course: { _id: string; title: string };
  [key: string]: any;
}

export interface InstructorEnrollmentResponse {
  status: string;
  results: number;
  data: {
    enrollments: InstructorEnrollment[];
  };
} 