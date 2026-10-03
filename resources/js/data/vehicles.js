export const vehicles = [
  { id: 'c1', name: 'Toyota Prius Option 4', price: 26800, type: 'car', brand: 'Toyota', specs: 'Hybrid | Automatic | 24.8 km/l', tag: 'BEST SELLER', image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=900&auto=format&fit=crop' },
  { id: 'c2', name: 'Ford Raptor 3.0L V6', price: 72500, type: 'car', brand: 'Ford', specs: 'Diesel | Automatic | 17.4 km/l', tag: 'NEW', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=900&auto=format&fit=crop' },
  { id: 'c3', name: 'Lexus LX600 Kuro', price: 185000, type: 'car', brand: 'Lexus', specs: 'Petrol | Automatic | Premium trim', tag: 'PREMIUM', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=900&auto=format&fit=crop' },
  { id: 'c4', name: 'BMW M4 Competition', price: 98000, type: 'car', brand: 'BMW', specs: 'Petrol | Automatic | 18.4 km/l', tag: 'HOT', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=900&auto=format&fit=crop' },
  { id: 'c5', name: 'Hyundai Creta 2023', price: 31500, type: 'car', brand: 'Hyundai', specs: 'Petrol | Automatic | 19.4 km/l', tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=900&auto=format&fit=crop' },
  { id: 'm1', name: 'Honda ADV 160cc 2024', price: 4300, type: 'motorcycle', brand: 'Honda', specs: 'Automatic | 160cc', tag: 'HOT', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=900&auto=format&fit=crop' },
  { id: 'm2', name: 'Yamaha TMAX 560 Tech', price: 12800, type: 'motorcycle', brand: 'Yamaha', specs: 'Automatic | 560cc', tag: 'LUXURY', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=900&auto=format&fit=crop' },
  { id: 'm3', name: 'Honda Dream 125 2024', price: 2750, type: 'motorcycle', brand: 'Honda', specs: 'Manual | 125cc', tag: 'POPULAR', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=900&auto=format&fit=crop' },
  { id: 'm4', name: 'BMW R1250 GS Adventure', price: 24500, type: 'motorcycle', brand: 'BMW', specs: 'Manual | 1250cc', tag: 'TOURING', image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=900&auto=format&fit=crop' },
];

export const formatPrice = (price) => `$${Number(price).toLocaleString()}`;
