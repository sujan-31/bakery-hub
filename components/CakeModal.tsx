'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CakeItem } from '@/types';
import { useBakery } from '@/context/BakeryContext';
import { X, Sparkles, Clock, Check, ShoppingBag, Plus, Minus } from 'lucide-react';

interface CakeModalProps {
  cake: CakeItem | null;
  onClose: () => void;
  onAdded: () => void;
}

export default function CakeModal({ cake, onClose, onAdded }: CakeModalProps) {
  const { addToCart } = useBakery();

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [customInscription, setCustomInscription] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Initialize defaults when modal opens
  React.useEffect(() => {
    if (cake) {
      setSelectedSizeIndex(0);
      setSelectedFlavor(cake.flavors[0] || '');
      setCustomInscription('');
      setQuantity(1);
    }
  }, [cake]);

  if (!cake) return null;

  const currentSize = cake.sizes[selectedSizeIndex] || cake.sizes[0];
  const unitPrice = parseFloat((cake.basePrice * (currentSize?.multiplier || 1)).toFixed(2));
  const totalPrice = parseFloat((unitPrice * quantity).toFixed(2));

  const handleAddToCart = () => {
    addToCart({
      cakeId: cake.id,
      cakeName: cake.name,
      unitPrice,
      size: currentSize.label,
      flavor: selectedFlavor,
      customInscription: customInscription.trim() || undefined,
      quantity,
      imageUrl: cake.imageUrl
    });

    onAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Cake Image Column */}
          <div className="relative h-64 md:h-full min-h-[260px] bg-stone-100">
            <Image
              src={cake.imageUrl}
              alt={cake.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
            <div className="absolute bottom-4 left-4 text-white md:hidden">
              <span className="text-xs bg-amber-600 px-2.5 py-1 rounded-full font-bold">
                {cake.prepTimeHours} hrs prep required
              </span>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-5">
              
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Prep time: {cake.prepTimeHours} hours</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 leading-tight">
                  {cake.name}
                </h3>
                <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                  {cake.description}
                </p>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. Select Cake Size & Servings
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {cake.sizes.map((s, idx) => {
                    const price = (cake.basePrice * s.multiplier).toFixed(0);
                    const isSelected = selectedSizeIndex === idx;
                    return (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={`p-2.5 rounded-xl text-left border transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-600/20'
                            : 'border-stone-200 hover:border-amber-300 bg-white'
                        }`}
                      >
                        <div className="text-xs font-bold text-stone-900">{s.label}</div>
                        <div className="text-[11px] text-stone-500">{s.servings}</div>
                        <div className="text-xs font-extrabold text-amber-700 mt-1">${price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flavor Selector */}
              {cake.flavors.length > 0 && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    2. Choose Flavor Variation
                  </label>
                  <div className="space-y-1.5">
                    {cake.flavors.map(f => (
                      <label
                        key={f}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer text-xs transition-all ${
                          selectedFlavor === f 
                            ? 'border-amber-600 bg-amber-50/40 text-stone-900 font-semibold' 
                            : 'border-stone-200 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="cake-flavor"
                          value={f}
                          checked={selectedFlavor === f}
                          onChange={() => setSelectedFlavor(f)}
                          className="text-amber-600 focus:ring-amber-500"
                        />
                        <span>{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Piping / Inscription */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>3. Custom Cake Inscription (Optional)</span>
                  </label>
                  <span className="text-[10px] text-stone-400">Free of charge</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g., Happy 25th Birthday Sarah! 🎂"
                  value={customInscription}
                  onChange={(e) => setCustomInscription(e.target.value)}
                  maxLength={40}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all placeholder:text-stone-400"
                />
                <p className="text-[10px] text-stone-400 mt-1">Our pastry chef will pipe this on the cake surface with melted chocolate.</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 active:bg-stone-100"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50 active:bg-stone-100"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Add to Cart Action */}
            <div className="pt-6 mt-4 border-t border-stone-100">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!cake.inStock}
                className="w-full py-3.5 px-6 rounded-2xl bg-amber-700 hover:bg-amber-800 disabled:bg-stone-300 text-white font-bold text-sm flex items-center justify-between shadow-lg shadow-amber-700/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>{cake.inStock ? 'Add to Cart' : 'Sold Out for Today'}</span>
                </div>
                <span className="text-base font-black">${totalPrice.toFixed(2)}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
