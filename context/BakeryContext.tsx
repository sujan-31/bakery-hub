'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CakeItem, Order, OrderItem, OrderStatus, BakeryStats } from '@/types';
import { INITIAL_CAKES, INITIAL_ORDERS } from '@/lib/data';

interface CartItem extends OrderItem {
  id: string; // unique item instance id in cart
}

interface BakeryContextType {
  cakes: CakeItem[];
  orders: Order[];
  cart: CartItem[];
  stats: BakeryStats;
  isLoaded: boolean;
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

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCakes = localStorage.getItem(CAKES_STORAGE_KEY);
      const savedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCakes) setCakes(JSON.parse(savedCakes));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.warn('Failed to parse saved bakery data from localStorage:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever state changes
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

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
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

  // Cakes that need kitchen preparation: orders that are 'pending', 'baking', or 'decorating'
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
