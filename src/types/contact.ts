export interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export interface ContactFormProps {
  className?: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
