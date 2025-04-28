import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/cartSlice';
import { useNavigate } from 'react-router-dom';


const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleBuy = () => {
    navigate('/order');
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-8 h-[80vh] overflow-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-6">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    = ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between mt-6">
            <div className="text-2xl font-bold text-gray-800">
              Total: ${totalAmount.toFixed(2)}
            </div>
            <button
              onClick={handleBuy}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition"
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </div>
      )}
    </div>
  );
};

export default Cart;