export interface FAQ {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
}

export interface Banner {
  page_key: string;
  title: string;
  image_url: string;
}

export interface FAQsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    banner?: Banner;
    faqs: FAQ[];
  };
}

export const getFAQs = async (
  language: string = 'en'
): Promise<FAQsResponse> => {
  const response = await fetch('https://glprint-eg.com/api/faq', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': language,
      'lang': language,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};