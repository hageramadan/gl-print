export interface SearchService {
  id: number;
  slug:string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface SearchProduct {
  id: number;
  slug: string;
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

export interface SearchResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    query: string;
    counts: {
      all: number;
      services: number;
      products: number;
    };
    services: {
      items: SearchService[];
      pagination: Pagination;
    };
    products: {
      items: SearchProduct[];
      pagination: Pagination;
    };
  };
}

export type SearchType = 'all' | 'services' | 'products';

export const searchAll = async (
  query: string,
  type: SearchType = 'all',
  page: number = 1,
  language: string = 'en'
): Promise<SearchResponse> => {
  const params = new URLSearchParams();
  params.append('search', query);
  params.append('type', type);
  params.append('page', String(page));

  const response = await fetch(
    `https://glprint-eg.com/api/search?${params.toString()}`,
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