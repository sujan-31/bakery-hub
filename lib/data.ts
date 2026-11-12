import { CakeItem, Order } from '@/types';

export const INITIAL_CAKES: CakeItem[] = [
  {
    id: 'cake-1',
    name: 'Belgian Dark Chocolate Truffle Cake',
    tagline: '70% pure Belgian ganache layered with moist chocolate sponge',
    description: 'Our #1 best seller. Rich, decadent layers of dark chocolate sponge infused with espresso syrup, blanketed in silky ganache and chocolate curls.',
    basePrice: 38,
    category: 'signature-cakes',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 4,
    popular: true,
    inStock: true,
    flavors: ['Classic Belgian Truffle', 'Choco Hazelnut Crunch', 'Dark Espresso Infused'],
    sizes: [
      { label: 'Small (0.5 kg)', servings: '4-6 slices', multiplier: 1 },
      { label: 'Medium (1.0 kg)', servings: '8-10 slices', multiplier: 1.75 },
      { label: 'Large (2.0 kg)', servings: '16-20 slices', multiplier: 3.2 }
    ]
  },
  {
    id: 'cake-2',
    name: 'Velvet Dream Cream Cheese Cake',
    tagline: 'Vibrant crimson sponge paired with whipped Madagascar cream cheese',
    description: 'A traditional Southern classic with a tender, velvety crumb, layered with tangy whipped vanilla cream cheese and topped with fresh raspberries.',
    basePrice: 34,
    category: 'signature-cakes',
    imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 3,
    popular: true,
    inStock: true,
    flavors: ['Classic Red Velvet', 'Berry Swirl Red Velvet'],
    sizes: [
      { label: 'Small (0.5 kg)', servings: '4-6 slices', multiplier: 1 },
      { label: 'Medium (1.0 kg)', servings: '8-10 slices', multiplier: 1.75 },
      { label: 'Large (2.0 kg)', servings: '16-20 slices', multiplier: 3.2 }
    ]
  },
  {
    id: 'cake-3',
    name: 'Caramel Biscoff Lotus Crunch',
    tagline: 'Spiced speculoos cookie crust with salted caramel drizzle',
    description: 'Crispy Biscoff biscuit layers combined with caramelized white chocolate buttercream and molten salted butter caramel drip.',
    basePrice: 42,
    category: 'custom-birthday',
    imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 5,
    popular: true,
    inStock: true,
    flavors: ['Lotus Biscoff Crunch', 'Sea Salt Caramel Truffle'],
    sizes: [
      { label: 'Small (0.5 kg)', servings: '4-6 slices', multiplier: 1 },
      { label: 'Medium (1.0 kg)', servings: '8-10 slices', multiplier: 1.75 },
      { label: 'Large (2.0 kg)', servings: '16-20 slices', multiplier: 3.2 }
    ]
  },
  {
    id: 'cake-4',
    name: 'Fresh Strawberry Vanilla Shortcake',
    tagline: 'Fluffy chiffon, fresh farm strawberries, and chantilly cream',
    description: 'Light as air. Japanese-style feather-light vanilla chiffon cake enveloped in fresh organic strawberries and light dairy cream.',
    basePrice: 36,
    category: 'signature-cakes',
    imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 3,
    popular: false,
    inStock: true,
    flavors: ['Vanilla Strawberry Chantilly', 'Strawberry Lemon Curd'],
    sizes: [
      { label: 'Small (0.5 kg)', servings: '4-6 slices', multiplier: 1 },
      { label: 'Medium (1.0 kg)', servings: '8-10 slices', multiplier: 1.75 },
      { label: 'Large (2.0 kg)', servings: '16-20 slices', multiplier: 3.2 }
    ]
  },
  {
    id: 'cake-5',
    name: 'Custom Celebration Rainbow Drip Cake',
    tagline: 'Multi-tiered pastel cake personalized with custom piping & toppers',
    description: 'The ultimate birthday centerpiece. Custom personalized message, edible golden pearls, macarons, and artisanal meringue kisses.',
    basePrice: 55,
    category: 'custom-birthday',
    imageUrl: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 6,
    popular: true,
    inStock: true,
    flavors: ['Funfetti Rainbow Vanilla', 'Triple Berry Swirl', 'Cookies & Cream'],
    sizes: [
      { label: 'Medium (1.0 kg)', servings: '8-10 slices', multiplier: 1 },
      { label: 'Large (2.0 kg)', servings: '16-20 slices', multiplier: 1.8 },
      { label: 'Grand Party (3.5 kg)', servings: '30-35 slices', multiplier: 3.0 }
    ]
  },
  {
    id: 'cake-6',
    name: 'French Macaron & Pastry Box (Box of 8)',
    tagline: 'Hand-piped Parisian macarons in assorted seasonal flavors',
    description: 'Crisp shells with chewy centers: Pistachio, Salted Caramel, Dark Chocolate, Rose Lychee, and Madagascar Vanilla.',
    basePrice: 22,
    category: 'cupcakes-pastries',
    imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 2,
    popular: false,
    inStock: true,
    flavors: ['Chef Assorted Selection', 'All Chocolate & Caramel', 'Fruity & Floral'],
    sizes: [
      { label: 'Standard (8 pcs)', servings: '2-4 persons', multiplier: 1 },
      { label: 'Party Box (16 pcs)', servings: '6-8 persons', multiplier: 1.9 }
    ]
  },
  {
    id: 'cake-7',
    name: 'Zesty Meyer Lemon & Blueberry Cake',
    tagline: 'Citrus-infused curd with fresh wild blueberry compote',
    description: 'Bright, refreshing and sophisticated. Infused with freshly squeezed lemon juice, layered with homemade wild blueberry reduction.',
    basePrice: 35,
    category: 'signature-cakes',
    imageUrl: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 4,
    popular: false,
    inStock: true,
    flavors: ['Meyer Lemon Curd', 'Blueberry Citrus Cream'],
    sizes: [
      { label: 'Small (0.5 kg)', servings: '4-6 slices', multiplier: 1 },
      { label: 'Medium (1.0 kg)', servings: '8-10 slices', multiplier: 1.75 },
      { label: 'Large (2.0 kg)', servings: '16-20 slices', multiplier: 3.2 }
    ]
  },
  {
    id: 'cake-8',
    name: 'Artisan Golden Sourdough & Croissant Bundle',
    tagline: 'Freshly baked daily at 5:00 AM using slow fermented French butter',
    description: 'Includes 1 rustic country sourdough boule, 2 chocolate pain au chocolat, and 2 flaky butter croissants.',
    basePrice: 20,
    category: 'artisan-breads',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    prepTimeHours: 2,
    popular: false,
    inStock: true,
    flavors: ['Traditional Butter & Country Blend'],
    sizes: [
      { label: 'Standard Morning Bundle', servings: '3-4 persons', multiplier: 1 }
    ]
  }
];

