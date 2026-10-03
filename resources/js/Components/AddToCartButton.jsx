import React from 'react';
import { router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/Context/CartContext';

export default function AddToCartButton({ item, label = 'Add to cart', className = '' }) {
  const { addToCart } = useCart();
  const itemName = item.name ?? item.title ?? 'vehicle';

  const handleAddToCart = () => {
    addToCart(item);
    router.visit('/cart');
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-label={`Add ${itemName} to cart`}
      title={`Add ${itemName} to cart`}
      className={`inline-flex items-center justify-center gap-1.5 ${className}`}
    >
      <ShoppingCart className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </button>
  );
}