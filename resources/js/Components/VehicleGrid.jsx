import React from 'react';
import { Link } from '@inertiajs/react';
import { Heart, ArrowRight } from 'lucide-react';
import AddToCartButton from '@/Components/AddToCartButton';
import { useWishlist } from '@/Context/WishlistContext';
import { formatPrice } from '@/data/vehicles';

export default function VehicleGrid({ items }) {
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((vehicle) => {
        const saved = isInWishlist(vehicle.id);
        return (
          <article key={vehicle.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <img src={vehicle.image} alt={vehicle.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">{vehicle.tag}</span>
              <button type="button" onClick={() => toggleWishlist(vehicle)} title={saved ? 'Remove from wishlist' : 'Save to wishlist'} className="absolute right-3 top-3 rounded-full bg-white/95 p-2 text-slate-700 shadow transition hover:text-red-600">
                <Heart className={`h-4 w-4 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-red-600">{vehicle.brand}</p>
              <h2 className="mt-1 truncate text-lg font-black text-slate-900">{vehicle.name}</h2>
              <p className="mt-1 text-xs text-slate-500">{vehicle.specs}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <strong className="text-xl font-black text-slate-900">{formatPrice(vehicle.price)}</strong>
                <div className="flex items-center gap-3">
                  <Link href={`/products/${vehicle.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-red-700">Details <ArrowRight className="h-3.5 w-3.5" /></Link>
                  <AddToCartButton item={vehicle} label="Add" className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700" />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
