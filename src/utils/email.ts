import emailjs from '@emailjs/browser';

export interface EmailData {
  from_name: string;
  reply_to: string;
  company: string;
  subject: string;
  message: string;
}

export const sendEmail = async (formElement: HTMLFormElement): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS configuration missing. Please check environment variables.');
  }

  try {
    await emailjs.sendForm(serviceId, templateId, formElement, {
      publicKey: publicKey,
    });
  } catch (error) {
    console.error('EmailJS error:', error);
    throw new Error('Failed to send email. Please try again.');
  }
};

export const validateEmailJSConfig = (): boolean => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  return !!(serviceId && templateId && publicKey);
};
