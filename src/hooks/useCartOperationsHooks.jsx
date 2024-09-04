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
  const { showToast } = useToaster(); // Correct usage of showToast from the context

  const handleAddToCart = async (item) => {
    dispatch(addToCart(item));
    if (!token || !user) {
      showToast('Please log in to add items to the cart', 'error');
      return;
    }
    try {
      const data = {
        products: [{ ...item, productID: item.productID, quantity: 1 }],
      };
      if (cart?.length > 0) {
        await updateUserCart({ products: [...cart, { ...item, productID: item.productID, quantity: 1 }] }).unwrap();
      } else {
        await addUserCart(data).unwrap();
      }
      showToast('Item added to cart successfully', 'success');
    } catch (error) {
      showToast('Failed to add item to cart', 'error');
    }
  };

  const handleIncrement = async (item) => {
    dispatch(incrementItemInCart(item.productID));
    if (!token || !user) {
      showToast('Please log in to update the cart', 'error');
      return;
    }
    try {
      const products = cart.map((cartItem) =>
        cartItem.productID === item.productID
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      await updateUserCart({ products }).unwrap();
      showToast('Item quantity updated', 'success');
    } catch (error) {
      showToast('Failed to update item quantity', 'error');
    }
  };

  const handleDecrement = async (item) => {
    if (item.quantity > 1) {
      dispatch(decrementItemInCart(item.productID));
      if (!token || !user) {
        showToast('Please log in to update the cart', 'error');
        return;
      }
      try {
        const products = cart.map((cartItem) =>
          cartItem.productID === item.productID
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        await updateUserCart({ products }).unwrap();
        showToast('Item quantity updated', 'success');
      } catch (error) {
        showToast('Failed to update item quantity', 'error');
      }
    } else {
      handleRemove(item.productID);
    }
  };

  const handleRemove = async (itemId) => {
    dispatch(removeItemInCart(itemId));
    if (!token || !user) {
      showToast('Please log in to remove items from the cart', 'error');
      return;
    }
    try {
      const products = cart.filter((cartItem) => cartItem.productID !== itemId);
      await updateUserCart({ products }).unwrap();
      showToast('Item removed from cart', 'success');
    } catch (error) {
      showToast('Failed to remove item from cart', 'error');
    }
  };

  const handleRemoveAll = async () => {
    dispatch(removeAllItemInCart());
    if (!token || !user) {
      showToast('Please log in to clear the cart', 'error');
      return;
    }
    try {
      await deleteUserCartItem({ products: [] }).unwrap();
      showToast('Cart cleared', 'success');
    } catch (error) {
      showToast('Failed to clear cart', 'error');
    }
  };

  return {
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    handleRemove,
    handleRemoveAll,
  };
};

export default useCartOperationsHooks;
