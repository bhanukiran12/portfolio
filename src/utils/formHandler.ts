// Contact form handler utility using EmailJS
// This handles form submissions to email and can also save to Google Sheets

import emailjs from '@emailjs/browser';

export interface FormData {
  name: string;
  email: string;
  message: string;
}

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
// Get them from: https://www.emailjs.com/docs/

// Your Public Key (from EmailJS dashboard > Account)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

// Your Service ID (from EmailJS dashboard > Email Services)
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';

// Your Template ID (from EmailJS dashboard > Email Templates)
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

export const submitForm = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Check if EmailJS is configured
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
        EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
      
      // Fall back to demo mode - simulate success for testing UI
      console.log('Form data (demo mode):', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return {
        success: true,
        message: 'Demo mode: Form submitted! Configure EmailJS to receive real messages.'
      };
    }

    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'bhanukiran750@gmail.com'
      },
      EMAILJS_PUBLIC_KEY
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Message sent successfully! I will get back to you soon.'
      };
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please try again.'
      };
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly.'
    };
  }
};

/*
=================================================================
INSTRUCTIONS TO SET UP EMAILJS (Free - Recommended):
=================================================================

STEP 1: Create EmailJS Account
1. Go to https://www.emailjs.com/ and sign up (free account)
2. Verify your email address

STEP 2: Add Email Service
1. In EmailJS dashboard, click "Email Services" > "Add New Service"
2. Choose "Gmail" (or other email provider)
3. Connect your Gmail account
4. Note the Service ID (e.g., service_xxxxx)

STEP 3: Create Email Template
1. Click "Email Templates" > "Create New Template"
2. Design your email template with:
   - To: bhanukiran750@gmail.com
   - Subject: New Contact from {{from_name}}
   - Body:
     ---
     New message from your portfolio website!
     
     Name: {{from_name}}
     Email: {{from_email}}
     Message: {{message}}
     ---
3. Save the template
4. Note the Template ID (e.g., template_xxxxx)

STEP 4: Get Public Key
1. Click "Account" (in the sidebar)
2. Copy your Public Key

STEP 5: Update This File
1. Open this file (frontend/src/utils/formHandler.ts)
2. Replace:
   - 'YOUR_PUBLIC_KEY' with your actual Public Key
   - 'YOUR_SERVICE_ID' with your Service ID  
   - 'YOUR_TEMPLATE_ID' with your Template ID
3. Save the file

STEP 6: Test
1. Fill out the contact form on your portfolio
2. Check your email for the message

=================================================================
ALTERNATIVE: Using Google Sheets + Email (No Code Required)
=================================================================

If you prefer using Google Sheets without coding:

1. Use a service like SheetDB, WebMerge, or Zapier
2. Or use Google Forms and embed it in your website

For example, with Google Forms:
1. Create a Google Form
2. Click "Send" > "Embed" > copy the iframe code
3. Add it to your Contact section in Home.tsx

=================================================================
VIDEO TUTORIAL:
=================================================================
Check this video for complete setup: https://www.emailjs.com/docs/v3/send-form/
*/
