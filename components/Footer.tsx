import React from 'react';
import Link from 'next/link';
import { Cake, Phone, MapPin, Clock, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white">
                <Cake className="w-6 h-6" />
              </div>
              <span className="text-xl font-serif font-black tracking-tight text-white">
                Sweet Crumbs
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Handcrafting artisanal celebration cakes, French macarons, and golden butter croissants since 2018. Made fresh every morning with organic ingredients.
            </p>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Bakery Hours
            </h4>
            <ul className="text-sm space-y-2 text-stone-400">
              <li className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="text-stone-200">7:00 AM – 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-stone-200">7:30 AM – 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-stone-200">8:00 AM – 6:00 PM</span>
              </li>
              <li className="text-xs text-amber-400/90 pt-1">
                * Same-day custom orders close at 2:00 PM
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Explore
            </h4>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Signature Cakes
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-amber-400 transition-colors">
                  Custom Birthday Cakes
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-amber-400 transition-colors">
                  Track Existing Order
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 font-medium transition-colors">
                  Bakery Owner Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              Visit Us
            </h4>
            <p className="text-sm text-stone-400">
              42 Artisan Way, Old Town Market<br />
              Downtown District, NY 10012
            </p>
            <p className="text-sm flex items-center gap-2 text-stone-300">
              <Phone className="w-4 h-4 text-amber-500" />
              (555) 839-2253
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Health Grade A+ Certified Patisserie</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Sweet Crumbs Patisserie. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for modern bakeries with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
