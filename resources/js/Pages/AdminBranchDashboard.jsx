import React from 'react';
import PageFrame from '@/Components/PageFrame';

export default function AdminBranchDashboard() { return <PageFrame title="Branch Dashboard" eyebrow="Operations" heading="Branch overview" intro="Monitor inventory and customer requests from this branch."><div className="grid gap-5 sm:grid-cols-3">{[['Inventory', '0'], ['Open requests', '0'], ['Today\'s visits', '0']].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</p><p className="mt-3 text-4xl font-black text-slate-900">{value}</p></div>)}</div></PageFrame>; }
