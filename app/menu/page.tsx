'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useBakery } from '@/context/BakeryContext';
import CakeModal from '@/components/CakeModal';
import { CakeItem, CakeCategory } from '@/types';
import { Search, Clock, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

const CATEGORIES: { id: CakeCategory; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'signature-cakes', label: 'Signature Cakes' },
  { id: 'custom-birthday', label: 'Custom Birthday & Party' },
  { id: 'cupcakes-pastries', label: 'Pastries & Macarons' },
  { id: 'artisan-breads', label: 'Artisan Breads' },
];

export default function MenuPage() {
  const { cakes } = useBakery();
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCake, setSelectedCake] = useState<CakeItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredCakes = useMemo(() => {
    return cakes.filter(cake => {
      const matchesCat = activeCategory === 'all' || cake.category === activeCategory;
      const matchesSearch = cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cake.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            cake.flavors.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [cakes, activeCategory, searchQuery]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
          Handmade Daily In Small Batches
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-950">
          Our Artisanal Menu & Custom Cakes
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Select any cake to personalize the size, flavor profile, and pipe a custom message on top for your celebration.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search flavor or cake..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs sm:text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredCakes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 space-y-3">
          <p className="text-stone-500 font-medium">No sweet creations found matching your filter.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="text-xs font-bold text-amber-700 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCakes.map((cake) => (
            <div
              key={cake.id}
              className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl ${
                !cake.inStock ? 'opacity-70 border-stone-200' : 'border-stone-200/90'
              }`}
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={cake.imageUrl}
                    alt={cake.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {!cake.inStock && (
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2px] flex items-center justify-center">
                      <span className="bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        Sold Out for Today
                      </span>
                    </div>
                  )}
                  {cake.popular && cake.inStock && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                      Chef Favorite
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    {cake.prepTimeHours}h prep
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-1 text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                    <span>{cake.category.replace('-', ' ')}</span>
                  </div>
                  <h3 className="font-serif font-black text-lg text-stone-900 group-hover:text-amber-700 transition-colors">
                    {cake.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {cake.tagline}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Starting at</span>
                  <span className="text-lg font-black text-amber-900">${cake.basePrice}</span>
                </div>
                <button
                  onClick={() => setSelectedCake(cake)}
                  disabled={!cake.inStock}
                  className="px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-white font-bold text-xs shadow-md shadow-amber-700/20 transition-all hover:scale-105 active:scale-95"
                >
                  {cake.inStock ? 'Customize' : 'Unavailable'}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <CakeModal
        cake={selectedCake}
        onClose={() => setSelectedCake(null)}
        onAdded={() => triggerToast('Cake added to cart! Proceed to checkout when ready.')}
      />

    </div>
  );
}
