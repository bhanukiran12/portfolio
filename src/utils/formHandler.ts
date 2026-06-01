export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgonrwjz';

export interface WorkWithMeFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectTypes: string[];
  collaborationType: string;
  onsite: string;
  onsiteLocation?: string;
  productName: string;
  productDescription: string;
  targetUsers: string;
  managementDetails: string;
  salesDetails: string;
  techPreferences?: string;
  timeline: string;
  budget?: string;
  additionalNotes?: string;
}

function formatWorkWithMeMessage(data: WorkWithMeFormData): string {
  const lines = [
    '--- Work with me inquiry ---',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    data.phone ? `Phone: ${data.phone}` : null,
    `Project types: ${data.projectTypes.join(', ') || '—'}`,
    `Collaboration: ${data.collaborationType}`,
    `Onsite: ${data.onsite}${data.onsiteLocation ? ` (${data.onsiteLocation})` : ''}`,
    '',
    `Product / idea: ${data.productName}`,
    '',
    '--- Product ---',
    data.productDescription,
    '',
    '--- Target users ---',
    data.targetUsers,
    '',
    '--- Management & team ---',
    data.managementDetails,
    '',
    '--- Sales & go-to-market ---',
    data.salesDetails,
    data.techPreferences ? `\n--- Tech preferences ---\n${data.techPreferences}` : null,
    '',
    `Timeline: ${data.timeline}`,
    data.budget ? `Budget: ${data.budget}` : null,
    data.additionalNotes ? `\n--- Additional notes ---\n${data.additionalNotes}` : null,
  ];
  return lines.filter(Boolean).join('\n');
}

export const submitWorkWithMeForm = async (
  formData: WorkWithMeFormData
): Promise<{ success: boolean; message: string }> => {
  try {
    const message = formatWorkWithMeMessage(formData);
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company ?? '',
        phone: formData.phone ?? '',
        project_types: formData.projectTypes.join(', '),
        collaboration_type: formData.collaborationType,
        onsite: formData.onsite,
        product_name: formData.productName,
        message,
        _replyto: formData.email,
        _subject: `Work with me: ${formData.productName} — ${formData.name}`,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: 'Details sent successfully. I will review and get back to you within 24–48 hours.',
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
