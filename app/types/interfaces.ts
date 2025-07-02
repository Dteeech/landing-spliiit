export interface Service {
    name: string;
    price: number;
    logo: string;
    color: string;
  }

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface ReassuranceItem {
  icon: any;
  text: string;
  description: string;
  color: string;
}