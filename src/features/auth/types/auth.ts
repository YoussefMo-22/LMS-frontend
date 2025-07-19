export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  provider?: 'facebook' | 'google';
  photo?: string;
  __v: number;
  // Additional fields for enhanced user management
  status?: 'active' | 'inactive' | 'pending' | 'suspended';
  profile?: {
    bio?: string;
    avatar?: string;
    phone?: string;
    location?: string;
    website?: string;
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
    };
  };
  preferences?: {
    emailNotifications?: boolean;
    pushNotifications?: boolean;
    language?: string;
    timezone?: string;
  };
  // Student-specific fields
  studentProfile?: {
    enrolledCourses?: string[];
    completedCourses?: string[];
    certificates?: string[];
    progress?: {
      totalCourses: number;
      completedCourses: number;
      totalLessons: number;
      completedLessons: number;
      totalAssignments: number;
      completedAssignments: number;
    };
  };
  // Instructor-specific fields
  instructorProfile?: {
    verified?: boolean;
    bio?: string;
    expertise?: string[];
    totalStudents?: number;
    totalCourses?: number;
    totalEarnings?: number;
    rating?: number;
    reviews?: number;
  };
  // Admin-specific fields
  adminProfile?: {
    permissions?: string[];
    lastLogin?: Date;
    activityLog?: any[];
  };
  createdAt?: Date;
  updatedAt?: Date;
  lastLoginAt?: Date;
}

export interface AuthResponse {
  status: string;
  token?: string;
  data?: {
    user: User;
  };
  message?: string;
  userId?: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
  // Additional fields for signup
  phone?: string;
  organization?: string;
  agreeToTerms?: boolean;
  marketingEmails?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  token: string;
}

export interface Verify2FARequest {
  userId: string;
  token: string;
}

export interface Generate2FAResponse {
  status: string;
  qrCode: string;
}

export interface TwoFARequiredResponse {
  message: string;
  userId: string;
}

// User management interfaces
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface UserStatusUpdate {
  userId: string;
  status: 'active' | 'inactive' | 'suspended';
  reason?: string;
}

export interface UserRoleUpdate {
  userId: string;
  role: 'student' | 'instructor' | 'admin';
  reason?: string;
} 