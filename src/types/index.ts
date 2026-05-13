export * from './product';
export * from './order';

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}
