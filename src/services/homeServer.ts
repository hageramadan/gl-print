import 'server-only';
import { cache } from 'react';
import { getHomeData } from './homeApi';
import type { Service, ServicesResponse } from './servicesApi';
import { cardDescription } from '@/src/lib/cardDescription';

export const getInitialHomeData = cache(() => getHomeData('en'));

export async function getInitialHeroServices(): Promise<Service[]> {
  try {
    const response = await fetch('https://admin.glprint-eg.com/api/services?page=1', {
      headers: { Accept: 'application/json', 'Accept-Language': 'en', lang: 'en' },
      next: { revalidate: 300 },
    });
    if (!response.ok) throw new Error(`Services request failed: ${response.status}`);
    const result: ServicesResponse = await response.json();
    return result.data.services.slice(0, 3).map((service) => ({
      ...service,
      description: cardDescription(service.description),
    }));
  } catch (error) {
    console.error('Failed to preload hero services:', error);
    return [];
  }
}
