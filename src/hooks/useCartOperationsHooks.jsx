import { useDispatch, useSelector } from 'react-redux';
import {
  incrementItemInCart,
  removeAllItemInCart,
  addToCart,
  decrementItemInCart,
  removeItemInCart
} from '../features/cart/cartSlice';
import {
  useAddUserCartMutation,
  useUpdateUserCartMutation,
  useDeleteUserCartItemMutation
} from '../features/cart/cartApiSlice';
import { useToaster } from '../components/ToasterContext';

const useCartOperationsHooks = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [updateUserCart] = useUpdateUserCartMutation();
  const [addUserCart] = useAddUserCartMutation();
  const [deleteUserCartItem] = useDeleteUserCartItemMutation();
  const cart = useSelector((state) => state.cart.items);
  const { showToast } = useToaster(); 

  const handleAddToCart = async (item) => {

    if(!item?.quantity>0)  return showToast('This product is out of stock it can not be added', 'error');
    dispatch(addToCart(item));
    if (!token || !user) {
      showToast('Oops! Looks like you need to log in before adding items to your cart. Log in to continue shopping!', 'warning');
      return;
    }
    try {
      const data = {
        products: [{ ...item, quantity: 1 }],
      };

      if (cart?.length > 0) {
        await updateUserCart({ products: [...cart, { ...item, quantity: 1 }] }).unwrap();
      } else {
        await addUserCart(data).unwrap();
      }
      showToast('Item added to cart successfully!', 'success');
    } catch (error) {
      showToast('Something went wrong while adding the item to the cart. Please try again later.', 'error');
    }
  };

  const handleIncrement = async (item) => {
    // if(!item?.in_stock)  return showToast('This product is out of stock it can not be updated', 'error');
    dispatch(incrementItemInCart(item.productID));
    if (!token || !user) {
      showToast('Oops! You need to log in to update your cart. Log in to continue!', 'warning');
      return;
    }
    try {
      const products = cart?.map((cartItem) =>
        cartItem.productID === item.productID
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      await updateUserCart({ products }).unwrap();
      showToast('Item quantity updated successfully!', 'success');
    } catch (error) {
      showToast('Something went wrong while updating the item quantity. Please try again later.', 'error');
    }
  };

  const handleDecrement = async (item) => {
    // if(!item?.in_stock)  return showToast('This product is out of stock it can not be updated', 'error');
    if (item.quantity > 1) {
      dispatch(decrementItemInCart(item.productID));
      if (!token || !user) {
        showToast('Oops! You need to log in to update your cart. Log in to continue!', 'warning');
        return;
      }
      try {
        const products = cart?.map((cartItem) =>
          cartItem.productID === item.productID
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        await updateUserCart({ products }).unwrap();
        showToast('Item quantity updated successfully!', 'success');
      } catch (error) {
        showToast('Something went wrong while updating the item quantity. Please try again later.', 'error');
      }
    } else {
      handleRemove(item.productID);
    }
  };

  const handleRemove = async (itemId) => {
    // if(!item?.in_stock)  return showToast('This product is out of stock it can not be removed', 'error');
    dispatch(removeItemInCart(itemId));
    if (!token || !user) {
      showToast('Oops! You need to log in to remove items from your cart. Log in to continue!', 'warning');
      return;
    }
    try {
      const products = cart.filter((cartItem) => cartItem.productID !== itemId);
      await updateUserCart({ products }).unwrap();
      showToast('Item removed from cart successfully!', 'success');
    } catch (error) {
      showToast('Something went wrong while removing the item from the cart. Please try again later.', 'error');
    }
  };

  const handleRemoveAll = async () => {
    dispatch(removeAllItemInCart());
    if (!token || !user) {
      showToast('Oops! You need to log in to clear your cart. Log in to continue!', 'warning');
      return;
    }
    try {
      await deleteUserCartItem({ products: [] }).unwrap();
      showToast('Cart cleared successfully!', 'success');
    } catch (error) {
      showToast('Something went wrong while clearing the cart. Please try again later.', 'error');
    }
  };
  
  const handleRemoveAllCartAfterCreateOrder = async () => {
    dispatch(removeAllItemInCart());
  };
  return {
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    handleRemove,
    handleRemoveAll,
    handleRemoveAllCartAfterCreateOrder
  };
};

export default useCartOperationsHooks;
