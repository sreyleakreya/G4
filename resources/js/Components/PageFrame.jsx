import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function PageFrame({ title, eyebrow, heading, intro, children }) {
  return (
    <div className="page-shell min-h-screen text-slate-800">
      <Head title={title} />
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-pink-100 bg-[radial-gradient(circle_at_top,_rgba(252,165,165,0.38),_rgba(255,255,255,0.9)_30%,_rgba(244,244,245,0.98)_62%,_rgba(228,233,239,0.96)_100%)] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 border-l border-slate-300/60 bg-white/30 lg:block" />
          <div className="premium-grid relative mx-auto max-w-7xl rounded-[28px] border border-pink-100 bg-white/35 p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-8">
            <div className="mb-5 flex flex-wrap gap-2">
              <span className="cute-badge">{eyebrow}</span>
              <span className="detail-pill">Verified inventory</span>
              <span className="detail-pill">Finance ready</span>
            </div>
            <h1 className="max-w-3xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">{heading}</h1>
            {intro && <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">{intro}</p>}
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
