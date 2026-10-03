import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Heart, ShoppingCart, Menu, X, User, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useWishlist } from '@/Context/WishlistContext'; // ត្រូវប្រាកដថា Path នេះត្រឹមត្រូវ
import { useCart } from '@/Context/CartContext';

export default function Header() {
  const { auth } = usePage().props;
  const currentPath = usePage().url.split('?')[0];
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();
  const { post, processing } = useForm();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = (event) => {
    event.preventDefault();
    post(route('logout'));
  };
  const navigation = [
    { href: '/', label: 'HOME' },
    { href: '/categories', label: 'VEHICLE TYPE' },
    { href: '/installment', label: 'INSTALLMENT' },
    { href: '/trade-in', label: 'TRADE-IN' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/85 text-slate-800 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.5)] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-lg font-black text-white shadow-lg shadow-red-200">
              G4
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-wider uppercase text-gray-900 leading-none">
                G4 <span className="text-red-500">AUTO CARE</span>
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-pink-500 uppercase mt-0.5">
                Premium Automotive
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-5 text-xs font-extrabold tracking-[0.14em] text-slate-700 lg:flex">
            {navigation.map(({ href, label }) => {
              const isActive = currentPath === href || (href !== '/' && currentPath.startsWith(`${href}/`));

              return (
                <Link key={href} href={href} aria-current={isActive ? 'page' : undefined} className={`rounded-full border px-3 py-2 transition-all ${isActive ? 'border-pink-200 bg-pink-50 text-red-600 shadow-sm' : 'border-transparent hover:border-pink-100 hover:bg-pink-50 hover:text-red-500'}`}>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* User Actions, Wishlist & Cart */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Wishlist Button (បេះដូង) */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 transition-all duration-300 hover:scale-105 active:scale-95"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 transition-colors ${wishlist?.length > 0 ? 'text-red-600 fill-red-600' : 'text-gray-600'}`} />
              {wishlist?.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-red-500/30">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button (កន្ត្រក) */}
            <Link
              href="/cart"
              className="relative p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 transition-all duration-300 hover:scale-105 active:scale-95"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black text-white shadow-md shadow-red-500/30">{cartCount}</span>}
            </Link>

            {/* Authentication UI */}
            {auth?.user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/account"
                  className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-800 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all duration-300"
                >
                  <User className="w-4 h-4 text-red-600" />
                  <span className="truncate max-w-[120px]">{auth.user.name}</span>
                </Link>
                <form onSubmit={handleLogout} className="inline-flex">
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
                    title="Log out"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{processing ? '...' : 'Logout'}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link 
                  href="/login" 
                  className="text-sm font-bold text-gray-700 hover:text-red-600 px-3 py-2 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md shadow-red-600/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Quick Icons */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Wishlist Quick Icon */}
            <Link href="/wishlist" className="relative p-2 text-gray-600">
              <Heart className={`w-5 h-5 ${wishlist?.length > 0 ? 'text-red-600 fill-red-600' : ''}`} />
              {wishlist?.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Mobile Cart Quick Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-black text-white">{cartCount}</span>}
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 hover:text-red-600 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-300 shadow-lg">
          <nav className="flex flex-col space-y-1 text-sm font-semibold">
            {navigation.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setIsMobileMenuOpen(false)} className={`block rounded-lg px-3 py-3 ${currentPath === href ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'}`}>
                {label}
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-3">
            {auth?.user ? (
              <div className="space-y-3">
                <Link href="/account" className="flex items-center justify-center gap-2 bg-gray-100 py-3 rounded-xl text-gray-800 font-bold">
                  <User className="w-4 h-4 text-red-600" />
                  My Account ({auth.user.name})
                </Link>
                <form onSubmit={handleLogout}>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-bold text-slate-700 transition hover:border-red-200 hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4" />
                    {processing ? 'Signing out...' : 'Log out'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" className="flex items-center justify-center gap-2 py-3 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-bold">
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>
                <Link href="/register" className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md shadow-red-600/20">
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}