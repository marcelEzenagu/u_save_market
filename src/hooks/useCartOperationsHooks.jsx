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
      await addUserCart({
        products : [{...item, productID : item.id}]
      }).unwrap();
      console.log('add');
    } catch (error) {
      console.error("Failed to add cart:", error);
    }
  };
  const handleIncrement = async (item) => {

    dispatch(incrementItemInCart(item.id));
    if (!token || !user) {
        // console.error("User not authenticated");
        return;
      }
    try {
      await updateUserCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      ).unwrap();
    } catch (error) {
      console.error("Failed to update cart:", error);
    }
  };

  const handleDecrement = async (item) => {


    if (item.quantity > 1) {
      dispatch(decrementItemInCart(item.id));
      if (!token || !user) {
        // console.error("User not authenticated");
        return;
      }
      try {
        await updateUserCart(
          cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          )
        ).unwrap();
      } catch (error) {
        console.error("Failed to update cart:", error);
      }
    } else {
      handleRemove(item.id);
    }
  };

  const handleRemove = async (itemId) => {


    dispatch(removeItemInCart(itemId));
    if (!token || !user) {
        // console.error("User not authenticated");
        return;
      }
    try {
      await deleteUserCartItem(itemId).unwrap();
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
      await deleteUserCartItem(itemId).unwrap();
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
