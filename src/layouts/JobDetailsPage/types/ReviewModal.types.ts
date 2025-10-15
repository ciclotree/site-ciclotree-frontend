export interface ReviewFormData {
    rating: number;
    reviewDescription: string;
    userCompany?: string;
    verificationType: "email";
    contact: string;
    code: string;
  }