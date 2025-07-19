export interface Earning {
  _id: string;
  course_id: {
    _id: string;
    title: string;
  };
  instructor_id?: {
    _id: string;
    name: string;
  };
  amount: number;
  date: string;
}

export interface EarningsResponse {
  status: string;
  results: number;
  totalEarnings: number;
  data: Earning[];
}

export interface EarningsByCourseParams {
  courseId: string;
}

export interface EarningsByInstructorParams {
  courseId: string;
  instructorId: string;
} 