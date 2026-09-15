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
  service?: {
    id: number;
    title: string;
    description: string;
    icon: string;
    image: string;
  };
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

export interface ProductsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    banner?: Banner;
    products: Product[];
    pagination?: Pagination;
  };
}

export const getAllProducts = async (
  language: string = 'en'
): Promise<ProductsResponse> => {
  const response = await fetch('https://glprint-eg.com/api/products', {
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

export const getProducts = async (
  page: number = 1,
  serviceId: number | null = null,
  language: string = 'en',
  industryId: number | null = null,
  categoryId: number | null = null
): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  params.append('page', String(page));

  if (serviceId) params.append('service', String(serviceId));
  if (industryId) params.append('industry', String(industryId));
  if (categoryId) params.append('category', String(categoryId));

  const url = `https://glprint-eg.com/api/products?${params.toString()}`;

  const response = await fetch(url, {
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