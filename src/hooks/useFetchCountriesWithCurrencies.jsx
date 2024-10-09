import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCountries } from "../features/auth/authSlice";
import { useGetCountriesQuery } from "../features/auth/authApiSlice";
const useFetchCountriesWithCurrencies = () => {
  const [countriesWithCurrency, setCountriesWithCurrency] = useState([]);
  const dispatch = useDispatch();
  const {data: countries, isSuccess: successResponse } = useGetCountriesQuery();
  // Fetch countries and currencies
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const countriesWithCurrency = data.map((country) => ({
          name: country.name.common,
          currency: country.currencies
            ? Object.keys(country.currencies).map((code) => ({
                code,
                name: country.currencies[code]?.name,
                symbol: country.currencies[code]?.symbol,
              }))
            : null,
        }));

        setCountriesWithCurrency(countriesWithCurrency);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Filter and dispatch countries
  useEffect(() => {
    if (successResponse && countries && countriesWithCurrency.length > 0) {
      const filteredCountries = countries.map((country) => {
        const restCountry = countriesWithCurrency.find(
          (c) => c?.name?.toLowerCase() === country?.name?.toLowerCase()
        );

        if (restCountry) {
          return {
            ...restCountry,
            code: country?.code,
            currency_code: country?.currency_code,
            name: restCountry?.name,
            number: country?.dialCode,
            currency: restCountry?.currency?.length
              ? restCountry?.currency[0]?.symbol
              : country?.currency_code,
            currencyName: restCountry?.currency?.length
              ? restCountry?.currency[0]?.name
              : country?.name,
            flag: country?.flag
              ? country?.flag
              : `https://flagcdn.com/w320/${country?.code?.toLowerCase()}.png`,
          };
        } else {
          return {
            ...country,
            currency: country?.currency_code,
            currencyName: country?.name,
            flag: country?.flag
              ? country?.flag
              : `https://flagcdn.com/w320/${country?.code?.toLowerCase()}.png`,
          };
        }
      });

      dispatch(setCountries(filteredCountries));
    }
  }, [countries, successResponse, countriesWithCurrency, dispatch]);

  return { countriesWithCurrency };
};

export default useFetchCountriesWithCurrencies;
