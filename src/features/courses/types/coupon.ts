export interface Coupon {
  _id: string;
  code: string;
  discount: number;
  expireDate: string;
  maxUses: number;
  courseId: string;
  [key: string]: any;
}

export interface CouponResponse {
  status: string;
  data: {
    coupon: Coupon;
  };
}

export interface CouponListResponse {
  status: string;
  data: {
    coupons: Coupon[];
  };
}

export interface ApplyCouponResponse {
  status: string;
  data: {
    discount: number;
    finalPrice: number;
    courseId: string;
    couponCode: string;
  };
} 