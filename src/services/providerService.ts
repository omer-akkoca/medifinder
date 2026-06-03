import providers from '@/data.json';
import { Provider, ProviderFilterParams } from '../types';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(() => resolve(), ms));

export const getProviders = async (query: string) => {
  await delay(1000);

  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return providers as Provider[];

  return providers.filter(provider => {
    return (
      provider.name.toLowerCase().includes(normalizedQuery) ||
      provider.category.toLowerCase().includes(normalizedQuery) ||
      provider.type.toLowerCase().includes(normalizedQuery)
    );
  }) as Provider[];
};

export const getProviderById = async (id: string) => {
  await delay(300);

  const provider = providers.find(e => e.id === id);

  if (!provider) throw new Error('Provider bulunamadı.');

  return provider as Provider;
};

export const getFilterProviders = async (
  filter?: ProviderFilterParams,
): Promise<Provider[]> => {
  await delay(1000);

  let result = [...providers];

  if (filter?.country) {
    result = result.filter(provider => provider.country === filter.country);
  }

  if (filter?.city) {
    result = result.filter(provider => provider.city === filter.city);
  }

  if (filter?.category) {
    result = result.filter(provider => provider.category === filter.category);
  }

  return result;
};
