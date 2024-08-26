import React, { useEffect } from "react";
import { useCart } from "../context/CartProvider"; // Adjust the path as necessary
import image from "../assets/pic-example.jpg";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, incrementItem,decrementItem, clearCart } = useCart();


  let totalCost = cartItems.reduce(
    (total, item) => total + item.unit_price * item.quantity,
    0
  );


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-700">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="w-16 h-16 object-cover rounded"
                    src={image}
                    alt={item.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Price: ${item.unit_price.toFixed(2)}
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => incrementItem(item.id)}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => decrementItem(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <h3 className="text-xl font-bold">
              Total Cost: ${totalCost.toFixed(2)}
            </h3>
            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={clearCart} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                Clear Cart
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
