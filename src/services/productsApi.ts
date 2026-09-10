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
  service: {
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

export interface ProductsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    banner: Banner;
    products: Product[];
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

export const getProducts = async (
  page: number = 1,
  serviceId: number | null = null,
  language: string = 'en'
): Promise<ProductsResponse> => {
  let url = `https://glprint-eg.com/api/products?page=${page}`;
  if (serviceId) {
    url += `&service=${serviceId}`;
  }
  
 
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': language,
    
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};