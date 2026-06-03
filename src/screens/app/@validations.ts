import z from 'zod';

export const searchProviderSchema = z.object({
  query: z.string().optional(),
});

export const filterProviderSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
});

export type SearchProviderFormData = z.infer<typeof searchProviderSchema>;
export type FilterProviderFormData = z.infer<typeof filterProviderSchema>;
