import config from '@/data/config.json';

export async function getTranslations(lang: string) {
  const remoteUrl = lang === 'en' ? config.remoteUris.en : config.remoteUris.te;

  if (remoteUrl) {
    try {
      const response = await fetch(remoteUrl, { next: { revalidate: 3600 } });
      if (response.ok) return await response.json();
    } catch (error) {
      console.error(`Failed to fetch remote translations for ${lang}:`, error);
    }
  }

  // Fallback to local
  try {
    const data = await import(`@/data/${lang}.json`);
    return data.default;
  } catch (error) {
    console.error(`Failed to load local translations for ${lang}:`, error);
    return {};
  }
}

export async function getConfig() {
  return config;
}

export async function getImages() {
  const data = await import('@/data/images.json');
  return data.default;
}
