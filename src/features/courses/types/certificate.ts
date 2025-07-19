export interface Certificate {
  _id: string;
  sender_id: {
    _id: string;
    name: string;
  };
  receiver_id: string;
  course_id: {
    _id: string;
    title: string;
  };
  issuedAt: string;
  createdAt: string;
}

export interface CertificatesResponse {
  status: string;
  results: number;
  data: {
    certificates: Certificate[];
  };
}

export interface CertificateResponse {
  status: string;
  data: {
    certificate: Certificate;
  };
} 