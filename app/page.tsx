'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBakery } from '@/context/BakeryContext';
import CakeModal from '@/components/CakeModal';
import { CakeItem } from '@/types';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Star, 
  ShieldCheck, 
  ChefHat, 
  Flame, 
  Award, 
  Heart,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const { cakes, stats } = useBakery();
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const featuredCakes = cakes.slice(0, 4);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Handcrafted with Real Butter & Passion</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tight text-stone-950 leading-[1.1]">
                Cakes so delicious, they steal the <span className="text-amber-700 underline decoration-amber-300 underline-offset-8">celebration</span>.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                Order custom birthday cakes, velvety chocolate ganache masterpieces, and artisanal pastries online. Every creation is baked to order and trackable live in our kitchen.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/menu"
                  className="px-7 py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-xl shadow-amber-700/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Order Cakes Online</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/track"
                  className="px-6 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm sm:text-base border border-stone-200 flex items-center gap-2 transition-all shadow-sm"
                >
                  <Search className="w-4 h-4 text-stone-500" />
                  <span>Track My Order</span>
                </Link>

                <Link
                  href="/admin"
                  className="px-5 py-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-sm sm:text-base border border-amber-200 flex items-center gap-2 transition-all"
                >
                  <ChefHat className="w-4 h-4 text-amber-700" />
                  <span>Admin / Kitchen Portal</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-amber-100/80">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-900 font-serif">
                    {stats.totalCakesSold}+
                  </div>
                  <div className="text-xs text-stone-500 font-medium">Cakes Baked</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-900 font-serif">4.9 ★</div>
                  <div className="text-xs text-stone-500 font-medium">Google Reviews</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-amber-900 font-serif">3–4 Hrs</div>
                  <div className="text-xs text-stone-500 font-medium">Fast Fresh Turnaround</div>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Floating Kitchen Status Pill */}
                <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-amber-100 flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-stone-900">Kitchen Oven Active</div>
                    <div className="text-[11px] text-amber-700 font-medium">
                      {stats.cakesToPrepareCount} cakes currently baking
                    </div>
                  </div>
                </div>

                {/* Hero Image Container */}
                <div className="relative h-[420px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80"
                    alt="Belgian Dark Chocolate Cake"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Overlay Info */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                      <Award className="w-4 h-4" />
                      <span>Chef&apos;s Signature</span>
                    </div>
                    <h3 className="text-2xl font-serif font-black">
                      Belgian Dark Chocolate Truffle
                    </h3>
                    <p className="text-xs text-stone-200 mt-1 line-clamp-1">
                      70% pure chocolate ganache with espresso infusion
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
                      <span className="text-lg font-bold">From $38</span>
                      <button
                        onClick={() => setSelectedCake(cakes[0])}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition-all"
                      >
                        Customize & Order
                      </button>
                    </div>
                  </div>
                </div>

                {/* Decorative blob behind */}
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-amber-200/50 rounded-full blur-3xl -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white py-14 border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                100% From Scratch
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Zero pre-mixes or artificial preservatives. We use cultured French butter, Madagascar Bourbon vanilla, and cage-free farm eggs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Real-Time Oven Tracking
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Watch your order progress live from dough preparation and oven baking to custom frosting and pickup packaging.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                Free Custom Piping Inscription
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Celebrate birthdays, anniversaries, or milestones. Add custom chocolate lettering and messages to any cake at no extra cost.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Cakes Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Fresh From Our Ovens
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-950 mt-1">
              Customer Favorite Celebrations
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 group"
          >
            <span>View Full Menu & Custom Options</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCakes.map((cake) => (
            <div
              key={cake.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={cake.imageUrl}
                    alt={cake.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {cake.popular && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      Best Seller
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {cake.prepTimeHours}h prep
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-black text-lg text-stone-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
                    {cake.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {cake.tagline}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Starting at</span>
                  <span className="text-lg font-black text-amber-900">${cake.basePrice}</span>
                </div>
                <button
                  onClick={() => setSelectedCake(cake)}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-700 text-amber-900 hover:text-white font-bold text-xs transition-colors"
                >
                  Order Now
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Bakery Owner Callout Card (Educating on Admin Portal) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-amber-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
              <ChefHat className="w-4 h-4" />
              <span>Built-in Bakery Operations System</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-black">
              Run your entire kitchen, revenue, and prep pipeline in one place.
            </h2>
            
            <p className="text-stone-300 text-sm leading-relaxed">
              Never miss a cake pickup or mix up customer inscription messages again. The owner portal lets bakers track prep queues, update order progress with 1 click, analyze daily revenue, and manage product inventory.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/admin"
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
              >
                <span>Launch Bakery Owner Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Decorative watermark */}
          <ChefHat className="absolute -right-10 -bottom-10 w-72 h-72 text-white/5 pointer-events-none" />
        </div>
      </section>

      {/* Cake Customization Modal */}
      <CakeModal
        cake={selectedCake}
        onClose={() => setSelectedCake(null)}
        onAdded={() => triggerToast('Added cake to your order cart!')}
      />

    </div>
  );
}
