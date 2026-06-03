import { categories, cities, countries } from '../constants';
import { SheetSelectOption } from '../types';

export const getCitiesByCountry = (country: string) => {
  if (!country) return [];
  return cities[country];
};

export const getSelectedItemLabel = (
  key: string,
  data: SheetSelectOption[],
) => {
  const item = data.find(e => e.value === key);
  return item ? item.label : '';
};

export const getCountryLabel = (key: string) => {
  const country = countries.find(e => e.value === key);
  return country ? country.label : '';
};

export const getCityLabel = (country: string, key: string) => {
  const currentCities = getCitiesByCountry(country);
  const city = currentCities.find(e => e.value === key)!;
  return city.label;
};

export const getCategoryLabel = (key: string) => {
  const category = categories.find(e => e.value === key)!;
  return category.label;
};
