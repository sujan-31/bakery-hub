'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBakery } from '@/context/BakeryContext';
import { Cake, ShoppingBag, ChefHat, Search, Menu as MenuIcon, X, Clock, Sparkles } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, stats } = useBakery();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm transition-all">
      {/* Top Banner Notice */}
      <div className="bg-amber-900 text-amber-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Freshly baked daily! Same-day custom cake orders accepted until 2:00 PM</span>
        <span className="hidden sm:inline text-amber-300">| Call us: (555) 839-2253</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-500 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Cake className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-amber-950 group-hover:text-amber-700 transition-colors">
                Sweet Crumbs
              </span>
              <span className="block text-[11px] uppercase tracking-widest font-semibold text-amber-600">
                Artisan Bakery & Patisserie
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/') 
                  ? 'text-amber-700 bg-amber-50' 
                  : 'text-stone-700 hover:text-amber-700 hover:bg-stone-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                isActive('/menu') 
                  ? 'text-amber-700 bg-amber-50' 
                  : 'text-stone-700 hover:text-amber-700 hover:bg-stone-50'
              }`}
            >
              Cakes & Pastries
            </Link>
            <Link
              href="/track"
              className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                isActive('/track') 
                  ? 'text-amber-700 bg-amber-50' 
                  : 'text-stone-700 hover:text-amber-700 hover:bg-stone-50'
              }`}
            >
              <Search className="w-4 h-4 text-stone-400" />
              Track Order
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Admin Portal Button */}
            <Link
              href="/admin"
              className="relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-all shadow-sm"
              title="Bakery Owner & Kitchen Portal"
            >
              <ChefHat className="w-4 h-4 text-amber-700" />
              <span>Owner Portal</span>
              {stats.cakesToPrepareCount > 0 && (
                <span className="flex h-5 min-w-[20px] px-1 items-center justify-center text-[11px] font-bold text-white bg-rose-600 rounded-full animate-bounce">
                  {stats.cakesToPrepareCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm shadow-md shadow-amber-700/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-amber-300 text-amber-950 text-xs font-black px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl font-medium text-stone-800 hover:bg-amber-50 hover:text-amber-700"
          >
            Home
          </Link>
          <Link
            href="/menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl font-medium text-stone-800 hover:bg-amber-50 hover:text-amber-700"
          >
            Cakes & Pastries Menu
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-xl font-medium text-stone-800 hover:bg-amber-50 hover:text-amber-700"
          >
            Track Your Order
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl font-bold bg-amber-100 text-amber-900"
          >
            <span className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-amber-700" />
              Owner & Kitchen Dashboard
            </span>
            {stats.cakesToPrepareCount > 0 && (
              <span className="text-xs bg-rose-600 text-white font-bold px-2 py-0.5 rounded-full">
                {stats.cakesToPrepareCount} to prep
              </span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}
