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
  slug:string;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: number;
  slug?: string;
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
  whatsapp:string;
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
export interface SEO {
  slug: string;
  canonical_url: string;
  meta_title: string;
  meta_description: string;
  h1_tag: string;
  image_alt: string;
  focus_words: string[];
  h2_tags: string[];
  h3_tags: string[];
}

export interface HomeData {
   seo?: SEO; 
  hero_section: HeroSection;
  counters: Counter[];
  about_section: AboutSection;
  services: Service[];
  products: Product[];
  testimonials: Testimonial[];
  companies: Company[];
  footer: FooterData;
}

const browserRequests = new Map<string, { expires: number; promise: Promise<HomeData> }>();

// Share the server payload with components that also consume /home in the browser.
export function seedHomeData(language: string, data: HomeData) {
  if (typeof window !== 'undefined') {
    browserRequests.set(language, { expires: Date.now() + 60_000, promise: Promise.resolve(data) });
  }
}

export const getHomeData = (language: string = 'en'): Promise<HomeData> => {
  const cached = typeof window !== 'undefined' ? browserRequests.get(language) : undefined;
  if (cached && cached.expires > Date.now()) return cached.promise;

  const promise = fetchHomeData(language);
  if (typeof window !== 'undefined') {
    browserRequests.set(language, { expires: Date.now() + 60_000, promise });
    void promise.catch(() => {
      if (browserRequests.get(language)?.promise === promise) browserRequests.delete(language);
    });
  }
  return promise;
};

async function fetchHomeData(language: string): Promise<HomeData> {
  const response = await fetch('https://admin.glprint-eg.com/api/home', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': language,
    
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data.data;
}
