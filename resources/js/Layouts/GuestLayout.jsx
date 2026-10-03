import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#f4f6f8] px-4 py-10 sm:px-6 sm:py-14">
            <div className="mx-auto flex w-full max-w-md flex-col items-center">
                <Link href="/" className="mb-8 flex items-center gap-3 text-slate-900">
                    <img src="/images/logo.png" alt="" className="h-11 w-11 object-contain" onError={(event) => { event.currentTarget.hidden = true; }} />
                    <span className="text-lg font-black uppercase">G4 <span className="text-red-600">Auto Care</span></span>
                </Link>
                <main className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
                    {children}
                </main>
                <Link href="/" className="mt-6 text-xs font-semibold text-slate-500 transition hover:text-red-600">Return to G4 Auto Care</Link>
            </div>
        </div>
    );
}
