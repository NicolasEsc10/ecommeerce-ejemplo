'use client';
import { useProductStore } from '@/app/store/productStore';
const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useProductStore();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add products before checkout.');
      return;
    }
    // Simulando un proceso de compra
    alert('Thank you for your purchase!');
    
    // Aquí podrías vaciar el carrito si fuera necesario o redirigir a una página de pago real
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
                <p className="text-gray-700">Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => decrementQuantity(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">-</button>
                <span>{item.quantity}</span>
                <button onClick={() => incrementQuantity(item.id)} className="bg-green-500 text-white px-2 py-1 rounded">+</button>
                <button onClick={() => removeFromCart(item.id)} className="bg-gray-500 text-white px-2 py-1 rounded">Remove</button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
