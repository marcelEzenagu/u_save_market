import { useSelector, useDispatch } from "react-redux";
import { useToaster } from "../components/ToasterContext";
import {
  useAddItemToWishListMutation,
  useRemoveItemFromWishListMutation,
} from "../features/user/userApiSlice";
import { addToWishList, removeFromWishList } from "../features/user/userSlice";
function useWishListOperationsHooks() {
  const wishList = useSelector((state) => state?.user.wishList);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { showToast } = useToaster();
  const [addItemToWishList] = useAddItemToWishListMutation();
  const [removeItemFromWishList] = useRemoveItemFromWishListMutation();

  const handleAddToWishList = async (item) => {
   
    if (!token || !user) {
      showToast(
        "Oops! Looks like you need to log in before adding items to your wishList. Log in to continue shopping!",
        "warning"
      );
      return;
    }else{
    dispatch(addToWishList(item));
    try {
      const data = {
        itemID: item.itemID ,
      };
      await addItemToWishList(data).unwrap();
      showToast("Item added to wishList successfully!", "success");
    } catch (error) {
      showToast(
        "Something went wrong while adding the item to the wishList. Please try again later.",
        "error"
      );
    }
  };
}
  const handleRemoveFromWishList = async (item) => {

   
    if (!token || !user) {
      showToast(
        "Oops! You need to log in to remove items from your wishList. Log in to continue!",
        "warning"
      );
      
    }else{
    dispatch(removeFromWishList(item?.itemID));
    try {
    
      await removeItemFromWishList(item?.itemID).unwrap();
      showToast("Item removed from wishList successfully!", "success");
    } catch (error) {
      console.log(error);
      showToast(
        "Something went wrong while removing the item from the wishList. Please try again later.",
        "error"
      );
    }
  }
  };

  const handleFindItemInWishList = (id) => {
    const Item = wishList.find(
      (cartItem) => cartItem.itemID === id?.itemID
    );
    return Item;
  };

  return {
    handleAddToWishList,
    handleRemoveFromWishList,
    handleFindItemInWishList,
  };
}

export default useWishListOperationsHooks;
