import React, { useEffect, useMemo, useState } from 'react';
// import { Items } from '../data/mockData';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../features/user/userSlice';
import { useGetItemsQuery } from '../features/item/itemApiSlice';

export function useItem(props) {
    const userProduct = useSelector((state) => state?.user?.products);
    const preferredCountry = useSelector((state) => state.auth?.preferredCountry);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const {data: items = [],isLoading:loading, error} = useGetItemsQuery({country:preferredCountry ? preferredCountry?.name : undefined,category:props.category ? props?.category : undefined,subCategory: props?.subCategory ? props?.subCategory: undefined})


    // const filteredProducts = useMemo(() => {
    useEffect(() => {
        if(items.data){
            console.log("items.data:: ",items.data)
            dispatch(setProducts(items.data));
            setIsLoading(false);
        }
        
    }, [props]);
    
    console.log("userProduct ",userProduct)

    // useEffect(() => {
    // //     if (preferredCountry && filteredProducts.length > 0) {
    //       console.log("GOR HERER")
    //         dispatch(setProducts(filteredProducts));
    // //     } else if (!preferredCountry) {
    // //         dispatch(setProducts(items));
    // //     } else {
    // //         dispatch(setProducts(filteredProducts)); // No products for this country
    // //     }
    // //     setIsLoading(false); // Set loading false after the products are processed
    // // }, [preferredCountry, filteredProducts, dispatch]);
    // }, [ filteredProducts, dispatch]);


//     useEffect(() => {
//         dispatch(setProducts(items));
//         setIsLoading(false);
// }, [ items, dispatch]);

    return {
        isLoading,
        userProduct,
        preferredCountry,
    };
}
