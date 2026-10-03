import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Heart, Phone, ShieldCheck } from 'lucide-react';
import PageFrame from '@/Components/PageFrame';
import { useWishlist } from '@/Context/WishlistContext';
import { checkoutUrl } from '@/data/checkout';
import { vehicles, formatPrice } from '@/data/vehicles';
import AddToCartButton from '@/Components/AddToCartButton';

export default function Product({ product }) {
  const id = String(usePage().props.product?.id || product?.id || '').trim();
  const vehicle = vehicles.find((item) => item.id === id) || vehicles[0];
  const { toggleWishlist, isInWishlist } = useWishlist();
  const saved = isInWishlist(vehicle.id);

  const highlights = [
    'Certified quality checked before release',
    'Transparent ownership and service history',
    'Friendly support from our automotive team',
  ];

  const specs = [
    ['Brand', vehicle.brand],
    ['Type', vehicle.type],
    ['Mileage', vehicle.specs?.split('|')[0]?.trim() || 'Ready to drive'],
    ['Transmission', vehicle.specs?.split('|')[1]?.trim() || 'Automatic'],
  ];

  return <PageFrame title={vehicle.name} eyebrow="Vehicle details" heading={vehicle.name} intro={vehicle.specs}>
    <Link href="/categories" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-600"><ArrowLeft className="h-4 w-4" /> Back to collection</Link>
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="overflow-hidden rounded-[28px] border border-pink-100 bg-white p-3 shadow-[0_22px_52px_-28px_rgba(15,23,42,0.3)]">
        <div className="overflow-hidden rounded-[22px] bg-slate-100">
          <img src={vehicle.image} alt={vehicle.name} className="aspect-[4/3] h-full w-full object-cover" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[vehicle.image, vehicle.image, vehicle.image].map((img, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img src={img} alt={`${vehicle.name} view ${index + 1}`} className="aspect-[4/5] h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.3)] sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-600">{vehicle.brand} / {vehicle.type}</p>
          <button
            type="button"
            onClick={() => toggleWishlist(vehicle)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-red-200 hover:text-red-600"
          >
            <Heart className={`h-4 w-4 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>

        <h2 className="mt-3 text-3xl font-black text-slate-900">{vehicle.name}</h2>
        <p className="mt-5 text-3xl font-black text-red-600">{formatPrice(vehicle.price)}</p>

        <div className="my-7 grid gap-3 border-y border-slate-100 py-6 text-sm text-slate-600">
          {highlights.map((item) => (
            <p key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              <span>{item}</span>
            </p>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {specs.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{label}</div>
              <div className="mt-2 text-sm font-bold text-slate-800">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={checkoutUrl([vehicle])} className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5">Buy now</Link>
          <AddToCartButton item={vehicle} className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:border-red-300 hover:text-red-600" />
        </div>
      </div>
    </div>
  </PageFrame>;
}
