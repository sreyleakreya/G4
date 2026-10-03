import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Clock3, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import PageFrame from '@/Components/PageFrame';

export default function Contact({ telegramConfigured }) {
	const [showSuccess, setShowSuccess] = useState(false);
	const { data, setData, post, processing, errors } = useForm({
		name: '',
		email: '',
		message: '',
	});

	function submit(event) {
		event.preventDefault();
		setShowSuccess(false);
		post(route('contact.store'), {
			onSuccess: () => {
				setData({ name: '', email: '', message: '' });
				setShowSuccess(true);
			},
		});
	}

	const inputClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-100';

	return (
		<PageFrame
			title="Contact G4 Auto Care"
			eyebrow="A real person, ready to help"
			heading="Let’s find the right vehicle for you"
			intro="Ask about a vehicle, monthly payments, trade-ins, or booking a test drive. Your message goes directly to our G4 Auto Care team through Telegram."
		>
			<div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
				<section className="rounded-[28px] border border-pink-100 bg-white p-5 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.35)] sm:p-7">
					<div className="mb-6 flex items-start gap-4 border-b border-slate-100 pb-5">
						<div className="rounded-2xl bg-red-50 p-3 text-red-600"><Send className="h-5 w-5" /></div>
						<div>
							<h2 className="text-xl font-black text-slate-900">Send us a message</h2>
							<p className="mt-1 text-sm leading-6 text-slate-500">Tell us what you are looking for and our team will follow up.</p>
						</div>
					</div>

					{!telegramConfigured && (
						<div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
							Online messaging is temporarily unavailable. Please call us using the number on this page.
						</div>
					)}

					  {showSuccess && (
						<div role="status" className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
							Your message has been sent to our team. We will be in touch soon.
						</div>
					)}

					{errors.telegram && (
						<div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
							{errors.telegram}
						</div>
					)}

					<form onSubmit={submit} className="space-y-5">
						<label className="block text-sm font-bold text-slate-700">
							Your name
							<input
								autoComplete="name"
								value={data.name}
								onChange={(event) => setData('name', event.target.value)}
								className={inputClass}
								placeholder="e.g. Sokha Chan"
								required
								maxLength={120}
							/>
							{errors.name && <span className="mt-1 block text-xs font-medium text-red-600">{errors.name}</span>}
						</label>

						<label className="block text-sm font-bold text-slate-700">
							Email address
							<input
								autoComplete="email"
								type="email"
								value={data.email}
								onChange={(event) => setData('email', event.target.value)}
								className={inputClass}
								placeholder="you@example.com"
								required
								maxLength={255}
							/>
							{errors.email && <span className="mt-1 block text-xs font-medium text-red-600">{errors.email}</span>}
						</label>

						<label className="block text-sm font-bold text-slate-700">
							How can we help?
							<textarea
								value={data.message}
								onChange={(event) => setData('message', event.target.value)}
								className={`${inputClass} min-h-36 resize-y`}
								placeholder="Tell us which vehicle or service you are interested in..."
								required
								maxLength={2000}
								rows={5}
							/>
							<span className="mt-1 flex justify-between gap-4 text-xs font-normal text-slate-500">
								{errors.message ? <span className="font-medium text-red-600">{errors.message}</span> : <span>Please do not include payment details.</span>}
								<span className="shrink-0">{data.message.length}/2000</span>
							</span>
						</label>

						<button
							type="submit"
							disabled={processing || !telegramConfigured}
							className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
						>
							<Send className="h-4 w-4" />
							{processing ? 'Sending message...' : 'Send message'}
						</button>
					</form>
				</section>

				<aside className="flex flex-col gap-4">
					<section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-6 text-white shadow-[0_25px_55px_-30px_rgba(15,23,42,0.65)] sm:p-8">
						<div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,63,94,0.23),transparent_45%)]" />
						<div className="relative">
							<span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-rose-200">
								<ShieldCheck className="h-3.5 w-3.5" /> G4 Auto Care
							</span>
							<h2 className="mt-5 text-2xl font-black">Visit or call us</h2>
							<p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">Talk with our team about availability, pricing, financing, or arranging a test drive.</p>

							<div className="mt-7 space-y-5">
								<div className="flex gap-3">
									<MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
									<div><h3 className="text-sm font-bold">Visit our showroom</h3><p className="mt-1 text-sm text-slate-300">Phnom Penh, Cambodia</p></div>
								</div>
								<div className="flex gap-3">
									<Phone className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
									<div><h3 className="text-sm font-bold">Call our team</h3><a href="tel:+85512345678" className="mt-1 block text-sm text-slate-300 transition hover:text-white">012 345 678</a><a href="tel:+85598765432" className="block text-sm text-slate-300 transition hover:text-white">098 765 432</a></div>
								</div>
								<div className="flex gap-3">
									<Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
									<div><h3 className="text-sm font-bold">Opening hours</h3><p className="mt-1 text-sm text-slate-300">Every day, 8:00 AM – 7:00 PM</p></div>
								</div>
							</div>
						</div>
					</section>

					<div className="flex items-start gap-3 rounded-2xl border border-pink-100 bg-white p-4 text-sm leading-6 text-slate-600">
						<Mail className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
						<p>After you send the form, your name, email, and message are delivered to our team’s Telegram chat. We do not store this message on the website.</p>
					</div>
				</aside>
			</div>
		</PageFrame>
	);
}
