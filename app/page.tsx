import type { Metadata } from 'next';
import HomeClient from '@/src/components/home/HomeClient';
import { getInitialHomeData, getInitialHeroServices } from '@/src/services/homeServer';
import { getHomeMetadata, getHomeStructuredData } from '@/src/lib/homeSeo';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return getHomeMetadata(await getInitialHomeData());
  } catch {
    return getHomeMetadata();
  }
}

export default async function Home() {
  const [data, services] = await Promise.all([
    getInitialHomeData(),
    getInitialHeroServices(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getHomeStructuredData(data)).replace(/</g, '\\u003c'),
        }}
      />
      <HomeClient initialData={data} initialServices={services} />
    </>
  );
}
