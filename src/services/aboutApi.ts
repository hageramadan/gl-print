export interface AboutData {
  about: {
    id: number;
    tagline: string;
    title: string;
    description: string;
    button: {
      text: string;
      action_type: string;
    };
    page_main_image: string;
    page_banner_image: string;
  };
  company_values: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
  }>;
  works: Array<{
    id: number;
    step_number: string;
    title: string;
    description: string;
    icon: string;
  }>;
  companies: Array<{
    id: number;
    logo: string;
  }>;
}

export const getAboutData = async (language: string = 'en'): Promise<AboutData> => {
  console.log('🔄 Fetching about data with language:', language);
  
  const response = await fetch('https://glprint-eg.com/api/about-us', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': language,
     
    },
    // cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('✅ About data received with language:', language);
  return data.data;
};