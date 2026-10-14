export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgonrwjz';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const submitContactForm = async (
  formData: ContactFormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _replyto: formData.email,
        _subject: `BhanuBeyond enquiry from ${formData.name}`,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Message sent. BhanuBeyond will get back to you within 1–2 business days.',
      };
    }

    return {
      success: false,
      message: 'Could not send. Please try again or email me directly.',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Could not send. Please try again or email me directly.',
    };
  }
};
