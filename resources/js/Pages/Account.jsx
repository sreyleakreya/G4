import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import PageFrame from '@/Components/PageFrame';

export default function Account() {
  const user = usePage().props.auth?.user;
  const { post, processing } = useForm();

  const handleLogout = (event) => {
    event.preventDefault();
    post(route('logout'));
  };

  return (
    <PageFrame
      title="My Account"
      eyebrow="Customer account"
      heading={`Welcome back${user?.name ? `, ${user.name}` : ''}`}
      intro="Keep track of your vehicle requests, saved vehicles, and account details."
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-[24px] bg-gradient-to-br from-red-500 to-pink-500 p-6 text-white shadow-lg shadow-red-200">
          <p className="text-xs uppercase tracking-[0.22em] text-red-100">Requests</p>
          <p className="mt-3 text-4xl font-black">0</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Saved vehicles</p>
          <p className="mt-3 text-4xl font-black text-slate-900">0</p>
        </div>
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Support</p>
          <p className="mt-3 text-xl font-black text-slate-900">Available</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link href="/categories" className="rounded-[24px] border border-pink-100 bg-pink-50 p-5 transition hover:border-pink-200 hover:bg-pink-100">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-red-600">Browse</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Shop vehicles</h2>
          <p className="mt-2 text-sm text-slate-600">Explore our latest cars and find your next match.</p>
        </Link>
        <Link href="/checkout" className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:bg-red-50/40">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">Next step</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Review request</h2>
          <p className="mt-2 text-sm text-slate-600">Continue with your purchase request and contact details.</p>
        </Link>
        <Link href="/profile" className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition hover:border-red-200 hover:bg-red-50/40">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-500">Profile</p>
          <h2 className="mt-2 text-xl font-black text-slate-900">Update details</h2>
          <p className="mt-2 text-sm text-slate-600">Edit your account information and keep your profile current.</p>
        </Link>
      </div>

      <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">No requests yet</h2>
        <p className="mt-2 text-sm text-slate-500">Start by exploring our current inventory or continue your quote request.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/categories" className="inline-block rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">Explore vehicles</Link>
          <Link href="/checkout" className="inline-block rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-pink-200 hover:text-red-600">Continue request</Link>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <form onSubmit={handleLogout}>
          <button
            type="submit"
            disabled={processing}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-red-200 hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
          >
            {processing ? 'Signing out...' : 'Log out'}
          </button>
        </form>
      </div>
    </PageFrame>
  );
}
