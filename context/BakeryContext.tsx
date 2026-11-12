'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CakeItem, Order, OrderItem, OrderStatus, BakeryStats } from '@/types';
import { INITIAL_CAKES, INITIAL_ORDERS } from '@/lib/data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface CartItem extends OrderItem {
  id: string;
}

interface BakeryContextType {
  cakes: CakeItem[];
  orders: Order[];
  cart: CartItem[];
  stats: BakeryStats;
  isLoaded: boolean;
  isCloudConnected: boolean;
  // Cart Actions
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Order Actions
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByPhone: (phone: string) => Order[];
  refreshOrders: () => Promise<void>;
  // Catalog Actions
  toggleCakeStock: (cakeId: string) => void;
  updateCakePrice: (cakeId: string, newBasePrice: number) => void;
  resetToSampleData: () => void;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

const CAKES_STORAGE_KEY = 'bakery_hub_cakes_v1';
const ORDERS_STORAGE_KEY = 'bakery_hub_orders_v1';
const CART_STORAGE_KEY = 'bakery_hub_cart_v1';

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cakes, setCakes] = useState<CakeItem[]>(INITIAL_CAKES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to fetch orders from Supabase cloud
  const fetchOrdersFromCloud = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formatted: Order[] = data.map((row: any) => ({
          id: row.id,
          customerName: row.customer_name,
          customerPhone: row.customer_phone,
          customerEmail: row.customer_email,
          deliveryType: row.delivery_type,
          deliveryAddress: row.delivery_address,
          pickupDate: row.pickup_date,
          pickupTime: row.pickup_time,
          specialInstructions: row.special_instructions,
          items: typeof row.items === 'string' ? JSON.parse(row.items) : row.items,
          subtotal: Number(row.subtotal),
          tax: Number(row.tax),
          totalAmount: Number(row.total_amount),
          status: row.status as OrderStatus,
          createdAt: row.created_at,
          isPaid: Boolean(row.is_paid),
          paymentMethod: row.payment_method
        }));
        setOrders(formatted);
      }
    } catch (e) {
      console.warn('Could not fetch orders from cloud DB:', e);
    }
  }, []);

  // Initial load
  useEffect(() => {
    try {
      const savedCakes = localStorage.getItem(CAKES_STORAGE_KEY);
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCakes) setCakes(JSON.parse(savedCakes));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.warn('Failed to parse saved data from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }

    // If Supabase is connected, pull cloud orders
    if (isSupabaseConfigured && supabase) {
      fetchOrdersFromCloud();

      // Subscribe to real-time order updates
      const channel = supabase
        .channel('public:orders')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
          fetchOrdersFromCloud();
        })
        .subscribe();

      // Poll every 10 seconds as a reliable fallback
      const interval = setInterval(fetchOrdersFromCloud, 10000);

      return () => {
        if (supabase) {
          supabase.removeChannel(channel);
        }
        clearInterval(interval);
      };
    }
  }, [fetchOrdersFromCloud]);

  // Sync state to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CAKES_STORAGE_KEY, JSON.stringify(cakes));
    } catch (e) {
      console.error(e);
    }
  }, [cakes, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart, isLoaded]);

  // Cart Management
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.cakeId}-${item.size}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    };
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Order Management
  const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${randomNum}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Update local state immediately
    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // If Supabase is connected, push to shared cloud database!
    if (supabase) {
      supabase.from('orders').insert({
        id: newOrder.id,
        customer_name: newOrder.customerName,
        customer_phone: newOrder.customerPhone,
        customer_email: newOrder.customerEmail,
        delivery_type: newOrder.deliveryType,
        delivery_address: newOrder.deliveryAddress || null,
        pickup_date: newOrder.pickupDate,
        pickup_time: newOrder.pickupTime,
        special_instructions: newOrder.specialInstructions || null,
        items: newOrder.items,
        subtotal: newOrder.subtotal,
        tax: newOrder.tax,
        total_amount: newOrder.totalAmount,
        status: newOrder.status,
        is_paid: newOrder.isPaid,
        payment_method: newOrder.paymentMethod,
        created_at: newOrder.createdAt
      }).then(({ error }) => {
        if (error) {
          console.error('Failed to sync order to cloud Supabase:', error);
        } else {
          console.log('Order successfully synced to cloud Supabase!');
        }
      });
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));

    if (supabase) {
      supabase.from('orders').update({ status: newStatus }).eq('id', orderId).then(({ error }) => {
        if (error) console.error('Failed to update status in cloud DB:', error);
      });
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id.toLowerCase() === orderId.trim().toLowerCase());
  };

  const getOrdersByPhone = (phone: string) => {
    const cleanSearch = phone.replace(/[^0-9]/g, '');
    if (!cleanSearch) return [];
    return orders.filter(o => o.customerPhone.replace(/[^0-9]/g, '').includes(cleanSearch));
  };

  // Catalog Management
  const toggleCakeStock = (cakeId: string) => {
    setCakes(prev => prev.map(c => c.id === cakeId ? { ...c, inStock: !c.inStock } : c));
  };

  const updateCakePrice = (cakeId: string, newBasePrice: number) => {
    setCakes(prev => prev.map(c => c.id === cakeId ? { ...c, basePrice: newBasePrice } : c));
  };

  const resetToSampleData = () => {
    setCakes(INITIAL_CAKES);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    localStorage.removeItem(CAKES_STORAGE_KEY);
    localStorage.removeItem(ORDERS_STORAGE_KEY);
    localStorage.removeItem(CART_STORAGE_KEY);
  };

  // Analytics Calculation
  const todayStr = new Date().toISOString().split('T')[0];
  
  const todayOrders = orders.filter(o => o.createdAt.startsWith(todayStr) || o.pickupDate === todayStr);
  const todayRevenue = todayOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const cakesSoldToday = todayOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  const totalCakesSold = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  const activePrepOrders = orders.filter(o => ['pending', 'baking', 'decorating'].includes(o.status));
  const cakesToPrepareCount = activePrepOrders.reduce((sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  const readyForPickupCount = orders.filter(o => o.status === 'ready').length;
  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;

  const stats: BakeryStats = {
    todayRevenue,
    totalRevenue,
    cakesSoldToday,
    totalCakesSold,
    cakesToPrepareCount,
    readyForPickupCount,
    completedOrdersCount
  };

  return (
    <BakeryContext.Provider
      value={{
        cakes,
        orders,
        cart,
        stats,
        isLoaded,
        isCloudConnected: isSupabaseConfigured,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        getOrdersByPhone,
        refreshOrders: fetchOrdersFromCloud,
        toggleCakeStock,
        updateCakePrice,
        resetToSampleData
      }}
    >
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
