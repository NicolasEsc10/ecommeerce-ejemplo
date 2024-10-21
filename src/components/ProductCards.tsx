'use client';

import { useProductStore } from '@/app/store/productStore';
import { useEffect } from 'react';

const ProductCards = () => {
  const { products, fetchProducts, addToCart, incrementQuantity, decrementQuantity, cart } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {products.map((product) => {
        const productInCart = cart.find((item) => item.id === product.id);

        return (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-gray-700">Price: ${product.price.toFixed(2)}</p>

            {productInCart ? (
              <div className="flex items-center space-x-2 mt-4">
                <button onClick={() => decrementQuantity(product.id)} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
                <span>{productInCart.quantity}</span>
                <button onClick={() => incrementQuantity(product.id)} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
              >
                Add to Cart
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;
