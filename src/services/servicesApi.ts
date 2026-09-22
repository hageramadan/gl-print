export interface ProductInService {
  id: number;
  service_id: number | null;
  industry_id: number | null;
  category_id: number | null;
  name: string;
  slug: string;
  description: string;
  image: Array<{
    id: number;
    url: string;
    file_name: string;
    mime_type: string;
  }>;
  banner_image: string;
}

export interface ServiceSEO {
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

export interface ServiceDetails {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  cover_image: string;
  products: ProductInService[];
  seo: ServiceSEO;
}

export interface Banner {
  page_key: string;
  title: string;
  image_url: string;
}

export interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  next_page: number | null;
  previous_page: number | null;
}

export interface Service {
  id: number;
  title: string;
  slug?: string;
  description: string;
  icon: string;
  image?: string;
}

export interface ServicesResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    banner?: Banner;
    services: Service[];
    pagination?: Pagination;
  };
}

export interface ServiceDetailsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    service: ServiceDetails;
  };
}

export const getServices = async (
  page: number = 1,
  language: string = 'en'
): Promise<ServicesResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/services?page=${page}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': language,
        'lang': language,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// ✅ استخدام slug
export const getServiceDetails = async (
  slug: string,
  language: string = 'en'
): Promise<ServiceDetailsResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/services/${slug}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': language,
        'lang': language,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};