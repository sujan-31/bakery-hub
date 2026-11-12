'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/image';
import { useBakery } from '@/context/BakeryContext';
import { Order, OrderStatus } from '@/types';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Sparkles, 
  PackageCheck, 
  PartyPopper, 
  Phone, 
  MapPin, 
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const STATUS_STEPS: { 
  key: OrderStatus; 
  label: string; 
  desc: string; 
  icon: React.ComponentType<{ className?: string }> 
}[] = [
  { 
    key: 'pending', 
    label: 'Order Confirmed', 
    desc: 'Recipe scheduled in our kitchen queue', 
    icon: CheckCircle2 
  },
  { 
    key: 'baking', 
    label: 'Baking in Oven', 
    desc: 'Sponges rising with organic butter & vanilla', 
    icon: Flame 
  },
  { 
    key: 'decorating', 
    label: 'Decorating & Piping', 
    desc: 'Chef frosting and writing custom inscription', 
    icon: Sparkles 
  },
  { 
    key: 'ready', 
    label: 'Ready for Pickup', 
    desc: 'Boxed, ribboned, and chilled in display fridge', 
    icon: PackageCheck 
  },
  { 
    key: 'completed', 
    label: 'Completed & Celebrated', 
    desc: 'Handed over to customer', 
    icon: PartyPopper 
  },
];

function TrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const isJustPlaced = searchParams.get('placed') === 'true';

  const { orders, getOrderById } = useBakery();
  const [searchInput, setSearchInput] = useState(initialId);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    if (initialId) {
      const found = getOrderById(initialId);
      if (found) {
        setActiveOrder(found);
        setSearchAttempted(true);
      }
    } else if (orders.length > 0) {
      // Default to first order if none specified
      setActiveOrder(orders[0]);
    }
  }, [initialId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchAttempted(true);
    const found = getOrderById(searchInput);
    setActiveOrder(found || null);
  };

  const getStepStatus = (stepIndex: number, currentStatus: OrderStatus) => {
    const orderIndex = STATUS_STEPS.findIndex(s => s.key === currentStatus);
    if (currentStatus === 'cancelled') return 'cancelled';
    if (stepIndex < orderIndex) return 'completed';
    if (stepIndex === orderIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Live Oven & Kitchen Status
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-950">
          Track Your Bakery Order
        </h1>
        <p className="text-stone-500 text-sm">
          Enter your Order ID (e.g. ORD-8941) to monitor its progress in real-time.
        </p>
      </div>

      {/* Just Placed Success Banner */}
      {isJustPlaced && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-2 animate-in zoom-in-95 duration-300">
          <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-serif font-black text-emerald-950">
            Order Successfully Sent to Our Kitchen!
          </h2>
          <p className="text-xs text-emerald-700 max-w-md mx-auto">
            Our pastry chefs have received your ticket. Bookmark this page or keep your Order ID handy to follow the baking progress.
          </p>
        </div>
      )}

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Enter Order ID (e.g. ORD-8941)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-stone-200 bg-white text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-md transition-all"
        >
          Track
        </button>
      </form>

      {/* Active Order Card */}
      {activeOrder ? (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl overflow-hidden divide-y divide-stone-100">
          
          {/* Order Header */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-50/60 to-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-amber-200 text-amber-950">
                  {activeOrder.id}
                </span>
                <span className="text-xs text-stone-500">
                  Placed on {new Date(activeOrder.createdAt).toLocaleDateString()} at{' '}
                  {new Date(activeOrder.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-2xl font-serif font-black text-stone-900 mt-2">
                Order for {activeOrder.customerName}
              </h2>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-stone-500 block">Scheduled Pickup / Delivery</span>
              <span className="text-sm font-black text-amber-900 block">
                {activeOrder.pickupDate} • {activeOrder.pickupTime}
              </span>
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded mt-1">
                {activeOrder.deliveryType === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
              </span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-8">
              Live Preparation Journey
            </h3>

            <div className="relative">
              {/* Desktop / Tablet Horizontal Line */}
              <div className="hidden sm:block absolute top-6 left-6 right-6 h-1 bg-stone-100 -z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2">
                {STATUS_STEPS.map((step, idx) => {
                  const state = getStepStatus(idx, activeOrder.status);
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 relative z-10">
                      
                      {/* Step Circle */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                          state === 'completed'
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                            : state === 'current'
                            ? 'bg-amber-600 text-white ring-4 ring-amber-200 shadow-lg shadow-amber-600/40 animate-pulse'
                            : 'bg-stone-100 text-stone-400 border border-stone-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Step Labels */}
                      <div className="text-left sm:text-center">
                        <div className={`text-xs font-black ${
                          state === 'current' ? 'text-amber-800' : state === 'completed' ? 'text-emerald-700' : 'text-stone-400'
                        }`}>
                          {step.label}
                        </div>
                        <div className="text-[11px] text-stone-500 leading-tight mt-0.5 hidden sm:block max-w-[120px] mx-auto">
                          {step.desc}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="p-6 sm:p-8 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Cakes in this Order
            </h3>

            <div className="space-y-3">
              {activeOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 border border-stone-100">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.cakeName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-stone-900 text-sm">{item.cakeName}</h4>
                    <p className="text-xs text-stone-500">
                      {item.size} • {item.flavor} • Qty: {item.quantity}
                    </p>
                    {item.customInscription && (
                      <p className="text-xs text-amber-800 font-medium mt-0.5">
                        ✨ Piping: &ldquo;{item.customInscription}&rdquo;
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-stone-900">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {activeOrder.specialInstructions && (
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
                <strong>Kitchen Instructions:</strong> {activeOrder.specialInstructions}
              </div>
            )}
          </div>

          {/* Shop Contact Footer */}
          <div className="p-6 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>Sweet Crumbs Bakery: 42 Artisan Way, Downtown</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <Phone className="w-4 h-4 text-amber-600" />
              <span>Questions? Call (555) 839-2253</span>
            </div>
          </div>

        </div>
      ) : searchAttempted ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <AlertCircle className="w-12 h-12 text-stone-400 mx-auto" />
          <h2 className="text-xl font-serif font-black text-stone-800">
            Order &ldquo;{searchInput}&rdquo; Not Found
          </h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Please double check your Order ID from your confirmation screen, or contact our bakery staff directly.
          </p>
        </div>
      ) : null}

    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-stone-400">Loading order tracker...</div>}>
      <TrackContent />
    </Suspense>
  );
}
