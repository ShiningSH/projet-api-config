
export interface Component {
  id: string;
  categoryId: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  imageUrl: string;
  specs: Record<string, string | number>;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Merchant {
  id: string;
  name: string;
  website: string;
  logoUrl: string;
}

export interface MerchantPrice {
  merchantId: string;
  componentId: string;
  price: number;
  url: string;
  inStock: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface Configuration {
  id: string;
  userId: string;
  name: string;
  components: string[]; // Array of component IDs
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
