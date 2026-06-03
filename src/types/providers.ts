export type ProviderType = 'doctor' | 'hospital' | 'clinic' | 'veterinary';

export interface Provider {
  id: string;
  image: string;
  type: string;
  name: string;
  category: string;
  country: string;
  city: string;
  rating: number;
  phone: string;
  email: string;
  address: string;
  bio: string;
  verified: boolean;
}

export interface Doctor extends Provider {
  type: 'doctor';
}

export interface Clinic extends Provider {
  type: 'clinic';
}

export interface Hospital extends Provider {
  type: 'hospital';
}

export interface Veterinary extends Provider {
  type: 'veterinary';
}
