export interface EmailResponse {
  result: boolean;
  errNum: number;
  message: string;
  data?: any;
}

export const subscribeEmail = async (
  email: string,
  language: string = 'en'
): Promise<EmailResponse> => {
  const response = await fetch('https://glprint-eg.com/api/email-followups', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': language,
      'lang': language,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};