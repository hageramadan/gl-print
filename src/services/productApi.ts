export interface ProductImage {
  id: number;
  url: string;
  file_name: string;
  mime_type: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface ProductService {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
  banner: string;
}

export interface ProductSEO {
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

export interface Product {
  id: number;
  service_id: number;
  industry_id: number | null;
  category_id: number | null;
  name: string;
  slug: string;
  description: string;
  image: ProductImage[];
  banner_image: string;
  service: ProductService;
  industry: any;
  category: any;
  product_attributes: ProductAttribute[]; // ✅ جديد
  seo?: ProductSEO;
}

export interface ProductDetailsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: {
    product: Product;
    related_products: Product[];
  };
}

export const getProductDetails = async (
  slug: string,
  language: string = 'en'
): Promise<ProductDetailsResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/products/${slug}`,
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