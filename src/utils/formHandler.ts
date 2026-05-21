export interface FormData {
  name: string;
  email: string;
  message: string;
}

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgonrwjz';

export const submitForm = async (
  formData: FormData
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
        _subject: `Portfolio contact from ${formData.name}`,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Message sent successfully! I will get back to you soon.',
      };
    }

    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or email me directly.',
    };
  }
};
