import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));

      if (storedCartItems !== null) {
        setCartItems([...cartItems, ...storedCartItems]);
      }

  
  
       if (parseInt(localStorage.TotalPrice)) { // NaN is falsy and will be ignored
        setTotalPrice(parseInt(localStorage.TotalPrice));
     } else {
         localStorage.TotalPrice = totalPrice;
     }


     if (parseInt(localStorage.Totalqty)) { // NaN is falsy and will be ignored
      setTotalQuantities(parseInt(localStorage.Totalqty));
   } else {
       localStorage.Totalqty = totalQuantities;
   }

  
      
        };

  }, []);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.localStorage.setItem("TotalPrice", totalPrice);
      window.localStorage.setItem("Totalqty", totalQuantities);

    }
  }, [cartItems]);


  let foundProduct;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
              ...cartProduct,
              quantity: cartProduct.quantity + quantity
          } 
      } else {
          return {...cartProduct}
      }});

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    } 
    toast.success(`${qty} ${product.name} added to the cart.`);
  };



  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };


  let index;
  const toggleAdd = (id) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
  }
 
  const toggleMinus = (id) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)
    setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)

    if(foundProduct.quantity == 1 ) {
      const newCartItems = cartItems.filter((item) => item._id !== id);
      setCartItems(newCartItems);
    }
  }

  const HandleCheckOut = ()=>{
    toast.error("Payment gateway not integrated");
  };


  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        setCartItems,
        totalPrice,
        setTotalPrice,
        totalQuantities,
        setTotalQuantities,
        qty,
        setQty,
        onAdd,
        onRemove,
        HandleCheckOut,
        toggleAdd,
        toggleMinus,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
