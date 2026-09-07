export interface HeroSlide {
  id: number;
  url: string;
  file_name: string;
  mime_type: string;
  type: string;
}

export interface Counter {
  id: number;
  number: string;
  name: string;
  is_visible: boolean;
  sort_order: number;
}

export interface AboutSection {
  id: number;
  tagline: string;
  title: string;
  description: string;
  button: {
    text: string;
    action_type: string;
  };
  home_images: string[];
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: number;
  service_id: number;
  name: string;
  description: string;
  image: Array<{
    id: number;
    url: string;
    file_name: string;
    mime_type: string;
  }>;
}

export interface Testimonial {
  id: number;
  client_name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface Company {
  id: number;
  logo: string;
}

export interface HeroSection {
  tagline: string;
  title: string;
  description: string;
  primary_button: {
    text: string;
    action_type: string;
  };
  secondary_button: {
    text: string;
    action_type: string;
  };
  slides_images: HeroSlide[];
  counters_section: Counter[];
}
export interface FooterData {
  id: number;
  phone: string;
  email: string;
  address: string;
  working_hours: string;
  location: {
    lat: string;
    long: string;
  };
  social_links: {
    whatsapp: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    tik_tok: string;
  };
}

export interface HomeData {
  hero_section: HeroSection;
  counters: Counter[];
  about_section: AboutSection;
  services: Service[];
  products: Product[];
  testimonials: Testimonial[];
  companies: Company[];
  footer: FooterData;
}

export const getHomeData = async (language: string = 'en'): Promise<HomeData> => {
 
  
  const response = await fetch('https://glprint-eg.com/api/home', {
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

  return data.data;
};