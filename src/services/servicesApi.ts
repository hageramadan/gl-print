export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface ServicesResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    services: Service[];
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
      from: number;
      to: number;
      next_page: number | null;
      previous_page: number | null;
    };
  };
}

export const getServices = async (page: number = 1, language: string = 'en'): Promise<ServicesResponse> => {
  console.log('🔄 Fetching services with language:', language, 'page:', page);
  console.log('📌 Headers:', {
    'Accept-Language': language,
    'lang': language,
  });
  
  const response = await fetch(`https://glprint-eg.com/api/services?page=${page}`, {
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

  const data = await response.json();
  console.log('✅ Services received with language:', language);
  return data;
};