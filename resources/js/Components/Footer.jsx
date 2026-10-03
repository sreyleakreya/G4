import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
  return (
    <footer className="border-t border-pink-100 bg-slate-950 pb-8 pt-12 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
          
          {/* Col 1: About & Info */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 text-lg font-black text-white shadow-lg shadow-pink-500/20">G4</span>
              <span className="text-lg font-bold text-white">AUTO CARE</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              A center for buying, selling, trading, and financing all types of vehicles, offering fast, reliable service and a high level of trust.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-[0.18em]">Quick link</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-slate-300 hover:text-pink-300 transition">Home</Link></li>
              <li><Link href="/categories" className="text-slate-300 hover:text-pink-300 transition">VEHICLE TYPE</Link></li>
              <li><Link href="/installment" className="text-slate-300 hover:text-pink-300 transition">INSTALLMENT</Link></li>
              <li><Link href="/trade-in" className="text-slate-300 hover:text-pink-300 transition">TRADE-IN</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-pink-300 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-[0.18em]">Product Category</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories?type=car" className="text-slate-300 hover:text-pink-300 transition">Cars</Link></li>
              <li><Link href="/categories?type=moto" className="text-slate-300 hover:text-pink-300 transition">Motorcycles</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-[0.18em]">Contact Information</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>📍 Phnom Penh, Cambodia</li>
              <li>📞 012 345 678 / 098 765 432</li>
              <li>✉️ info@g4autocare.com</li>
              <li>💬 @G4AutoCareAdmin</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} G4 Auto Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}