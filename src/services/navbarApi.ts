export interface NavbarProduct {
  id: number;
  name: string;
}

export interface NavbarService {
  id: number;
  title: string;
  products: NavbarProduct[];
}

export interface NavbarIndustry {
  id: number;
  name: string;
  products: NavbarProduct[];
}

export interface NavbarData {
  services: NavbarService[];
  industries: NavbarIndustry[];
  products: NavbarProduct[];
}

export interface NavbarResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    navbar: NavbarData;
  };
}

export const getNavbarData = async (language: string = 'en'): Promise<NavbarResponse> => {
  console.log('🔄 Fetching navbar data with language:', language);
  
  const response = await fetch('https://glprint-eg.com/api/navbar', {
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
  console.log('✅ Navbar data received with language:', language);
  return data;
};