// Helper to get formatted date string for today and yesterday
const now = new Date();
const todayIso = now.toISOString().split('T')[0];
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const yesterdayIso = yesterday.toISOString().split('T')[0];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8941',
    customerName: 'Eleanor Vance',
    customerPhone: '+1 (555) 349-8291',
    customerEmail: 'eleanor.v@gmail.com',
    deliveryType: 'pickup',
    pickupDate: todayIso,
    pickupTime: '15:30 (3:30 PM)',
    specialInstructions: 'Please make sure candles and cake knife are included!',
    items: [
      {
        cakeId: 'cake-1',
        cakeName: 'Belgian Dark Chocolate Truffle Cake',
        unitPrice: 66.5,
        size: 'Medium (1.0 kg)',
        flavor: 'Classic Belgian Truffle',
        customInscription: 'Happy 30th Birthday Lucas!',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 66.5,
    tax: 5.32,
    totalAmount: 71.82,
    status: 'baking', // Baker needs to prepare!
    createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
    isPaid: true,
    paymentMethod: 'card_online'
  },
  {
    id: 'ORD-8942',
    customerName: 'Marcus Sterling',
    customerPhone: '+1 (555) 782-9901',
    customerEmail: 'm.sterling@corporate.org',
    deliveryType: 'pickup',
    pickupDate: todayIso,
    pickupTime: '17:00 (5:00 PM)',
    specialInstructions: 'Keep chilled until pickup time.',
    items: [
      {
        cakeId: 'cake-3',
        cakeName: 'Caramel Biscoff Lotus Crunch',
        unitPrice: 73.5,
        size: 'Medium (1.0 kg)',
        flavor: 'Lotus Biscoff Crunch',
        customInscription: 'Congratulations on Promotion Marcus!',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80'
      },
      {
        cakeId: 'cake-6',
        cakeName: 'French Macaron & Pastry Box (Box of 8)',
        unitPrice: 22,
        size: 'Standard (8 pcs)',
        flavor: 'Chef Assorted Selection',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 95.5,
    tax: 7.64,
    totalAmount: 103.14,
    status: 'decorating', // Frosting & Inscription stage!
    createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    isPaid: true,
    paymentMethod: 'upi'
  },
  {
    id: 'ORD-8943',
    customerName: 'Sophia Chen',
    customerPhone: '+1 (555) 234-5678',
    customerEmail: 'sophia.c@designstudio.io',
    deliveryType: 'delivery',
    deliveryAddress: '450 Pinecrest Blvd, Suite 300',
    pickupDate: todayIso,
    pickupTime: '18:30 (6:30 PM)',
    specialInstructions: 'Ring bell #3B upon arrival.',
    items: [
      {
        cakeId: 'cake-5',
        cakeName: 'Custom Celebration Rainbow Drip Cake',
        unitPrice: 99.0,
        size: 'Large (2.0 kg)',
        flavor: 'Funfetti Rainbow Vanilla',
        customInscription: 'Sweet 16 Chloe ✨',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 99.0,
    tax: 7.92,
    totalAmount: 106.92,
    status: 'pending', // Waiting to start baking!
    createdAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
    isPaid: false,
    paymentMethod: 'cash_on_pickup'
  },
  {
    id: 'ORD-8944',
    customerName: 'David K. Miller',
    customerPhone: '+1 (555) 912-3847',
    customerEmail: 'davidmiller@outlook.com',
    deliveryType: 'pickup',
    pickupDate: todayIso,
    pickupTime: '14:00 (2:00 PM)',
    specialInstructions: 'Boxed with red ribbon.',
    items: [
      {
        cakeId: 'cake-2',
        cakeName: 'Velvet Dream Cream Cheese Cake',
        unitPrice: 59.5,
        size: 'Medium (1.0 kg)',
        flavor: 'Classic Red Velvet',
        customInscription: 'Happy Anniversary Honey ❤️',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 59.5,
    tax: 4.76,
    totalAmount: 64.26,
    status: 'ready', // Ready in fridge for pickup!
    createdAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
    isPaid: true,
    paymentMethod: 'card_online'
  },
  {
    id: 'ORD-8939',
    customerName: 'Aria Montgomery',
    customerPhone: '+1 (555) 674-1289',
    customerEmail: 'aria.m@gmail.com',
    deliveryType: 'pickup',
    pickupDate: todayIso,
    pickupTime: '11:00 AM',
    items: [
      {
        cakeId: 'cake-4',
        cakeName: 'Fresh Strawberry Vanilla Shortcake',
        unitPrice: 63.0,
        size: 'Medium (1.0 kg)',
        flavor: 'Vanilla Strawberry Chantilly',
        customInscription: 'Welcome Home Mom!',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 63.0,
    tax: 5.04,
    totalAmount: 68.04,
    status: 'completed', // Completed earlier today!
    createdAt: new Date(now.getTime() - 9 * 60 * 60 * 1000).toISOString(),
    isPaid: true,
    paymentMethod: 'card_online'
  },
  {
    id: 'ORD-8938',
    customerName: 'Benjamin Holt',
    customerPhone: '+1 (555) 438-7612',
    customerEmail: 'b.holt@acmecorp.com',
    deliveryType: 'pickup',
    pickupDate: yesterdayIso,
    pickupTime: '16:00 (4:00 PM)',
    items: [
      {
        cakeId: 'cake-1',
        cakeName: 'Belgian Dark Chocolate Truffle Cake',
        unitPrice: 121.6,
        size: 'Large (2.0 kg)',
        flavor: 'Choco Hazelnut Crunch',
        customInscription: 'Happy 50th Birthday CEO!',
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
      },
      {
        cakeId: 'cake-8',
        cakeName: 'Artisan Golden Sourdough & Croissant Bundle',
        unitPrice: 20,
        size: 'Standard Morning Bundle',
        flavor: 'Traditional Butter & Country Blend',
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
      }
    ],
    subtotal: 161.6,
    tax: 12.92,
    totalAmount: 174.52,
    status: 'completed',
    createdAt: new Date(yesterday.getTime() + 10 * 60 * 60 * 1000).toISOString(),
    isPaid: true,
    paymentMethod: 'card_online'
  }
];
