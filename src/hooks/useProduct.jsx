import React, { useEffect, useMemo, useState } from 'react';
import { Items } from '../data/mockData';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../features/user/userSlice';

export function useProduct() {
    const userProduct = useSelector((state) => state?.user?.products);
    const preferredCountry = useSelector((state) => state.auth?.preferredCountry);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const filteredProducts = useMemo(() => {
        if (preferredCountry) {
            return Items.filter((e) => 
                e?.country.toLowerCase() === preferredCountry?.name.toLowerCase()
            );
        }
        return Items;
    }, [preferredCountry]);

   
    useEffect(() => {
        if (preferredCountry && filteredProducts.length > 0) {
          
            dispatch(setProducts(filteredProducts));
        } else if (!preferredCountry) {
            dispatch(setProducts(Items));
        } else {
            dispatch(setProducts(filteredProducts)); // No products for this country
        }
        setIsLoading(false); // Set loading false after the products are processed
    }, [preferredCountry, filteredProducts, dispatch]);

    return {
        isLoading,
        userProduct,
        preferredCountry,
    };
}
