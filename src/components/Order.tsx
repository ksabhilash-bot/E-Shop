import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
}

const Order: React.FC = () => {
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productFromShop = location.state?.product;
  
  // Determine which products to display
  const productsToShow: Product[] = productFromShop ? [productFromShop] : cartItems;
  
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | ''>('');
  
  const handleCashOnDelivery = () => {
    alert('Order placed with Cash on Delivery!');
  };
  
  const handleOnlinePayment = () => {
    alert('Please scan the QR code to complete the payment.');
  };
  
  // Calculate total amount
  const totalAmount = productsToShow.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);
  
  // Simple QR code placeholder component
  const SimpleQRCode = ({ value }: { value: string }) => {
    return (
      <div className="w-44 h-44 mx-auto border-2 border-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xs mb-2 text-gray-500">QR Code Placeholder</div>
          <div className="text-xs overflow-hidden text-gray-400">{value.substring(0, 30)}...</div>
        </div>
      </div>
    );
  };

  if (productsToShow.length === 0) {
    return (
      <div className="p-8 h-[80vh] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">No Orders Found</h1>
          <p className="text-gray-600">
            Your cart is empty. Browse our shop to add items to your cart.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-[80vh] overflow-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Order</h1>
      
      {/* Order Summary */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="grid gap-4">
          {productsToShow.map((product, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-gray-600">
                    ${product.price.toFixed(2)} {product.quantity && product.quantity > 1 ? `× ${product.quantity}` : ''}
                  </p>
                </div>
              </div>
              <div className="font-bold">
                ${((product.quantity || 1) * product.price).toFixed(2)}
              </div>
            </div>
          ))}
          
          <div className="flex justify-between pt-4 font-bold text-lg">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Payment Options */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setPaymentMethod('cash');
              handleCashOnDelivery();
            }}
            className={`p-4 border rounded-lg flex items-center gap-4 transition ${
              paymentMethod === 'cash' ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Cash on Delivery</h3>
              <p className="text-sm text-gray-600">Pay when you receive your order</p>
            </div>
          </button>
          
          <button
            onClick={() => {
              setPaymentMethod('online');
              handleOnlinePayment();
            }}
            className={`p-4 border rounded-lg flex items-center gap-4 transition ${
              paymentMethod === 'online' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Online Payment</h3>
              <p className="text-sm text-gray-600">Pay now using UPI</p>
            </div>
          </button>
        </div>
        
        {paymentMethod === 'online' && (
          <div className="mt-6 text-center">
            <h4 className="text-lg font-semibold mb-4">Scan QR to Pay</h4>
            <SimpleQRCode value={`upi://pay?pa=your-upi-id@bank&pn=YourStore&am=${totalAmount.toFixed(2)}&cu=INR`} />
            <p className="mt-2 text-sm text-gray-600">Scan with any UPI app to pay</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;