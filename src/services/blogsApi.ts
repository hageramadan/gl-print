export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  published_at: string;
  created_at: string;
}

export interface BlogDetails {
  id: number;
  title: string;
  description: string;
  content: string;
  image: string;
  is_visible: boolean;
  published_at: string;
  created_at: string;
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

export interface BlogsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    banner?: Banner;
    blogs: Blog[];
    pagination?: Pagination;
  };
}

export interface BlogDetailsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    blog: BlogDetails;
    related_blogs: Blog[];
  };
}

export const getBlogs = async (
  page: number = 1,
  language: string = 'en'
): Promise<BlogsResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/blogs?page=${page}`,
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

export const getBlogDetails = async (
  blogId: number,
  language: string = 'en'
): Promise<BlogDetailsResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/blogs/${blogId}`,
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