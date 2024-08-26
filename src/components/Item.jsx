import React from "react";
import image from "../assets/pic-example.jpg";
import { useCart } from "../context/CartProvider";
import { useAuth } from "../context/AuthProvider";
import { ToastContainer } from "react-toastify";

function Item({ item }) {
  const { cartItems, incrementItem, decrementItem, addToCart } = useCart();

  const isInCart = cartItems.find((cartItem) => cartItem.id === item.id);
  item.picture = image;

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img
        src={item.picture}
        alt={item.name}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
      <p className="text-gray-700 mb-4">${item.unit_price.toFixed(2)}</p>
      {isInCart ? (
        <div className="flex justify-between items-center">
          <button
            onClick={() => decrementItem(item.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            -
          </button>
          <span>{isInCart.quantity}</span>
          <button
            onClick={() => incrementItem(item.id)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart(item)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300"
        >
          Add to Cart
        </button>
      )}
      <ToastContainer />
    </div>
  );
}

export default Item;
