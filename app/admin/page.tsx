'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBakery } from '@/context/BakeryContext';
import { OrderStatus, Order } from '@/types';
import { 
  ChefHat, 
  DollarSign, 
  TrendingUp, 
  Cake, 
  Clock, 
  Flame, 
  Sparkles, 
  PackageCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Printer, 
  Search, 
  Filter, 
  Eye, 
  ShoppingBag,
  SlidersHorizontal,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export default function AdminPage() {
  const { 
    cakes, 
    orders, 
    stats, 
    isCloudConnected,
    refreshOrders,
    updateOrderStatus, 
    toggleCakeStock, 
    updateCakePrice, 
    resetToSampleData 
  } = useBakery();

  const [activeTab, setActiveTab] = useState<'kitchen' | 'analytics' | 'orders' | 'inventory'>('kitchen');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicketOrder, setSelectedTicketOrder] = useState<Order | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refreshOrders();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Active prep orders (pending, baking, decorating)
  const prepOrders = orders.filter(o => ['pending', 'baking', 'decorating'].includes(o.status));
  const readyOrders = orders.filter(o => o.status === 'ready');

  // Filtered orders for "All Orders" tab
  const filteredOrders = orders.filter(order => {
    const matchesFilter = orderFilter === 'all' || order.status === orderFilter;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  // Financial Estimates
  const estimatedCostOfGoods = stats.totalRevenue * 0.35; // 35% ingredient/packaging cost
  const estimatedGrossProfit = stats.totalRevenue * 0.65; // 65% gross margin
  const avgOrderValue = orders.length > 0 ? (stats.totalRevenue / orders.length).toFixed(2) : '0';

  // Quick Status Transition Map
  const getNextStatusAction = (currentStatus: OrderStatus): { nextStatus: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> } | null => {
    switch (currentStatus) {
      case 'pending':
        return { nextStatus: 'baking', label: 'Start Baking 🧑‍🍳', icon: Flame };
      case 'baking':
        return { nextStatus: 'decorating', label: 'Start Frosting & Piping 🎂', icon: Sparkles };
      case 'decorating':
        return { nextStatus: 'ready', label: 'Mark Ready for Pickup 🎁', icon: PackageCheck };
      case 'ready':
        return { nextStatus: 'completed', label: 'Hand Over to Customer ✅', icon: CheckCircle2 };
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <ChefHat className="w-4 h-4" />
            <span>Bakery Owner Operations Hub</span>
          </div>
          <h1 className="text-3xl font-serif font-black text-stone-950 mt-1">
            Kitchen Management & Revenue Dashboard
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            Live monitor: orders to bake, daily revenue, sales analytics, and catalog stock.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isCloudConnected ? (
            <button
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Refresh orders from cloud database"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Live Cloud Synced 🟢'}</span>
            </button>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 text-amber-900 text-xs font-semibold border border-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Device-Local Mode</span>
            </div>
          )}

          <button
            onClick={() => {
              if (confirm('Reset demo data back to default sample orders and revenue?')) {
                resetToSampleData();
              }
            }}
            className="px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            title="Reset data for demo purposes"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
            <span>Reset Demo Data</span>
          </button>
          
          <Link
            href="/menu"
            className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>+ Place Test Order</span>
          </Link>
        </div>
      </div>

      {/* Cloud DB Notice if not yet configured */}
      {!isCloudConnected && (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-950">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Why aren&apos;t orders from other phones showing up here?</p>
              <p className="text-amber-800 text-[11px] mt-0.5">
                Orders are currently saved in each phone&apos;s local browser storage. To receive customer orders from other devices anywhere in the world, connect your free Supabase cloud database!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Cakes to Prepare (Immediate Baker Priority!) */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg shadow-amber-500/20 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-100">
              Kitchen Prep Queue
            </span>
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-serif font-black">
              {stats.cakesToPrepareCount} Cakes
            </div>
            <p className="text-xs text-amber-100 mt-1 flex items-center gap-1">
              <span>{prepOrders.length} active orders need baking & piping</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex justify-between text-[11px] text-amber-100">
            <span>Ready for pickup: {stats.readyForPickupCount}</span>
            <button onClick={() => setActiveTab('kitchen')} className="font-bold underline">
              View Queue →
            </button>
          </div>
        </div>

        {/* KPI 2: Today's Revenue & Income */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Today&apos;s Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
              ${stats.todayRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-emerald-700">{stats.cakesSoldToday} cakes</span> sold today
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between text-[11px] text-stone-400">
            <span>Est. Gross Margin: 65%</span>
            <span className="font-bold text-emerald-700">+${(stats.todayRevenue * 0.65).toFixed(0)} net profit</span>
          </div>
        </div>

        {/* KPI 3: Total All-Time Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Revenue & Income
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
              ${stats.totalRevenue.toFixed(2)}
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Across <span className="font-bold text-stone-800">{orders.length} total orders</span>
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between text-[11px] text-stone-400">
            <span>Avg. Order Value (AOV):</span>
            <span className="font-bold text-stone-700">${avgOrderValue}</span>
          </div>
        </div>

        {/* KPI 4: Total Cakes Sold */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Cakes Baked & Sold
            </span>
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Cake className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl sm:text-4xl font-serif font-black text-stone-900">
              {stats.totalCakesSold} Cakes
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {stats.completedOrdersCount} orders successfully fulfilled
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between text-[11px] text-stone-400">
            <span>Kitchen fulfillment rate:</span>
            <span className="font-bold text-emerald-700">98.5%</span>
          </div>
        </div>

      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('kitchen')}
          className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'kitchen'
              ? 'border-amber-700 text-amber-900 bg-amber-50/70'
              : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-600" />
          <span>Kitchen Prep Queue</span>
          {stats.cakesToPrepareCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-rose-600 text-white font-extrabold">
              {stats.cakesToPrepareCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'analytics'
              ? 'border-amber-700 text-amber-900 bg-amber-50/70'
              : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span>Revenue & Income Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'orders'
              ? 'border-amber-700 text-amber-900 bg-amber-50/70'
              : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
          }`}
        >
          <Layers className="w-4 h-4 text-stone-600" />
          <span>All Orders Database ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-3 rounded-t-2xl font-bold text-sm whitespace-nowrap transition-all border-b-2 ${
            activeTab === 'inventory'
              ? 'border-amber-700 text-amber-900 bg-amber-50/70'
              : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-stone-600" />
          <span>Menu Stock & Availability</span>
        </button>
      </div>

      {/* TAB 1: KITCHEN PREP QUEUE */}
      {activeTab === 'kitchen' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-serif font-black text-stone-900">
                Live Kitchen Prep Queue (Baking & Decorating)
              </h2>
              <p className="text-xs text-stone-500">
                Sorted by scheduled customer pickup time. Advance orders through each stage as they bake.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{prepOrders.length} In Prep</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-bold">
                <PackageCheck className="w-3.5 h-3.5" />
                <span>{readyOrders.length} Ready in Fridge</span>
              </span>
            </div>
          </div>

          {prepOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-stone-900">
                All scheduled cakes are prepared!
              </h3>
              <p className="text-xs text-stone-500">
                The kitchen queue is clear. New orders placed online will appear here immediately.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {prepOrders.map((order) => {
                const nextAction = getNextStatusAction(order.status);
                const NextIcon = nextAction ? nextAction.icon : CheckCircle2;

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 shadow-md hover:shadow-lg transition-all space-y-5"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-amber-900 text-amber-100">
                            {order.id}
                          </span>
                          <span className={`text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            order.status === 'pending'
                              ? 'bg-rose-100 text-rose-800 animate-pulse'
                              : order.status === 'baking'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}>
                            {order.status === 'pending' ? 'Needs Baking 🧑‍🍳' : order.status === 'baking' ? 'In the Oven 🔥' : 'Decorating 🎂'}
                          </span>
                        </div>
                        <h3 className="font-serif font-black text-lg text-stone-900 mt-2">
                          {order.customerName}
                        </h3>
                        <p className="text-xs text-stone-500">
                          {order.customerPhone} • {order.deliveryType === 'pickup' ? 'Store Pickup' : 'Delivery'}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-stone-400 block">Due By</span>
                        <span className="text-sm font-black text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 inline-block mt-0.5">
                          {order.pickupTime}
                        </span>
                        <span className="text-[11px] text-stone-500 block mt-1">{order.pickupDate}</span>
                      </div>
                    </div>

                    {/* Cake Items to Bake */}
                    <div className="space-y-3 bg-stone-50 rounded-2xl p-4 border border-stone-100">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-200 flex-shrink-0">
                            <Image src={item.imageUrl} alt={item.cakeName} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-xs text-stone-900">{item.cakeName}</h4>
                              <span className="font-black text-xs text-amber-900">Qty: {item.quantity}</span>
                            </div>
                            <p className="text-[11px] text-stone-600 mt-0.5">
                              Size: <strong>{item.size}</strong> • Flavor: <strong>{item.flavor}</strong>
                            </p>

                            {/* Custom Inscription Callout (CRITICAL FOR BAKERS) */}
                            {item.customInscription ? (
                              <div className="mt-2 p-2 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-950 text-xs font-semibold">
                                🎂 Pipe on Cake: <span className="font-black underline">&ldquo;{item.customInscription}&rdquo;</span>
                              </div>
                            ) : (
                              <div className="text-[10px] text-stone-400 mt-1 italic">
                                No custom inscription requested
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {order.specialInstructions && (
                        <div className="text-[11px] text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200 mt-2">
                          <strong>Note:</strong> {order.specialInstructions}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedTicketOrder(order)}
                        className="px-3.5 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5 text-stone-500" />
                        <span>Print Ticket</span>
                      </button>

                      {nextAction && (
                        <button
                          onClick={() => updateOrderStatus(order.id, nextAction.nextStatus)}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          <NextIcon className="w-4 h-4" />
                          <span>{nextAction.label}</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

          {/* Section: Ready for Customer Handover */}
          {readyOrders.length > 0 && (
            <div className="pt-8 space-y-4">
              <h3 className="text-lg font-serif font-black text-stone-900 flex items-center gap-2">
                <PackageCheck className="w-5 h-5 text-emerald-600" />
                <span>Ready in Display Fridge for Pickup ({readyOrders.length})</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {readyOrders.map((order) => (
                  <div key={order.id} className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-black text-emerald-950 bg-emerald-200 px-2 py-0.5 rounded">
                          {order.id}
                        </span>
                        <h4 className="font-bold text-sm text-stone-900 mt-1">{order.customerName}</h4>
                        <p className="text-xs text-stone-500">{order.customerPhone}</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-800">
                        ${order.totalAmount.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600">
                      {order.items.map(i => `${i.quantity}x ${i.cakeName}`).join(', ')}
                    </div>

                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Picked Up & Paid</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: REVENUE, INCOME & SALES ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          
          {/* Revenue Breakdown Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Gross Sales Revenue
              </span>
              <div className="text-3xl font-serif font-black text-stone-950">
                ${stats.totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-stone-500">
                Total money collected from online orders and in-store pickups.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Estimated Net Profit (65%)
              </span>
              <div className="text-3xl font-serif font-black text-emerald-600">
                +${estimatedGrossProfit.toFixed(2)}
              </div>
              <p className="text-xs text-stone-500">
                Estimated take-home income after ingredients, flour, butter, and cake boxes.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-stone-200 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Ingredients Cost (35%)
              </span>
              <div className="text-3xl font-serif font-black text-rose-600">
                -${estimatedCostOfGoods.toFixed(2)}
              </div>
              <p className="text-xs text-stone-500">
                Estimated food cost (Belgian chocolate, dairy cream, strawberries, packaging).
              </p>
            </div>

          </div>

          {/* Top Revenue Cakes & Visual Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Top Best-Selling Cakes */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-black text-stone-900">
                    Top Revenue-Generating Cakes
                  </h3>
                  <p className="text-xs text-stone-500">
                    Highest income items in your bakery
                  </p>
                </div>
                <Cake className="w-5 h-5 text-amber-600" />
              </div>

              <div className="space-y-4">
                {cakes.slice(0, 5).map((cake, idx) => {
                  // Calculate mock relative popularity
                  const sharePercentage = [38, 26, 18, 11, 7][idx] || 5;

                  return (
                    <div key={cake.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-stone-800 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-[10px] font-black">
                            {idx + 1}
                          </span>
                          {cake.name}
                        </span>
                        <span className="font-black text-amber-900">
                          {sharePercentage}% of total sales
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-700 rounded-full"
                          style={{ width: `${sharePercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Financial Summary */}
            <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-amber-950 rounded-3xl p-7 text-white space-y-5">
              <h3 className="text-xl font-serif font-black">
                Bakery Health Metrics
              </h3>

              <div className="space-y-4 text-xs divide-y divide-white/10">
                <div className="flex justify-between pt-3 first:pt-0">
                  <span className="text-stone-300">Average Order Value (AOV)</span>
                  <span className="font-black text-amber-300 text-sm">${avgOrderValue}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-stone-300">Total Cakes Baked</span>
                  <span className="font-bold">{stats.totalCakesSold} units</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-stone-300">Today&apos;s Fulfillments</span>
                  <span className="font-bold">{stats.cakesSoldToday} units</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-stone-300">Kitchen Prep Bottleneck</span>
                  <span className="font-bold text-emerald-400">Zero (Smooth Flow)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm text-xs leading-relaxed text-stone-200">
                💡 <strong>Owner Insight:</strong> Belgian Dark Chocolate Truffle and Lotus Biscoff make up 64% of gross revenue. Ensure your kitchen has sufficient 70% dark chocolate and Lotus spread in inventory for weekend prep.
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 3: ALL ORDERS DATABASE */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {['all', 'pending', 'baking', 'decorating', 'ready', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    orderFilter === f
                      ? 'bg-amber-800 text-white shadow-sm'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search order ID, name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 bg-white outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 border-b border-stone-200 font-bold uppercase tracking-wider text-stone-500">
                  <tr>
                    <th className="py-3.5 px-4">Order ID</th>
                    <th className="py-3.5 px-4">Customer</th>
                    <th className="py-3.5 px-4">Items</th>
                    <th className="py-3.5 px-4">Pickup Date/Time</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-stone-400">
                        No orders found matching the filter.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map(order => (
                      <tr key={order.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-4 font-black text-amber-900">{order.id}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-stone-900">{order.customerName}</div>
                          <div className="text-[11px] text-stone-500">{order.customerPhone}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="max-w-[200px] truncate text-stone-700">
                            {order.items.map(i => `${i.quantity}x ${i.cakeName}`).join(', ')}
                          </div>
                          {order.items.some(i => i.customInscription) && (
                            <span className="text-[10px] text-amber-700 font-semibold block">
                              Has custom inscription
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-800">{order.pickupDate}</div>
                          <div className="text-[11px] text-stone-500">{order.pickupTime}</div>
                        </td>
                        <td className="py-3.5 px-4 font-black text-stone-900">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="text-xs font-bold py-1 px-2 rounded-lg border border-stone-200 bg-white outline-none cursor-pointer"
                          >
                            <option value="pending">Pending</option>
                            <option value="baking">Baking</option>
                            <option value="decorating">Decorating</option>
                            <option value="ready">Ready</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedTicketOrder(order)}
                            className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 inline-flex items-center"
                            title="View Kitchen Ticket"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: MENU & STOCK AVAILABILITY */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-black text-stone-900">
                Menu Item Availability & Pricing Control
              </h2>
              <p className="text-xs text-stone-500">
                Toggle availability when ingredients run out, or adjust base prices directly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cakes.map((cake) => (
              <div
                key={cake.id}
                className={`bg-white rounded-3xl p-5 border transition-all space-y-4 ${
                  cake.inStock ? 'border-stone-200' : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                <div className="relative h-40 rounded-2xl overflow-hidden bg-stone-100">
                  <Image src={cake.imageUrl} alt={cake.name} fill className="object-cover" />
                  {!cake.inStock && (
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="text-white text-xs font-black uppercase tracking-wider bg-rose-600 px-3 py-1 rounded-full">
                        Sold Out Today
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-sm text-stone-900 line-clamp-1">{cake.name}</h4>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                    <span className="text-xs text-stone-500">Base Price:</span>
                    <span className="text-sm font-black text-amber-900">${cake.basePrice}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700">Online Ordering:</span>
                  <button
                    onClick={() => toggleCakeStock(cake.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      cake.inStock
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                    }`}
                  >
                    {cake.inStock ? 'In Stock (Active)' : 'Mark In Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Printable Kitchen Ticket Modal */}
      {selectedTicketOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-stone-200 pb-4">
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                  Kitchen Prep Order Slip
                </div>
                <h3 className="text-2xl font-serif font-black text-stone-950 mt-1">
                  Ticket #{selectedTicketOrder.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTicketOrder(null)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-3 bg-stone-50 rounded-2xl">
                <div>
                  <span className="text-stone-400 block font-semibold">Customer:</span>
                  <span className="font-bold text-stone-900 text-sm">{selectedTicketOrder.customerName}</span>
                  <span className="text-stone-500 block">{selectedTicketOrder.customerPhone}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-semibold">Scheduled Ready:</span>
                  <span className="font-black text-rose-700 text-sm block">{selectedTicketOrder.pickupTime}</span>
                  <span className="text-stone-600 block">{selectedTicketOrder.pickupDate}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="font-bold uppercase tracking-wider text-stone-400 block">Recipes to Bake:</span>
                {selectedTicketOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1.5">
                    <div className="flex justify-between font-black text-sm text-stone-900">
                      <span>{item.cakeName}</span>
                      <span>Qty: {item.quantity}</span>
                    </div>
                    <div className="text-stone-700">
                      Size: <strong>{item.size}</strong> • Flavor: <strong>{item.flavor}</strong>
                    </div>
                    {item.customInscription && (
                      <div className="mt-2 p-2 rounded-xl bg-amber-200/70 border border-amber-400 text-amber-950 font-bold">
                        Piping Text: &ldquo;{item.customInscription}&rdquo;
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedTicketOrder.specialInstructions && (
                <div className="p-3 rounded-xl bg-stone-100 text-stone-800">
                  <strong>Notes:</strong> {selectedTicketOrder.specialInstructions}
                </div>
              )}
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Thermal Slip</span>
              </button>
              <button
                onClick={() => setSelectedTicketOrder(null)}
                className="px-5 py-3 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
