export type CakeCategory = 
  | 'all'
  | 'signature-cakes'
  | 'custom-birthday'
  | 'cupcakes-pastries'
  | 'artisan-breads';

export interface CakeItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  category: CakeCategory;
  imageUrl: string;
  prepTimeHours: number;
  popular?: boolean;
  inStock: boolean;
  flavors: string[];
  sizes: {
    label: string;
    servings: string;
    multiplier: number;
  }[];
}

export interface OrderItem {
  cakeId: string;
  cakeName: string;
  unitPrice: number;
  size: string;
  flavor: string;
  customInscription?: string;
  quantity: number;
  imageUrl: string;
}

export type OrderStatus = 
  | 'pending'     // Just placed, awaiting kitchen acceptance
  | 'baking'      // In the oven / dough prepared
  | 'decorating'  // Frosting, piping, writing inscriptions
  | 'ready'       // Packaged in box, in display fridge / ready for customer
  | 'completed'   // Handed over to customer / delivered
  | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  isPaid: boolean;
  paymentMethod: 'cash_on_pickup' | 'card_online' | 'upi';
}

export interface BakeryStats {
  todayRevenue: number;
  totalRevenue: number;
  cakesSoldToday: number;
  totalCakesSold: number;
  cakesToPrepareCount: number; // pending, baking, decorating
  readyForPickupCount: number;
  completedOrdersCount: number;
}
