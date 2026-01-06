export interface Product {
  id: string;
  name: string;
  nameKz?: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  weight?: string;
  unit?: string;
  inStock: boolean;
  isHit?: boolean;
  isSale?: boolean;
  isNew?: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  nameKz?: string;
  icon: string;
  image?: string;
  productCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderType {
  type: 'delivery' | 'pickup';
  address?: string;
  timeSlot?: string;
  comment?: string;
}

export type PaymentMethod = 'kaspi-pay' | 'kaspi-qr' | 'cash';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
}
