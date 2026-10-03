import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import AddToCartButton from '@/Components/AddToCartButton';
import { useWishlist } from '@/Context/WishlistContext';
import { 
  Search, 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  PhoneCall, 
  Car, 
  Bike, 
  Heart,
  RotateCcw,
  Headphones
} from 'lucide-react';

// ==========================================
// 1. VEHICLE CARD COMPONENT WITH WISHLIST
// ==========================================
function VehicleCard({ vehicle, cardType = 'car' }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(vehicle.id);

  return (
    <div className="bg-white/90 rounded-[24px] border border-pink-100 shadow-[0_18px_45px_-25px_rgba(15,23,42,0.30)] hover:shadow-[0_26px_55px_-24px_rgba(244,114,182,0.38)] hover:border-pink-200 transition-all duration-300 p-3 flex flex-col justify-between relative group hover:-translate-y-1">
      {/* Badge Tag */}
      {vehicle.tag && (
        <span className={`absolute top-2.5 left-2.5 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider z-10 shadow-sm ${
          cardType === 'car' ? 'bg-red-600' : 'bg-slate-900'
        }`}>
          {vehicle.tag}
        </span>
      )}

      {/* Wishlist Heart Button */}
      <button
        type="button"
        onClick={() => toggleWishlist(vehicle)}
        className="absolute top-2.5 right-2.5 z-20 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-slate-100 hover:bg-white text-slate-600 hover:text-red-500 transition-all duration-200 active:scale-90"
        title={isSaved ? "Remove from Wishlist" : "Save to Wishlist"}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isSaved ? 'text-red-500 fill-red-500' : 'text-slate-400'
          }`}
        />
      </button>

      <div>
        <div className="h-36 rounded-[18px] overflow-hidden bg-gradient-to-br from-pink-50 via-white to-slate-50 mb-3 flex items-center justify-center relative ring-1 ring-pink-100">
          <img
            src={vehicle.img}
            alt={vehicle.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
        <h3 className="font-black text-slate-900 text-sm truncate mb-1 group-hover:text-red-600 transition-colors">
          {vehicle.name}
        </h3>
        <p className="text-[10px] text-slate-500 mb-2 font-medium">{vehicle.specs}</p>
        <div className="mb-3 flex items-center justify-between gap-2 rounded-xl bg-red-50 px-2.5 py-1.5">
          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-red-600">Starting at</span>
          <span className="text-red-600 font-black text-base">{vehicle.price}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100">
        <AddToCartButton
          item={vehicle}
          className="col-span-2 w-full text-center text-[10px] font-black uppercase tracking-[0.14em] text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 py-2.5 rounded-lg transition-all shadow-sm"
        />
        <Link
          href={`/products/${vehicle.id}`}
          className="text-center text-[10px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-lg transition-all"
        >
          View Details
        </Link>
        <Link
          href="/installment"
          className="text-center text-[10px] font-bold text-white bg-slate-900 hover:bg-slate-800 py-2.5 rounded-lg transition-all shadow-sm"
        >
          Book Drive
        </Link>
      </div>
    </div>
  );
}

// ==========================================
// 2. MAIN HOME CONTENT COMPONENT
// ==========================================
function HomeContent() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  const heroSlides = [
    {
      title: 'DRIVE YOUR DREAM',
      subtitle: 'Luxury performance with a charming touch.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'SMART STYLE, MODERN FREEDOM',
      subtitle: 'Curated vehicles for every everyday adventure.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'PREMIUM CARE. HAPPY DRIVES.',
      subtitle: 'Fresh picks, flexible plans, and trusted service.',
      image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  const carsData = [
    { id: 'c1', name: 'Toyota Prius Option 4', price: '$26,800', specs: 'Hybrid | Auto | 24.8 km/l', tag: 'BEST SELLER', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600' },
    { id: 'c2', name: 'Ford Raptor 3.0L V6', price: '$72,500', specs: 'Diesel | Auto | 17.4 km/l', tag: 'NEW', img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600' },
    { id: 'c3', name: 'Lexus LX600 Kuro', price: '$185,000', specs: 'Petrol | Auto | 20.7 km/l', tag: 'PREMIUM', img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600' },
    { id: 'c4', name: 'BMW M4 Competition', price: '$98,000', specs: 'Petrol | Auto | 18.4 km/l', tag: 'HOT', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600' },
    { id: 'c5', name: 'Hyundai Creta 2023', price: '$31,500', specs: 'Petrol | Auto | 19.4 km/l', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=600' },
  ];

  const motorcyclesData = [
    { id: 'm1', name: 'Honda ADV 160cc 2024', price: '$4,300', specs: 'Automatic | 160cc', tag: 'HOT', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600' },
    { id: 'm2', name: 'Yamaha TMAX 560 Tech', price: '$12,800', specs: '560cc | Auto', tag: 'LUXURY', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600' },
    { id: 'm3', name: 'Honda Dream 125 2024', price: '$2,750', specs: 'Manual | 125cc', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600' },
    { id: 'm4', name: 'BMW R1250 GS Adventure', price: '$24,500', specs: '1250cc | Manual', tag: 'TOURING', img: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=600' },
    { id: 'm5', name: 'Vespa Sprint 150 ABS', price: '$4,900', specs: 'Automatic | 150cc', tag: 'STYLE', img: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=600' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans selection:bg-red-600 selection:text-white">
      {/* Notice Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>For more information or urgent service, please contact us!</span>
          </div>
          <Link href="/contact" className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-3 py-1 rounded-md text-[11px] transition-all">
            Contact Us Now &rarr;
          </Link>
        </div>
      </div>

      {/* 1. Header Navigation */}
      <Header />

      <main className="flex-grow">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,182,193,0.30),_rgba(255,255,255,0.94)_35%,_rgba(248,250,252,1)_100%)] text-white pt-14 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.94),rgba(31,41,55,0.88),rgba(251,113,133,0.20))]" />
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-pink-300/25 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-red-400/20 blur-[110px]" />

          <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="space-y-8 text-center lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-pink-100 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span>Trusted automotive marketplace</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                  {heroSlides[activeHeroIndex].title}
                </h1>
                <p className="mx-auto max-w-xl text-sm text-slate-200 sm:text-base lg:mx-0">
                  {heroSlides[activeHeroIndex].subtitle}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-2 lg:justify-start">
                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_18px_30px_-18px_rgba(244,114,182,0.9)] transition hover:-translate-y-0.5"
                >
                  <span>Find Vehicles</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/installment"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-pink-200 hover:bg-white/10"
                >
                  <Calculator className="h-4 w-4 text-pink-200" />
                  <span>Calculate Installment</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4">
                {[
                  { icon: Car, title: '100+ in stock' },
                  { icon: ShieldCheck, title: 'Top brands' },
                  { icon: RotateCcw, title: 'Trade-in' },
                  { icon: Zap, title: 'Flexible finance' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center shadow-lg shadow-slate-900/10 backdrop-blur-sm"
                    >
                      <Icon className="mx-auto mb-2 h-5 w-5 text-red-300" />
                      <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-200">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative flex items-center justify-center lg:col-span-6">
              <div className="absolute h-3/4 w-3/4 rounded-full bg-pink-300/20 blur-[90px]" />
              <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/15 bg-white/10 p-3 shadow-[0_30px_60px_-24px_rgba(15,23,42,0.65)] backdrop-blur-md">
                <div className="overflow-hidden rounded-[24px]">
                  <img
                    src={heroSlides[activeHeroIndex].image}
                    alt="Luxury vehicle showcase"
                    className="h-[360px] w-full object-cover transition-all duration-700 ease-out sm:h-[430px]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-5 bottom-5 rounded-2xl bg-slate-950/55 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-pink-200">Featured</p>
                  <p className="mt-1 text-lg font-black text-white">Premium selection</p>
                </div>
              </div>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setActiveHeroIndex(index)}
                    aria-label={`View slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${index === activeHeroIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Floating Quick Search Box */}
        <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
          <div className="rounded-[30px] border border-pink-100 bg-white/90 p-5 shadow-[0_30px_60px_-32px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-6">
            <div className="mb-4 flex flex-col justify-between gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 p-2.5 text-white shadow-lg shadow-red-200">
                  <Search className="h-4 w-4" />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">Find Your Perfect Vehicle</h2>
              </div>

              <div className="flex rounded-2xl bg-pink-50 p-1 text-xs font-semibold ring-1 ring-pink-100">
                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className={`rounded-xl px-3 py-1.5 transition-all ${activeTab === 'all' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All Vehicles
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('car')}
                  className={`rounded-xl px-3 py-1.5 transition-all ${activeTab === 'car' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Cars
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('moto')}
                  className={`rounded-xl px-3 py-1.5 transition-all ${activeTab === 'moto' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Motorcycles
                </button>
              </div>
            </div>

            <form className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100">
                  <option>Select Brand</option>
                  <option>Toyota / Lexus</option>
                  <option>Ford</option>
                  <option>Honda / Yamaha</option>
                </select>
              </div>

              <div>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100">
                  <option>Select Model</option>
                  <option>Prius / LX600 / Raptor</option>
                  <option>ADV / Dream / GS</option>
                </select>
              </div>

              <div>
                <select className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-700 outline-none transition focus:border-pink-300 focus:ring-4 focus:ring-pink-100">
                  <option>Max Price</option>
                  <option>Under $5,000</option>
                  <option>$5,000 - $20,000</option>
                  <option>Over $20,000</option>
                </select>
              </div>

              <div>
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5"
                >
                  <Search className="h-3.5 w-3.5" /> Search Vehicles
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 4. CARS SECTION */}
        {(activeTab === 'all' || activeTab === 'car') && (
          <section className="max-w-7xl mx-auto pt-16 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-[-0.04em] text-slate-900 sm:text-2xl">
                <span className="rounded-xl bg-red-50 p-2 text-red-600 ring-1 ring-red-100">
                  <Car className="h-5 w-5" />
                </span>
                EXPLORE OUR POPULAR CARS
              </h2>
              <Link href="/categories?type=car" className="flex items-center gap-1 text-xs font-bold text-slate-600 transition hover:text-red-600">
                View All Cars &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {carsData.map((car) => (
                <VehicleCard key={car.id} vehicle={car} cardType="car" />
              ))}
            </div>
          </section>
        )}

        {/* 5. MOTORCYCLES SECTION */}
        {(activeTab === 'all' || activeTab === 'moto') && (
          <section className="border-y border-pink-100 bg-gradient-to-b from-slate-100 via-rose-50/40 to-slate-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6 flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-[-0.04em] text-slate-900 sm:text-2xl">
                  <span className="rounded-xl bg-red-50 p-2 text-red-600 ring-1 ring-red-100">
                    <Bike className="h-5 w-5" />
                  </span>
                  EXPLORE OUR POPULAR MOTORCYCLES
                </h2>
                <Link href="/categories?type=moto" className="flex items-center gap-1 text-xs font-bold text-slate-600 transition hover:text-red-600">
                  View All Motorcycles &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {motorcyclesData.map((moto) => (
                  <VehicleCard key={moto.id} vehicle={moto} cardType="moto" />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 6. BRANDS GRID */}
        <section className="mx-auto max-w-7xl border-b border-slate-200 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-sm font-black uppercase tracking-[0.22em] text-slate-900">OUR TOP BRANDS</h2>
            <Link href="/categories" className="text-xs font-bold text-red-600 transition hover:underline">View All Brands &rarr;</Link>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center sm:grid-cols-6">
            {['TOYOTA', 'FORD', 'LEXUS', 'HONDA', 'BMW', 'YAMAHA'].map((brand, i) => (
              <div key={i} className="cursor-pointer rounded-[22px] border border-pink-100 bg-white p-4 text-sm font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-red-200 hover:text-red-600 hover:shadow-md">
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* 7. WHY CHOOSE US */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-lg font-black uppercase tracking-[0.18em] text-slate-900">WHY CHOOSE G4 AUTO CARE?</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5">
            <div className="rounded-[24px] border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Car className="mx-auto mb-2 h-6 w-6 text-red-600" />
              <h3 className="text-xs font-bold text-slate-900">Wide Range</h3>
              <p className="mt-1 text-[10px] text-slate-500">100+ Vehicles Available</p>
            </div>
            <div className="rounded-[24px] border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-red-600" />
              <h3 className="text-xs font-bold text-slate-900">Best Price</h3>
              <p className="mt-1 text-[10px] text-slate-500">Get the best deal always</p>
            </div>
            <div className="rounded-[24px] border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <Zap className="mx-auto mb-2 h-6 w-6 text-red-600" />
              <h3 className="text-xs font-bold text-slate-900">Easy Finance</h3>
              <p className="mt-1 text-[10px] text-slate-500">Flexible EMI options</p>
            </div>
            <div className="rounded-[24px] border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <RotateCcw className="mx-auto mb-2 h-6 w-6 text-red-600" />
              <h3 className="text-xs font-bold text-slate-900">Exchange Offers</h3>
              <p className="mt-1 text-[10px] text-slate-500">Best exchange value</p>
            </div>
            <div className="col-span-2 rounded-[24px] border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:col-span-1">
              <Headphones className="mx-auto mb-2 h-6 w-6 text-red-600" />
              <h3 className="text-xs font-bold text-slate-900">24/7 Support</h3>
              <p className="mt-1 text-[10px] text-slate-500">Trusted service & support</p>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Footer */}
      <Footer />
    </div>
  );
}

export default HomeContent;