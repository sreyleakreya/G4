import React, { useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { SlidersHorizontal } from 'lucide-react';
import PageFrame from '@/Components/PageFrame';
import VehicleGrid from '@/Components/VehicleGrid';
import { vehicles } from '@/data/vehicles';

export default function Categories() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const initialType = params.get('type') === 'moto' ? 'motorcycle' : params.get('type') || 'all';
  const [type, setType] = useState(initialType);
  const [brand, setBrand] = useState('all');
  const filtered = useMemo(() => vehicles.filter((item) => (type === 'all' || item.type === type) && (brand === 'all' || item.brand === brand)), [type, brand]);
  const brands = [...new Set(vehicles.map((item) => item.brand))];

  return <PageFrame title="Vehicle Collection" eyebrow="Explore the collection" heading="Find the vehicle that fits your next chapter" intro="Browse inspected cars and motorcycles from trusted brands, with transparent pricing and clear specifications.">
    <div className="mb-8 rounded-[28px] border border-pink-100 bg-white p-4 shadow-[0_24px_45px_-30px_rgba(15,23,42,0.25)] sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900"><SlidersHorizontal className="h-4 w-4 text-red-600" /> Filter inventory</div>
        <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-red-600">
          {filtered.length} vehicles
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {['all', 'car', 'motorcycle'].map((value) => <button key={value} type="button" onClick={() => setType(value)} className={`rounded-xl px-4 py-2.5 text-xs font-bold capitalize transition ${type === value ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md shadow-red-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{value === 'all' ? 'All vehicles' : value === 'motorcycle' ? 'Motorcycles' : 'Cars'}</button>)}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-500">Choose your preferred brand</div>
        <select value={brand} onChange={(event) => setBrand(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100 sm:max-w-xs"><option value="all">All brands</option>{brands.map((item) => <option key={item} value={item}>{item}</option>)}</select>
      </div>
    </div>
    <p className="mb-5 text-sm text-slate-500">Showing <strong className="text-slate-900">{filtered.length}</strong> matched choices for your next ride.</p>
    <VehicleGrid items={filtered} />
  </PageFrame>;
}
