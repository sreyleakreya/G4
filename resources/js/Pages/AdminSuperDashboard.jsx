import React from 'react';
import PageFrame from '@/Components/PageFrame';

export default function AdminSuperDashboard() { return <PageFrame title="Admin Dashboard" eyebrow="Administration" heading="Business overview" intro="A clear view of marketplace activity across every branch."><div className="grid gap-5 sm:grid-cols-4">{[['Branches', '0'], ['Vehicles', '0'], ['Customers', '0'], ['Revenue', '$0']].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-3 text-3xl font-black text-slate-900">{value}</p></div>)}</div></PageFrame>; }
