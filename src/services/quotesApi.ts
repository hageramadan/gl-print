export interface EnumOption {
  value: string | number;
  label: string;
  key?: string;
}

export interface QuoteEnums {
  project_types: EnumOption[];
  priority_levels: EnumOption[];
  printing_types: EnumOption[];
  paper_types: EnumOption[];
  paper_weights: EnumOption[];
  printing_methods: EnumOption[];
  color_types: EnumOption[];
  finishing_types: EnumOption[];
  brand_identity_needs: EnumOption[];
  promotional_gifts: EnumOption[];
  packaging_types: EnumOption[];
  display_box_materials: EnumOption[];
  rigid_board_finishes: EnumOption[];
  artwork_types: EnumOption[];
  budget_ranges: EnumOption[];
  industries: EnumOption[];
}

export interface QuoteEnumsResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: QuoteEnums;
}

export const getQuoteEnums = async (
  language: string = 'en'
): Promise<QuoteEnumsResponse> => {
  const response = await fetch(
    'https://glprint-eg.com/api/request-quotes/enums',
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

export interface SubmitResponse {
  result: boolean;
  errNum: number;
  message: string;
  data?: any;
}

// ✅ إرسال عرض السعر (Get a Quote) - FormData
export const submitQuote = async (
  formData: FormData,
  language: string = 'en'
): Promise<SubmitResponse> => {
  const response = await fetch('https://glprint-eg.com/api/request-quotes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-Language': language,
      lang: language,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

// ✅ إرسال استفسار سريع (Quick Inquiry) → /inquiries
export const submitQuickInquiry = async (
  data: { name: string; email: string; message: string },
  language: string = 'en'
): Promise<SubmitResponse> => {
  const response = await fetch('https://glprint-eg.com/api/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': language,
      'lang': language,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      message: data.message,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};