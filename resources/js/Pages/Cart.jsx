import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import PageFrame from '@/Components/PageFrame';
import { useCart } from '@/Context/CartContext';
import { checkoutUrl } from '@/data/checkout';
import { formatPrice } from '@/data/vehicles';

export default function Cart() {
	const { cartItems, cartCount, updateQuantity, removeFromCart } = useCart();
	const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0) * item.quantity, 0);

	return (
		<PageFrame title="Shopping Cart" eyebrow="Your selection" heading="Your cart" intro="Review quantities and estimated prices before sending your request to our team.">
			<div className="mx-auto max-w-4xl">
				{cartItems.length > 0 ? (
					<>
						<div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
							{cartItems.map((item) => (
								<article key={item.id} className="flex flex-wrap items-center gap-4 p-5">
									<img src={item.image || '/images/hero-car.png'} alt={item.name} className="h-20 w-28 rounded-lg bg-slate-100 object-cover" />
									<div className="min-w-0 flex-1">
										<h2 className="font-black text-slate-900">{item.name}</h2>
										<p className="mt-1 text-xs text-slate-500">{item.specs || 'Vehicle'}</p>
										<p className="mt-1 text-sm font-semibold text-red-600">{formatPrice(item.price)} each</p>
									</div>
									<div className="flex items-center gap-2">
										<button type="button" title="Decrease quantity" aria-label={`Decrease quantity of ${item.name}`} disabled={item.quantity <= 1} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40">
											<Minus className="h-4 w-4" />
										</button>
										<output aria-label={`Quantity of ${item.name}`} className="min-w-8 text-center text-sm font-bold">{item.quantity}</output>
										<button type="button" title="Increase quantity" aria-label={`Increase quantity of ${item.name}`} disabled={item.quantity >= 20} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40">
											<Plus className="h-4 w-4" />
										</button>
									</div>
									<strong className="w-full text-right text-sm font-black text-slate-900 sm:w-28">{formatPrice(item.price * item.quantity)}</strong>
									<button type="button" title="Remove item" aria-label={`Remove ${item.name} from cart`} onClick={() => removeFromCart(item.id)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600">
										<Trash2 className="h-4 w-4" />
									</button>
								</article>
							))}
						</div>
						<div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-900 p-5 text-white">
							<div>
								<p className="font-bold">Estimated total</p>
								<p className="mt-1 text-xs text-slate-300">{cartCount} item{cartCount === 1 ? '' : 's'}; final prices are confirmed by our team.</p>
							</div>
							<span className="text-2xl font-black">{formatPrice(total)}</span>
						</div>
						<Link href={checkoutUrl(cartItems)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700">
							Continue to request <ArrowRight className="h-4 w-4" />
						</Link>
					</>
				) : (
					<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-14 text-center">
						<ShoppingCart className="mx-auto h-12 w-12 text-slate-300" />
						<h2 className="mt-4 text-xl font-black text-slate-900">Your cart is empty</h2>
						<p className="mt-2 text-sm text-slate-500">Add a vehicle from the collection to start a request.</p>
						<Link href="/categories" className="mt-6 inline-block rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white">Browse vehicles</Link>
					</div>
				)}
			</div>
		</PageFrame>
	);
}
