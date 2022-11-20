import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();


export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [stripeSession, setstripeSession] = useState(null);


  let foundProduct;
  let index;


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('CartItems'));
    console.log({items})

    let subTotal = items?.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity * currentValue.price;
    }, 0);

    if (items) {
      setCartItems(items);
      setTotalQuantities(items.length);
      setTotalPrice(subTotal);
    }
  }, []);


  const incQty = () => setQty((prevQty) => prevQty + 1);
  
  const decQty = () => {
    setQty(prevQty => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  };


  //! Add a product to cart
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(item => item._id === product._id);

    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

    if(checkProductInCart) {
      // setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);
      // setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity);

      // if item already exist in the cart, then we only want to update the quantity
      const updatedCartItems = cartItems.map(cartProduct => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      setCartItems(updatedCartItems);

      toast.success(`${qty} ${product.name} added to the cart`)

      return updatedCartItems;
    } else {
      // if item is not in the cart yet
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      toast.success(`${qty} ${product.name} added to the cart`)

      return [...cartItems, { ...product }]
    }
    // toast.success(`${qty} ${product.name} added to the cart`)

  };


  //! Remove a product from cart
  const onRemove = (productId) => {
    foundProduct = cartItems.find(item => item._id === productId);
    const newCartItems = cartItems.filter(item => item._id !== productId);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  };


  //! Toggle Cart Quantity
  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);

    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if(value === 'inc') {
      // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setCartItems(prevCartItems => 
        prevCartItems.map(item => {          
          if (item._id === id){
            return {...item, quantity: foundProduct.quantity + 1}
          }
          return item
        })
      );

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        // setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setCartItems(prevCartItems => 
          prevCartItems.map(item => {          
            if (item._id === id){
              return {...item, quantity: foundProduct.quantity - 1}
            }
            return item
          })
        );

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  };


  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuanitity,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        stripeSession, 
        setstripeSession
      }}
    >
      {children}
    </Context.Provider>
  )
}


export const useStateContext = () => useContext(Context);