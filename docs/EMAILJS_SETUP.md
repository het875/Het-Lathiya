# EmailJS Setup Instructions

## Environment Variables Setup

To enable the contact form functionality, you need to set up EmailJS and configure your environment variables.

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key

### 2. Update .env File
Replace the placeholder values in your `.env` file with your actual EmailJS credentials:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

### 3. Email Template Variables
In your EmailJS template, use these variables:
- `{{from_name}}` - Sender's name
- `{{reply_to}}` - Sender's email
- `{{company}}` - Sender's company
- `{{subject}}` - Email subject
- `{{message}}` - Email message

### 4. Sample Template Subject
```
New Message from {{from_name}} (Company: {{company}})
```

### 5. Environment File Security
- The `.env` file is already included in `.gitignore`
- Never commit your actual EmailJS credentials to version control
- Only EmailJS public keys are safe to expose in frontend code

### 6. Testing
After setting up your credentials:
1. Start the development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email for the message

For a complete email template example, refer to the EMAILJS_IMPLEMENTATION_GUIDE.md documentation.
