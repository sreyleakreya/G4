import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import PageFrame from '@/Components/PageFrame';
import { vehicles } from '@/data/vehicles';

export default function Checkout({ purchaseItems = [], telegramConfigured = false }) {
	const { auth } = usePage().props;
	const requiresAccount = !auth?.user;
	const { data, setData, post, processing, recentlySuccessful, errors } = useForm({
		name: '',
		phone: '',
		email: '',
		address: '',
		items: purchaseItems,
		message: '',
	});

	const total = data.items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);
	const addVehicle = (event) => {
		const vehicle = vehicles.find((item) => item.id === event.target.value);
		event.target.value = '';

		if (!vehicle || data.items.length >= 5) {
			return;
		}

		const existingIndex = data.items.findIndex((item) => item.id === vehicle.id);

		if (existingIndex >= 0) {
			setData('items', data.items.map((item, index) => index === existingIndex
				? { ...item, quantity: Math.min(20, Number(item.quantity || 1) + 1) }
				: item));
			return;
		}

		setData('items', [...data.items, {
			id: vehicle.id,
			name: vehicle.name,
			price: Number(vehicle.price),
			quantity: 1,
		}]);
	};
	const updateQuantity = (index, quantity) => {
		setData('items', data.items.map((item, itemIndex) => itemIndex === index
			? { ...item, quantity: Math.max(1, Math.min(20, quantity)) }
			: item));
	};
	const removeVehicle = (index) => {
		setData('items', data.items.filter((_, itemIndex) => itemIndex !== index));
	};
	const submit = (event) => {
		event.preventDefault();

		if (requiresAccount) {
			window.location.href = route('register');
			return;
		}

		post('/checkout', { preserveScroll: true });
	};

	return (
		<PageFrame title="Request a Vehicle" eyebrow="Next step" heading="Review your request" intro="Add your contact and delivery details. Our team will confirm availability and the final price.">
			{requiresAccount && (
				<div className="mx-auto mb-7 max-w-3xl rounded-[26px] border border-pink-200 bg-gradient-to-r from-pink-50 via-red-50 to-rose-100 p-5 shadow-[0_20px_40px_-30px_rgba(244,114,182,0.45)] sm:p-6">
					<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="inline-flex rounded-full border border-pink-200 bg-white/70 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.22em] text-red-600">Account required</p>
							<h3 className="mt-3 text-2xl font-black text-slate-900">Create an account to complete your purchase</h3>
							<p className="mt-2 text-sm text-slate-600">Browse first, then create your account to complete the purchase and send your vehicle request.</p>
						</div>
						<div className="flex flex-wrap gap-2">
							<Link href={route('register')} className="rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/20 transition hover:translate-y-[-1px] hover:shadow-red-500/30">
								Create account
							</Link>
							<Link href={route('login')} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-pink-200 hover:text-red-600">
								I already have an account
							</Link>
						</div>
					</div>
				</div>
			)}
			<form onSubmit={submit} className="mx-auto max-w-3xl space-y-6 rounded-[30px] border border-slate-200 bg-white/90 p-6 shadow-[0_25px_60px_-28px_rgba(15,23,42,0.18)] backdrop-blur-sm sm:p-8">
				<section aria-labelledby="selected-vehicles-heading" className="space-y-4 rounded-[24px] border border-pink-100 bg-gradient-to-br from-white to-pink-50/70 p-4 sm:p-5">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<h2 id="selected-vehicles-heading" className="text-lg font-extrabold text-slate-900">Selected vehicle{data.items.length === 1 ? '' : 's'}</h2>
						<label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
							<span className="sr-only">Add another vehicle</span>
							<select defaultValue="" onChange={addVehicle} disabled={data.items.length >= 5} className="max-w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm shadow-sm outline-none transition focus:border-pink-300 focus:ring-2 focus:ring-pink-100 disabled:cursor-not-allowed disabled:opacity-60">
								<option value="">+ Add another vehicle</option>
								{vehicles.map((vehicle) => (
									<option key={vehicle.id} value={vehicle.id}>{vehicle.name} - ${Number(vehicle.price).toLocaleString()}</option>
								))}
							</select>
						</label>
					</div>
					{data.items.length === 0 && <p className="text-sm text-slate-500">Choose a vehicle above, or describe the service you need below.</p>}
					{data.items.map((item, index) => (
						<div key={`${item.id}-${index}`} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
							<div className="min-w-0 flex-1">
								<p className="font-bold text-slate-800">{item.name}</p>
								<p className="mt-1 text-sm text-slate-500">${Number(item.price).toLocaleString()} each</p>
							</div>
							<div className="flex items-center gap-2">
								<button type="button" title="Decrease quantity" aria-label={`Decrease quantity of ${item.name}`} disabled={Number(item.quantity) <= 1} onClick={() => updateQuantity(index, Number(item.quantity) - 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 disabled:opacity-40">
									<Minus className="h-4 w-4" />
								</button>
								<output aria-label={`Quantity of ${item.name}`} className="min-w-8 text-center text-sm font-extrabold text-slate-800">{item.quantity}</output>
								<button type="button" title="Increase quantity" aria-label={`Increase quantity of ${item.name}`} disabled={Number(item.quantity) >= 20} onClick={() => updateQuantity(index, Number(item.quantity) + 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 disabled:opacity-40">
									<Plus className="h-4 w-4" />
								</button>
								<button type="button" title="Remove vehicle" aria-label={`Remove ${item.name}`} onClick={() => removeVehicle(index)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600">
									<Trash2 className="h-4 w-4" />
								</button>
							</div>
							<span className="w-full text-right text-sm font-black text-red-600 sm:w-auto">${(Number(item.price) * Number(item.quantity)).toLocaleString()}</span>
						</div>
					))}
					{data.items.length > 0 && (
						<div className="flex justify-between border-t border-slate-200 pt-3 text-sm font-extrabold text-slate-900">
							<span>Estimated total</span>
							<span className="text-red-600">${total.toLocaleString()}</span>
						</div>
					)}
					{data.items.length > 0 && <p className="text-xs text-slate-500">Listed prices are estimates and will be confirmed by our team.</p>}
				</section>

				<div className="grid gap-5 sm:grid-cols-2">
					<label className="block text-sm font-bold text-slate-800">
						<span className="mb-2 block text-slate-700">Full name</span>
						<input value={data.name} onChange={(event) => setData('name', event.target.value)} required autoComplete="name" className="mt-0 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100" />
						{errors.name && <span className="mt-1 block text-xs font-medium text-red-600">{errors.name}</span>}
					</label>
					<label className="block text-sm font-bold text-slate-800">
						<span className="mb-2 block text-slate-700">Phone number</span>
						<input value={data.phone} onChange={(event) => setData('phone', event.target.value)} required type="tel" autoComplete="tel" className="mt-0 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100" />
						{errors.phone && <span className="mt-1 block text-xs font-medium text-red-600">{errors.phone}</span>}
					</label>
				</div>

				<label className="block text-sm font-bold text-slate-800">
					<span className="mb-2 block text-slate-700">Email address</span>
					<input value={data.email} onChange={(event) => setData('email', event.target.value)} required type="email" autoComplete="email" className="mt-0 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100" />
					{errors.email && <span className="mt-1 block text-xs font-medium text-red-600">{errors.email}</span>}
				</label>

				<label className="block text-sm font-bold text-slate-800">
					<span className="mb-2 block text-slate-700">Delivery location</span>
					<textarea value={data.address} onChange={(event) => setData('address', event.target.value)} required rows="3" autoComplete="street-address" placeholder="Street, sangkat, khan, city" className="mt-0 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100" />
					{errors.address && <span className="mt-1 block text-xs font-medium text-red-600">{errors.address}</span>}
				</label>

				<label className="block text-sm font-bold text-slate-800">
					<span className="mb-2 block text-slate-700">{data.items.length > 0 ? 'Additional notes (optional)' : 'Vehicle or service you are interested in'}</span>
					<textarea value={data.message} onChange={(event) => setData('message', event.target.value)} required={data.items.length === 0} rows="3" className="mt-0 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-pink-300 focus:bg-white focus:ring-4 focus:ring-pink-100" />
					{errors.message && <span className="mt-1 block text-xs font-medium text-red-600">{errors.message}</span>}
				</label>

				<div role="status" className={`rounded-2xl border px-4 py-3 text-sm ${telegramConfigured ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-amber-200 bg-amber-50 text-amber-900'}`}>
					{telegramConfigured
						? 'This request will be sent to the G4 Auto Care team on Telegram.'
						: 'Telegram delivery is not configured yet. You can still submit, and the delivery status will appear here.'}
				</div>

				{errors.telegram && <p role="alert" className="text-sm font-semibold text-red-600">{errors.telegram}</p>}
				{recentlySuccessful && <p role="status" className="text-sm font-semibold text-emerald-700">Your request was sent to our team on Telegram.</p>}

				<button disabled={processing || requiresAccount} type="submit" className="w-full rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3.5 font-extrabold text-white shadow-lg shadow-red-500/20 transition hover:translate-y-[-1px] hover:shadow-red-500/30 disabled:cursor-wait disabled:opacity-60">
					{processing ? 'Sending request...' : requiresAccount ? 'Create account to continue' : 'Send request'}
				</button>
			</form>
		</PageFrame>
	);
}
