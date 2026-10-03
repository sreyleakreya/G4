import Footer from '@/Components/Footer';
import Header from '@/Components/Header';

export default function AuthenticatedLayout({ header, children }) {
    return (
        <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
            <Header />
            {header && (
                <div className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </div>
            )}
            <main className="min-h-[45vh]">{children}</main>
            <Footer />
        </div>
    );
}
