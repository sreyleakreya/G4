import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { ArrowRight, BadgeCheck, CarFront, ClipboardCheck, Clock3, Phone, ShieldCheck } from 'lucide-react';
import PageFrame from '@/Components/PageFrame';

export default function TradeIn({ telegramConfigured }) {
	const [showSuccess, setShowSuccess] = useState(false);
	const { data, setData, post, processing, errors } = useForm({
		name: '',
		phone: '',
		vehicle: '',
		year: '',
		mileage: '',
		condition: '',
		expected_price: '',
		notes: '',
	});

	function submit(event) {
		event.preventDefault();
		setShowSuccess(false);
		post(route('tradein.store'), {
			onSuccess: () => {
				setData({ name: '', phone: '', vehicle: '', year: '', mileage: '', condition: '', expected_price: '', notes: '' });
				setShowSuccess(true);
			},
		});
	}

	const inputClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100';

	return (
		<PageFrame
			title="Trade In Your Vehicle"
			eyebrow="A simple, no-pressure valuation"
			heading="Trade in your vehicle with confidence"
			intro="Share the basics below. Our team will review your vehicle and call you to arrange an inspection and discuss its value."
		>
			<div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
				<section className="rounded-[28px] border border-pink-100 bg-white p-5 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.35)] sm:p-7">
					<div className="mb-6 flex items-start gap-4 border-b border-slate-100 pb-5">
						<div className="rounded-2xl bg-red-50 p-3 text-red-600"><CarFront className="h-5 w-5" /></div>
						<div>
							<h2 className="text-xl font-black text-slate-900">Tell us about your vehicle</h2>
							<p className="mt-1 text-sm leading-6 text-slate-500">Fields marked as required help us prepare an accurate first estimate.</p>
						</div>
					</div>

					{!telegramConfigured && (
						<div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
							Online requests are temporarily unavailable. Please call us using the contact details on this page.
						</div>
					)}

					{showSuccess && (
						<div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
							Your valuation request was sent. Our team will call you soon.
						</div>
					)}

					{errors.telegram && (
						<div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{errors.telegram}</div>
					)}

					<form onSubmit={submit} className="space-y-5">
						<div className="grid gap-5 sm:grid-cols-2">
							<label className="block text-sm font-bold text-slate-700">
								Your name <span className="text-red-500">*</span>
								<input autoComplete="name" value={data.name} onChange={(event) => setData('name', event.target.value)} className={inputClass} placeholder="Name for our callback" required maxLength={120} />
								{errors.name && <span className="mt-1 block text-xs font-medium text-red-600">{errors.name}</span>}
							</label>
							<label className="block text-sm font-bold text-slate-700">
								Phone number <span className="text-red-500">*</span>
								<input autoComplete="tel" type="tel" value={data.phone} onChange={(event) => setData('phone', event.target.value)} className={inputClass} placeholder="e.g. 012 345 678" required maxLength={40} />
								<span className="mt-1 block text-xs font-normal text-slate-500">Use a number our team can reach.</span>
								{errors.phone && <span className="mt-1 block text-xs font-medium text-red-600">{errors.phone}</span>}
							</label>
						</div>

						<label className="block text-sm font-bold text-slate-700">
							Make and model <span className="text-red-500">*</span>
							<input value={data.vehicle} onChange={(event) => setData('vehicle', event.target.value)} className={inputClass} placeholder="e.g. Toyota Camry 2.0" required maxLength={160} />
							{errors.vehicle && <span className="mt-1 block text-xs font-medium text-red-600">{errors.vehicle}</span>}
						</label>

						<div className="grid gap-5 sm:grid-cols-2">
							<label className="block text-sm font-bold text-slate-700">
								Year <span className="text-red-500">*</span>
								<input type="number" inputMode="numeric" min="1970" max={new Date().getFullYear() + 1} value={data.year} onChange={(event) => setData('year', event.target.value)} className={inputClass} placeholder="e.g. 2019" required />
								<span className="mt-1 block text-xs font-normal text-slate-500">The model year shown on your vehicle documents.</span>
								{errors.year && <span className="mt-1 block text-xs font-medium text-red-600">{errors.year}</span>}
							</label>
							<label className="block text-sm font-bold text-slate-700">
								Mileage (km) <span className="text-red-500">*</span>
								<input type="number" inputMode="numeric" min="0" value={data.mileage} onChange={(event) => setData('mileage', event.target.value)} className={inputClass} placeholder="e.g. 68,000" required />
								<span className="mt-1 block text-xs font-normal text-slate-500">Current odometer reading in kilometers.</span>
								{errors.mileage && <span className="mt-1 block text-xs font-medium text-red-600">{errors.mileage}</span>}
							</label>
						</div>

						<div className="grid gap-5 sm:grid-cols-2">
							<label className="block text-sm font-bold text-slate-700">
								Overall condition <span className="text-red-500">*</span>
								<select value={data.condition} onChange={(event) => setData('condition', event.target.value)} className={inputClass} required>
									<option value="" disabled>Select the closest match</option>
									<option value="excellent">Excellent - very clean, minimal wear</option>
									<option value="good">Good - normal wear, well maintained</option>
									<option value="fair">Fair - visible wear or repairs needed</option>
									<option value="needs_repair">Needs repair - major work required</option>
								</select>
								{errors.condition && <span className="mt-1 block text-xs font-medium text-red-600">{errors.condition}</span>}
							</label>
							<label className="block text-sm font-bold text-slate-700">
								Expected price <span className="font-normal text-slate-400">(optional, USD)</span>
								<div className="relative mt-2">
									<span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
									<input type="number" inputMode="decimal" min="0" step="100" value={data.expected_price} onChange={(event) => setData('expected_price', event.target.value)} className={`${inputClass} mt-0 pl-8`} placeholder="Your estimate" />
								</div>
								{errors.expected_price && <span className="mt-1 block text-xs font-medium text-red-600">{errors.expected_price}</span>}
							</label>
						</div>

						<label className="block text-sm font-bold text-slate-700">
							Anything else we should know? <span className="font-normal text-slate-400">(optional)</span>
							<textarea value={data.notes} onChange={(event) => setData('notes', event.target.value)} className={`${inputClass} min-h-24 resize-y`} placeholder="Recent repairs, accident history, features, or questions..." maxLength={1000} rows={3} />
							<div className="mt-1 flex justify-between gap-3 text-xs font-normal text-slate-500">
								{errors.notes ? <span className="font-medium text-red-600">{errors.notes}</span> : <span>Honest details help us give a more useful estimate.</span>}
								<span className="shrink-0">{data.notes.length}/1000</span>
							</div>
						</label>

						<button type="submit" disabled={processing || !telegramConfigured} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
							{processing ? 'Sending request...' : 'Request my valuation'}
							{!processing && <ArrowRight className="h-4 w-4" />}
						</button>
					</form>
				</section>

				<aside className="space-y-4">
					<section className="rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_25px_55px_-30px_rgba(15,23,42,0.65)] sm:p-7">
						<div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-200"><BadgeCheck className="h-3.5 w-3.5" /> How it works</div>
						<h2 className="mt-4 text-2xl font-black">Three simple steps</h2>
						<div className="mt-6 space-y-5">
							<div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-sm font-black text-rose-200">1</span><div><h3 className="text-sm font-bold">Share vehicle details</h3><p className="mt-1 text-sm leading-6 text-slate-300">Tell us the year, mileage, and current condition.</p></div></div>
							<div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-sm font-black text-rose-200">2</span><div><h3 className="text-sm font-bold">We call to arrange an inspection</h3><p className="mt-1 text-sm leading-6 text-slate-300">A specialist will contact you using your phone number.</p></div></div>
							<div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-sm font-black text-rose-200">3</span><div><h3 className="text-sm font-bold">Get a clear valuation</h3><p className="mt-1 text-sm leading-6 text-slate-300">After inspection, discuss the offer or trade it toward another vehicle.</p></div></div>
						</div>
					</section>

					<div className="rounded-2xl border border-pink-100 bg-white p-5">
						<div className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /><div><h3 className="text-sm font-bold text-slate-900">No obligation</h3><p className="mt-1 text-sm leading-6 text-slate-600">This request is only for an initial valuation. The final offer is confirmed after our team inspects the vehicle.</p></div></div>
					</div>

					<div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
						<Phone className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
						<p>Need help filling this out? <a href="tel:+85512345678" className="font-bold text-red-600 hover:text-red-700">Call our team</a> and we can guide you.</p>
					</div>

					<div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-500">
						<ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
						<p>Your request details are sent to our team’s Telegram chat. The website does not save a copy of this request.</p>
					</div>
				</aside>
			</div>
		</PageFrame>
	);
}
