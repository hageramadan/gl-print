export interface ProductImage {
  id: number;
  url: string;
  file_name: string;
  mime_type: string;
}

export interface Product {
  id: number;
  service_id: number;
  name: string;
  description: string;
  image: ProductImage[];
  banner_image: string;
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
  productId: number,
  language: string = "en",
): Promise<ProductDetailsResponse> => {
  const response = await fetch(
    `https://glprint-eg.com/api/products/${productId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": language,
      },
      // cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
};
