export function checkoutUrl(items) {
  const purchaseItems = items.map((item) => ({
    id: String(item.id ?? ''),
    name: String(item.name ?? item.title ?? 'Vehicle request'),
    price: Number(item.price ?? 0),
    quantity: Math.max(1, Math.min(20, Number(item.quantity ?? 1))),
  }));

  return `/checkout?items=${encodeURIComponent(JSON.stringify(purchaseItems))}`;
}