import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Item from './Item';
import productService from '../utils/products';
import { useCart } from '../context/CartProvider';

function ItemList() {

    const [items, setItems] = useState([]);
   
    

    useEffect(() => {

       productService.fetchProducts().then(res => {
            setItems([...res])

        }).catch(error => {
            console.error(error)
            toast.warn(error.message)
        })

    },[])

    
  return (
    <div className="p-4">
        <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Items</h2>

      {
        items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                items.map((item) =>{

                 return   <Item key={item.id}
                    item={item}
                
                     />

                })
            }
           
          </div>
        ) : <p>No items to display at the moment</p>
      }
    
    </div>
  );
}

export default ItemList;
