import { useDispatch, useSelector } from 'react-redux';
import { incrementItemInCart,removeAllItemInCart, addToCart, decrementItemInCart, removeItemInCart } from '../features/cart/cartSlice';
import {useAddUserCartMutation, useUpdateUserCartMutation, useDeleteUserCartItemMutation } from '../features/cart/cartApiSlice';

const useCartOperationsHooks = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [updateUserCart] = useUpdateUserCartMutation();
  const [addUserCart] = useAddUserCartMutation();
  const [deleteUserCartItem] = useDeleteUserCartItemMutation();
  const cart = useSelector((state) => state.cart.items);

  const handleAddToCart = async (item) => {

    dispatch(addToCart(item));
    if (!token || !user) {
        return;
      }
    try {
      const data = {
        products : [{...item, productID : item.productID, quantity : 1}]
      }
      if (cart?.length > 0) {
        updateUserCart({products :[...cart, {...item, productID : item.productID, quantity : 1} ]}).unwrap();
      }else{
        await addUserCart(data).unwrap();
      }
    } catch (error) {
      console.error("Failed to add cart:", error);
    }
  };
  const handleIncrement = async (item) => {

    dispatch(incrementItemInCart(item.productID));
    if (!token || !user) {
        return;
      }
    try {

      const products = cart.map((cartItem) =>
        cartItem.productID === item.productID
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
      await updateUserCart({products}).unwrap();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleDecrement = async (item) => {


    if (item.quantity > 1) {
      dispatch(decrementItemInCart(item.productID));
      if (!token || !user) {
        // console.error("User not authenticated");
        return;
      }
      try {
        const products = cart.map((cartItem) =>
          cartItem.productID === item.productID
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        await updateUserCart({products}).unwrap();
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    } else {
      handleRemove(item.productID);
    }
  };

  const handleRemove = async (itemId) => {


    dispatch(removeItemInCart(itemId));
    if (!token || !user) {
        // console.error("User not authenticated");
        return;
      }
    try {
      const products = cart.filter((cartItem) => cartItem.productID !== itemId )
      await updateUserCart({products}).unwrap();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  };
  const handleRemoveAll = async () => {
    dispatch(removeAllItemInCart())
    if (!token || !user) {
        // console.error("User not authenticated");
        return;
      }
    try {

      
      await deleteUserCartItem({products:[]}).unwrap();
    } catch (error) {
      console.error("Failed to delete cart item:", error);
    }
  }

  return {
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    handleRemove,
    handleRemoveAll
  };
};

export default useCartOperationsHooks;
