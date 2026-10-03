import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="px-4 py-10 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="border-l-4 border-red-600 p-6 sm:p-8">
                            <p className="text-xs font-extrabold uppercase tracking-widest text-red-600">Account overview</p>
                            <h1 className="mt-2 text-2xl font-black text-slate-900">Dashboard</h1>
                            <p className="mt-2 text-sm leading-6 text-slate-600">You are signed in. Visit your account to review your vehicle requests and profile details.</p>
                            <Link href="/account" className="mt-5 inline-flex rounded-lg bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700">View my account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
