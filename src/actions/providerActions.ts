import { useQuery } from '@tanstack/react-query';
import {
  getFilterProviders,
  getProviderById,
  getProviders,
} from '@/src/services';
import { ProviderFilterParams } from '../types';

const queryKeys = {
  all: ['providers'] as const,
  query: (query: string) => ['providers', query] as const,
  detail: (id: string) => ['providers', 'detail', id] as const,
  filter: (params?: ProviderFilterParams) =>
    ['providers', 'filter', params] as const,
};

export const useGetProviders = (query: string = '') => {
  return useQuery({
    queryKey: queryKeys.query(query),
    queryFn: () => getProviders(query),
  });
};

export const useGetProviderDetail = (id: string) => {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: () => getProviderById(id),
    enabled: !!id,
  });
};

export const useGetFilterProviders = (filter?: ProviderFilterParams) => {
  return useQuery({
    queryKey: queryKeys.filter(filter),
    queryFn: () => getFilterProviders(filter),
  });
};
