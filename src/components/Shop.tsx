import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';
import { AppDispatch } from '../store/store';
import { getFromLocalStorage } from './localStorage';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const Shop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = (product: Product) => {
    const userData = getFromLocalStorage('loginData');

    if (userData?.username) {
      navigate('/order', { state: { product } });
    } else {
      navigate('/login');
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    // Optional: Show a notification that item was added
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 h-[80vh] overflow-auto">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Shop Our Products</h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <svg
            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.414-1.414l4.386 4.387a1 1 0 01-1.414 1.414l-4.387-4.386zM8 14a6 6 0 100-12 6 6 0 000 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Product Listing */}
      <div>
        {loading ? (
          <div className="text-center text-gray-500 mt-10 text-lg">Loading products...</div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-xl transition bg-white flex flex-col">
                <img src={product.image} alt={product.title} className="h-48 mx-auto object-contain" />
                <h2 className="text-lg font-bold mt-4">{product.title}</h2>
                <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>

                <div className="mt-auto pt-2 flex gap-2 items-center">
                  <button
                    onClick={() => handleBuy(product)}
                    className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <svg viewBox="0 0 16 16" className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"></path>
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                    </svg>
                    <span>Buy</span>
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="group relative flex-1 h-10 rounded-xl bg-yellow-400 flex items-center justify-center overflow-hidden shadow-md transition-transform duration-500 active:scale-95 hover:shadow-lg"
                  >
                    <span className="absolute -left-8 w-8 h-8 bg-transparent rounded-full flex items-center justify-center overflow-hidden z-10 transition-transform duration-500 group-hover:translate-x-16">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" className="rounded">
                        <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                      </svg>
                    </span>
                    <p className="h-full w-fit flex items-center justify-center text-gray-900 z-1 text-sm font-semibold">
                      Add to Cart
                    </p>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10 text-lg">No items found.</div>
        )}
      </div>
    </div>
  );
};

export default Shop;