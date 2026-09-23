export interface Banner {
  page_key: string;
  title: string;
  image_url: string;
}

export interface SocialLinks {
  whatsapp?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  tik_tok?: string;
  twitter?: string;
  pinterest?: string;
  
}

export interface ContactData {
  id: number;
  phone: string;
  email: string;
   whatsapp?: string;
  address: string;
  working_hours: string;
  location: {
    lat: string;
    long: string;
  };
  social_links: SocialLinks;
}

export interface ContactResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    banner?: Banner;
    contact: ContactData;
  };
}

export const getContactData = async (
  language: string = 'en'
): Promise<ContactResponse> => {
  const response = await fetch('https://glprint-eg.com/api/contact-us', {
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