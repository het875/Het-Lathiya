# EmailJS Implementation Guide

A comprehensive guide for implementing EmailJS in React applications with TypeScript, environment variables, and custom email templates.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Environment Setup](#environment-setup)
5. [Contact Form Implementation](#contact-form-implementation)
6. [Email Template Creation](#email-template-creation)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)
9. [Best Practices](#best-practices)

## 🎯 Overview

This guide demonstrates how to implement EmailJS in a React TypeScript application to send emails directly from the frontend without a backend server. The implementation includes:

- Contact form with validation
- Environment variable configuration
- Custom HTML email templates
- Success/error handling
- TypeScript support

## 📚 Prerequisites

- React application with TypeScript
- EmailJS account (free tier available)
- Basic knowledge of React hooks and forms

## 🛠 Installation

### 1. Install EmailJS Package

```bash
npm install @emailjs/browser
```

### 2. Create TypeScript Declaration (if needed)

Create `src/declarations.d.ts`:

```typescript
declare module '@emailjs/browser';
```

## ⚙️ Environment Setup

### 1. Create Environment File

Create `.env` in your project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

**Note:** Use `VITE_` prefix for Vite projects, `REACT_APP_` for Create React App.

### 2. Get EmailJS Credentials

1. Sign up at [EmailJS.com](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key

## 📝 Contact Form Implementation

### 1. Basic Contact Component Structure

```typescript
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  // ... rest of component
};
```

### 2. Form Submission Handler

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.current) return;
  
  setStatus(null);
  
  emailjs
    .sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current,
      {
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      }
    )
    .then(
      () => {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", company: "", subject: "", message: "" });
      },
      (error: any) => {
        setStatus("FAILED");
        console.error("EmailJS error:", error);
      }
    );
};
```

### 3. Form Field Mapping

```typescript
const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  
  // Map form field names to state property names
  const fieldMapping: { [key: string]: keyof FormData } = {
    from_name: "name",
    reply_to: "email",
    company: "company",
    subject: "subject",
    message: "message",
  };
  
  const stateField = fieldMapping[name] || name;
  setFormData({
    ...formData,
    [stateField]: value,
  });
};
```

### 4. Complete Form JSX

```tsx
<form ref={form} onSubmit={handleSubmit} className="space-y-6">
  {/* Name Field */}
  <div>
    <label htmlFor="from_name">Name *</label>
    <input
      type="text"
      id="from_name"
      name="from_name"
      required
      value={formData.name}
      onChange={handleChange}
      placeholder="Your full name"
    />
  </div>

  {/* Email Field */}
  <div>
    <label htmlFor="reply_to">Email *</label>
    <input
      type="email"
      id="reply_to"
      name="reply_to"
      required
      value={formData.email}
      onChange={handleChange}
      placeholder="your.email@example.com"
    />
  </div>

  {/* Company Field */}
  <div>
    <label htmlFor="company">Company</label>
    <input
      type="text"
      id="company"
      name="company"
      value={formData.company}
      onChange={handleChange}
      placeholder="Your company (optional)"
    />
  </div>

  {/* Subject Field */}
  <div>
    <label htmlFor="subject">Subject *</label>
    <input
      type="text"
      id="subject"
      name="subject"
      required
      value={formData.subject}
      onChange={handleChange}
      placeholder="Project discussion, etc."
    />
  </div>

  {/* Message Field */}
  <div>
    <label htmlFor="message">Message *</label>
    <textarea
      id="message"
      name="message"
      rows={6}
      required
      value={formData.message}
      onChange={handleChange}
      placeholder="Tell me about your project..."
    />
  </div>

  {/* Submit Button */}
  <button type="submit">Send Message</button>

  {/* Status Messages */}
  {status === "SUCCESS" && (
    <p className="text-green-600">Message sent successfully!</p>
  )}
  {status === "FAILED" && (
    <p className="text-red-600">Failed to send message. Please try again.</p>
  )}
</form>
```

## 📧 Email Template Creation

### 1. EmailJS Template Variables

In your EmailJS template, use these variables:

- `{{from_name}}` - Sender's name
- `{{reply_to}}` - Sender's email
- `{{company}}` - Sender's company
- `{{subject}}` - Email subject
- `{{message}}` - Email message

### 2. Sample Template Subject

```
New Message from {{from_name}} (Company: {{company}})
```

### 3. Sample HTML Email Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Message from {{from_name}}</title>
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .email-container {
            max-width: 650px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .contact-item {
            background: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 15px;
            border-left: 4px solid #667eea;
        }
        
        .message-section {
            background: #ffffff;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #ffffff;
            padding: 16px 32px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>New Portfolio Inquiry</h1>
            <p>Someone is interested in working with you!</p>
        </div>
        
        <div class="content">
            <div class="contact-item">
                <strong>From:</strong> {{from_name}}
            </div>
            
            <div class="contact-item">
                <strong>Email:</strong> {{reply_to}}
            </div>
            
            <div class="contact-item">
                <strong>Company:</strong> {{company}}
            </div>
            
            <div class="message-section">
                <h3>Message:</h3>
                <p>{{message}}</p>
            </div>
            
            <div style="text-align: center;">
                <a href="mailto:{{reply_to}}" class="cta-button">
                    Reply to {{from_name}}
                </a>
            </div>
        </div>
    </div>
</body>
</html>
```

## 🧪 Testing

### 1. Local Testing

```bash
# Start your development server
npm run dev

# Test the contact form with sample data
```

### 2. Validation Checklist

- [ ] Environment variables are loaded correctly
- [ ] Form submission triggers EmailJS
- [ ] Success/error messages display properly
- [ ] Email template receives correct data
- [ ] Email formatting looks professional
- [ ] Mobile responsiveness works

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module '@emailjs/browser'"**
   - Solution: Install the package and create TypeScript declaration

2. **Environment variables not working**
   - Check prefix: `VITE_` for Vite, `REACT_APP_` for CRA
   - Restart development server after adding env vars

3. **EmailJS sending fails**
   - Verify Service ID, Template ID, and Public Key
   - Check browser console for errors
   - Ensure template variables match form field names

4. **Form not resetting after success**
   - Ensure all form fields are included in reset object
   - Check field mapping function

### Debug Tips

```typescript
// Add debugging to form submission
console.log('Environment vars:', {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});

// Add debugging to form data
console.log('Form data:', formData);
console.log('Form element:', form.current);
```

## ✨ Best Practices

### Security

1. **Never expose private keys** - Only use public keys in frontend
2. **Use environment variables** - Don't hardcode credentials
3. **Validate form data** - Both client and server-side validation
4. **Rate limiting** - Configure EmailJS rate limits

### Performance

1. **Lazy load EmailJS** - Only load when needed
2. **Form validation** - Validate before sending
3. **Loading states** - Show loading during submission
4. **Error handling** - Graceful error messages

### User Experience

1. **Clear feedback** - Success/error messages
2. **Form reset** - Clear form after successful submission
3. **Accessibility** - Proper labels and ARIA attributes
4. **Mobile-friendly** - Responsive design

### Code Organization

```
src/
├── components/
│   ├── Contact.tsx          # Main contact component
│   └── ui/
│       ├── Button.tsx       # Reusable button component
│       └── Input.tsx        # Reusable input component
├── utils/
│   └── email.ts            # EmailJS utilities
├── types/
│   └── contact.ts          # TypeScript interfaces
└── declarations.d.ts       # Module declarations
```

## 📖 Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [React Hook Form Integration](https://react-hook-form.com/)
- [Tailwind CSS for Styling](https://tailwindcss.com/)
- [Framer Motion for Animations](https://www.framer.com/motion/)

## 📝 Example Implementation

For a complete working example, refer to the Contact component in this project:

- **File**: `src/components/Contact.tsx`
- **Environment**: `.env`
- **Template**: `email-template.html`

---

**Note**: This guide assumes you're using Vite. For Create React App, replace `import.meta.env` with `process.env` and use `REACT_APP_` prefixes for environment variables.

**Security Reminder**: EmailJS public keys are safe to expose in frontend code, but never expose your private keys or account credentials.
