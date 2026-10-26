export interface AdButton {
  text: string;
  action_type: string;
}

export interface Ad {
  id: number;
  title: string;
  description: string;
  primary_button: AdButton | null;
  secondary_button: AdButton | null;
  image: string | null;
  is_visible: boolean;
}

interface AdResponse {
  result: boolean;
  errNum: number;
  message: string;
  data: Ad | null;
}

export async function getAd(language: string, signal?: AbortSignal): Promise<Ad | null> {
  const response = await fetch('https://admin.glprint-eg.com/api/ad', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Accept-Language': language,
      lang: language,
    },
    cache: 'no-store',
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load ad: ${response.status}`);
  }

  const payload: AdResponse = await response.json();
  return payload.result && payload.data?.is_visible === true ? payload.data : null;
}
