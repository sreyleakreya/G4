import React, { useMemo, useState } from 'react';
import PageFrame from '@/Components/PageFrame';

export default function Installment() {
  const [price, setPrice] = useState(30000);
  const [deposit, setDeposit] = useState(6000);
  const [months, setMonths] = useState(60);

  const monthly = useMemo(() => {
    const principal = Math.max(price - deposit, 0);
    const rate = 0.085 / 12;

    return principal
      ? (principal * rate * (1 + rate) ** months) / ((1 + rate) ** months - 1)
      : 0;
  }, [price, deposit, months]);

  return (
    <PageFrame
      title="Installment Calculator"
      eyebrow="Flexible finance"
      heading="Plan your purchase with confidence"
      intro="Adjust the figures below to get an indicative monthly payment. Our team will confirm the final offer after review."
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 rounded-[30px] border border-pink-100 bg-gradient-to-br from-white to-pink-50/70 p-6 shadow-[0_25px_60px_-30px_rgba(244,114,182,0.35)] sm:p-8">
          <label className="block text-sm font-bold text-slate-800">
            <span className="mb-2 block text-slate-700">Vehicle price</span>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-0 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </label>

          <label className="block text-sm font-bold text-slate-800">
            <span className="mb-2 block text-slate-700">Down payment</span>
            <input
              type="number"
              min="0"
              max={price}
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="mt-0 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            />
          </label>

          <label className="block text-sm font-bold text-slate-800">
            <span className="mb-2 block text-slate-700">Loan term</span>
            <select
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-0 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100"
            >
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
              <option value="72">72 months</option>
            </select>
          </label>
        </div>

        <div className="rounded-[30px] bg-gradient-to-br from-red-500 via-red-600 to-pink-500 p-7 text-white shadow-[0_25px_60px_-25px_rgba(239,68,68,0.7)] sm:p-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-red-100">Estimated monthly payment</p>
          <p className="mt-5 text-5xl font-black tracking-[-0.07em]">${Math.round(monthly).toLocaleString()}</p>
          <p className="mt-5 text-sm leading-7 text-red-50/90">
            Illustrative estimate at 8.5% annual interest. Rates and approval depend on your application.
          </p>

          <div className="mt-8 space-y-3 rounded-[24px] border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-50/90">Loan amount</span>
              <span className="font-bold">${Math.max(price - deposit, 0).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-50/90">Term</span>
              <span className="font-bold">{months} months</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-red-50/90">Rate</span>
              <span className="font-bold">8.5% APR</span>
            </div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
