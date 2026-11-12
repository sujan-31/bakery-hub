'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useBakery } from '@/context/BakeryContext';
import confetti from 'canvas-confetti';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateCartQuantity, clearCart, cartTotal, placeOrder } = useBakery();

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  
  // Date and Time
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [pickupDate, setPickupDate] = useState(defaultDate);
  const [pickupTime, setPickupTime] = useState('15:00 (3:00 PM)');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_pickup' | 'card_online' | 'upi'>('card_online');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const tax = parseFloat((cartTotal * 0.08).toFixed(2));
  const deliveryFee = deliveryType === 'delivery' ? 12.0 : 0.0;
  const grandTotal = parseFloat((cartTotal + tax + deliveryFee).toFixed(2));

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (cart.length === 0) {
      setErrorMsg('Your cart is empty. Please add a cake first.');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMsg('Please enter your full name and contact phone number.');
      return;
    }

    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Please enter your delivery street address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore if canvas not supported
      }

      const newOrder = placeOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || 'customer@example.com',
        deliveryType,
        deliveryAddress: deliveryType === 'delivery' ? deliveryAddress.trim() : undefined,
        pickupDate,
        pickupTime,
        specialInstructions: specialInstructions.trim() || undefined,
        items: cart.map(item => ({
          cakeId: item.cakeId,
          cakeName: item.cakeName,
          unitPrice: item.unitPrice,
          size: item.size,
          flavor: item.flavor,
          customInscription: item.customInscription,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        subtotal: cartTotal,
        tax,
        totalAmount: grandTotal,
        isPaid: paymentMethod !== 'cash_on_pickup',
        paymentMethod
      });

      // Redirect to Order Tracking page
      router.push(`/track?id=${newOrder.id}&placed=true`);
    } catch (err) {
      setErrorMsg('Something went wrong placing the order. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 flex items-center justify-center text-amber-700">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-black text-stone-900">Your Cake Box is Empty</h1>
          <p className="text-stone-500 text-sm max-w-md mx-auto">
            You haven&apos;t added any artisanal cakes or pastries to your order yet. Check out our fresh menu!
          </p>
        </div>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm shadow-xl shadow-amber-700/20 transition-all hover:scale-105"
        >
          <span>Browse Fresh Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-950">
          Order Summary & Kitchen Booking
        </h1>
        <p className="text-stone-500 text-sm mt-1">
          Review your items and set your pickup or delivery time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Cart Items (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h2 className="font-serif font-black text-lg text-stone-900 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <span>Selected Delights ({cart.length})</span>
              </h2>
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4 divide-y divide-stone-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={item.imageUrl}
                      alt={item.cakeName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h3 className="font-bold text-stone-900 text-sm truncate">
                      {item.cakeName}
                    </h3>
                    <div className="text-xs text-stone-500 space-x-2">
                      <span className="font-medium text-stone-700">{item.size}</span>
                      <span>•</span>
                      <span>{item.flavor}</span>
                    </div>

                    {item.customInscription && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/60 text-[11px] font-medium text-amber-900 mt-1">
                        <Sparkles className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span>Piping: &ldquo;{item.customInscription}&rdquo;</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                        >
                          <Minus className="w-3 h-3 text-stone-600" />
                        </button>
                        <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center hover:bg-stone-50"
                        >
                          <Plus className="w-3 h-3 text-stone-600" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-black text-sm text-stone-900">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <Link
                href="/menu"
                className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                <span>+ Add more cakes from menu</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Checkout & Baker Schedule Form (5 cols) */}
        <div className="lg:col-span-5">
          <form
            onSubmit={handleCheckout}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-md space-y-6"
          >
            <h2 className="font-serif font-black text-xl text-stone-900">
              Customer & Schedule Details
            </h2>

            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Delivery vs Pickup Selector */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Store Pickup (Free)
              </button>
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`py-2 text-xs font-bold rounded-xl transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Local Delivery (+$12)
              </button>
            </div>

            {/* Customer Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Green"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="rachel@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  />
                </div>
              </div>

              {deliveryType === 'delivery' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Street address, apartment/suite number, postal code"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                  />
                </div>
              )}
            </div>

            {/* Pickup / Preparation Timing */}
            <div className="pt-2 border-t border-stone-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>When should our kitchen have this ready?</span>
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Preferred Time</label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-500 outline-none bg-white"
                  >
                    <option value="11:00 (11:00 AM)">11:00 AM</option>
                    <option value="13:00 (1:00 PM)">1:00 PM</option>
                    <option value="15:00 (3:00 PM)">3:00 PM</option>
                    <option value="17:00 (5:00 PM)">5:00 PM</option>
                    <option value="19:00 (7:00 PM)">7:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-stone-500 mb-1">
                  Special Kitchen Notes (Allergies, Eggless request, extra candles)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please provide 25 candles & matches"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-2 border-t border-stone-100 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card_online')}
                  className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all ${
                    paymentMethod === 'card_online'
                      ? 'border-amber-600 bg-amber-50/70 text-amber-900'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  Credit/Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-amber-600 bg-amber-50/70 text-amber-900'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  UPI / Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash_on_pickup')}
                  className={`p-2 rounded-xl text-center border text-[11px] font-bold transition-all ${
                    paymentMethod === 'cash_on_pickup'
                      ? 'border-amber-600 bg-amber-50/70 text-amber-900'
                      : 'border-stone-200 text-stone-600'
                  }`}
                >
                  Cash on Pickup
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Items Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>State Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-stone-500">
                  <span>Local Chilled Delivery</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-100">
                <span>Total Amount</span>
                <span className="text-amber-800">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-amber-700 hover:bg-amber-800 disabled:bg-stone-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-700/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{isSubmitting ? 'Sending to Bakery Oven...' : 'Confirm Order & Send to Kitchen'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-stone-400">
              Instant confirmation • Direct status tracking provided upon placing
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
