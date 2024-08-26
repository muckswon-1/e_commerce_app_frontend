import React, { createContext, useContext, useEffect, useState } from "react";
import productService from "../utils/products";
import { useAuth } from "./AuthProvider";
import { toast } from "react-toastify";
import { useSharedContext } from "./SharedProvider";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};


function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { isAuthenticated } = useAuth();
  const {sharedState, setSharedState} = useSharedContext();

  useEffect(() => {
   if(isAuthenticated){
    fetchCart().then((res) => {
      if (res) {
        setCartItems(res);
      }
    });
   }else {
    setCartItems([])
   }
  }, [isAuthenticated, setCartItems]);


  const fetchCart = async () => {
    try {
      const response = await productService.fetchUserCart();

      if (response) {
        let cart = [];
        for (let i = 0; i < response.length; i++) {
          const cartItem = response[i];
          let product = await fetchProduct(cartItem.product_id);
          product.quantity = cartItem.quantity;
          cart.push(product);
        }

        return cart;
      } else throw new Error();
    } catch (error) {
      throw error;
    }
  };

  const fetchProduct = async (productId) => {
    try {
      const product = await productService.fetchProductById(productId);
      if (product.id) {
        return product;
      }
    } catch (error) {
      throw error;
    }
  };

  const addToCart = async (item) => {
    if(isAuthenticated){
      try {
        const response = await productService.addItemToCart(item);
        if (response) {
          const cartItems = await fetchCart();
          setCartItems(cartItems);
        } else {
          throw new Error();
        }
      } catch (error) {
        throw error;
      }
    }else {
      toast.error('You need to be logged in to add an item to cart')
    }
  };

  const incrementItem = async (itemId) => {
    try {
      const response = await productService.increaseCartItemByOne(itemId);
      if (response) {
        const cartItems = await fetchCart();
        setCartItems(cartItems);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw error;
    }
  };

  const decrementItem = async (itemId) => {
    try {
      const response = await productService.decreaseCartItemsByOne(itemId);
      if (response) {
        const cartItems = await fetchCart();
        setCartItems(cartItems);
      } else {
        throw new Error();
      }
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await productService.deleteUserCart();
      if(response){
        const cartItems = await fetchCart();
        setCartItems(cartItems)
      }else {
        throw new Error();
      }
    } catch (error) {
      throw error
    }

  };

  const updateCartData = (data) => {
    setSharedState((prevState) =>({
      ...prevState,
      cartData: data
    }))
  }
  




  return (
    <CartContext.Provider
      value={{
        catData: sharedState.cartData,
        updateCartData,
        cartItems,
        fetchCart,
        setCartItems,
        incrementItem,
        decrementItem,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
