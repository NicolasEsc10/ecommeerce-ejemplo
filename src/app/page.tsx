import ProductCards from '@/components/ProductCards';
import Cart from '@/components/Cart';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <ProductCards />
      <Cart />
    </main>
  );
}
