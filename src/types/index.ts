export interface BanhMiItem {
  id: string;
  name: string;
  vietnameseName: string;
  nameZh?: string;
  tagline: string;
  taglineZh?: string;
  description: string;
  descriptionZh?: string;
  price: number;
  originalPrice?: number;
  category: 'banh-mi' | 'nuoc-uong' | 'combo';
  image: string;
  badge?: string;
  badgeZh?: string;
  rating: number;
  reviewsCount: number;
  isPopular?: boolean;
  ingredients: string[];
  ingredientsZh?: string[];
  spicyDefault: 'none' | 'mild' | 'hot';
  calories?: number;
}

export interface CustomizationOptions {
  spiciness: 'none' | 'mild' | 'hot';
  cilantro: boolean; // Ngò rí
  cucumber: boolean; // Dưa leo
  pickles: boolean;  // Đồ chua (củ cải & cà rốt)
  scallionOil: boolean; // Mỡ hành
  pateAmount: 'regular' | 'extra' | 'none'; // Thêm pâté +5k
  butterAmount: 'regular' | 'extra' | 'none'; // Thêm bơ sốt +5k
  extras: Record<string, boolean | undefined>;
  note: string;
}

export interface CartItem {
  cartItemId: string;
  item: BanhMiItem;
  quantity: number;
  customization: CustomizationOptions;
  itemTotal: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryMethod: 'delivery' | 'pickup';
  deliveryTime: 'now' | 'schedule';
  scheduleTime?: string;
  paymentMethod: 'cod' | 'vietqr' | 'momo';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'baking' | 'shipping' | 'completed';
  createdAt: string;
  note?: string;
}
