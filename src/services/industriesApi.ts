export interface Industry {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface IndustryCategory {
  id: number;
  name: string;
}

export interface IndustryDetails {
  id: number;
  name: string;
  description: string;
  image: string;
  categories: IndustryCategory[];
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

export interface IndustriesResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    banner?: Banner;
    industries: Industry[];
    pagination?: Pagination;
  };
}

export interface IndustryDetailsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    industry: IndustryDetails;
  };
}

export const getIndustries = async (
  page: number = 1,
  language: string = 'en'
): Promise<IndustriesResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/industries?page=${page}`,
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

export const getIndustryDetails = async (
  industryId: number,
  language: string = 'en'
): Promise<IndustryDetailsResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/industries/${industryId}`,
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