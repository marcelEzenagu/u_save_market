import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Location from "../../../assets/images/nav/icons/location.webp";
import { IoCloseCircleOutline } from "react-icons/io5";
import {
  useGetCountriesQuery,
  useUpdateUserMutation,
} from "../../../features/auth/authApiSlice";
import { setCountry, setCurrency } from "../../../features/auth/authSlice";
import { FaCheckCircle } from "react-icons/fa";

const Modal = ({
  isOpen,
  onClose,
  onCountrySelect,
  errorMsg,
  preferredCountry,
  isLoading,
}) => {
  const [search, setSearch] = useState("");
  const countries = useSelector((state) => state?.auth?.countries);
  const [pickedCountry, setPickedCountry] = useState(preferredCountry);

  const filteredCountries = countries?.filter(
    (country) =>
      search === "" || country?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  useEffect(() => {
    setPickedCountry(preferredCountry);
  }, [preferredCountry]);

  const dropdownRef = React.useRef(null);

  useEffect(() => {
    if (preferredCountry) {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [onClose, preferredCountry]);

  const handleSelectedCountry = () => {
    onCountrySelect(pickedCountry);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black w-full bg-opacity-75 flex justify-center lg:items-center z-50 animated fadeInDown">
        <div
          className="bg-white lg:rounded-lg overflow-hidden lg:max-w-[600px] w-full z-52"
          ref={dropdownRef}
        >
          <div className="flex items-center bg-gray-200 py-2 px-4 justify-between lg:hidden">
            <span className="flex items-center w-10">
              <img src={Location} alt="" className="w-5 mr-1 xl:mr-2" />
              <span className="font-[500] text-sm">Country</span>
            </span>
            <button onClick={onClose}>
              <IoCloseCircleOutline className="text-xl text-regal-black" />
            </button>
          </div>
          <div className="lg:pt-12 lg:pb-8 p-4 lg:p-8 relative">
            <h2 className="text-lg lg:text-xl font-bold text-regal-blue mb-2 lg:mb-3">
              Choose Country
            </h2>
            <p className="text-xs lg:text-[14px] font-[500] text-regal-black mb-4">
              Select a country to see goods that are allowed in that country
            </p>
            <input
              type="text"
              placeholder="Search for a country"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-4 px-4 border text-xs md:text-[14px] rounded-lg mb-4"
            />
            <ul className="max-h-[50vh] lg:max-h-[300px] overflow-y-scroll w-full">
              {filteredCountries.length ? (
                filteredCountries.map((country) => (
                  <li
                    key={country.name}
                    className="flex items-center py-2 my-2 px-2 cursor-pointer hover:font-[700] hover:text-regal-blue hover:bg-regal-secondary-light"
                    onClick={() => setPickedCountry(country)}
                  >
                    <img
                      src={country?.flag}
                      alt={country?.name}
                      className="w-8 h-4 mr-2"
                    />
                    <span className="text-sm font-[400] w-full flex flex-row items-center justify-between">
                      {country.name}{" "}
                      {pickedCountry &&
                        pickedCountry.name?.toLowerCase() ===
                          country.name?.toLowerCase() && (
                          <FaCheckCircle className="text-xl text-green-600" />
                        )}
                    </span>
                  </li>
                ))
              ) : (
                <div>
                  <p className="text-sm text-center my-12">
                    The country you are searching for is not Supported{" "}
                  </p>
                </div>
              )}
            </ul>
          </div>
          <div className=" w-full px-4 pb-8 bg-white">
            {pickedCountry && (
              <button
                className="bg-regal-sky-blue text-white px-4 py-2 font-bold w-full rounded-md hover:bg-blue-600 transition"
                onClick={handleSelectedCountry}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Apply"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

function CountryModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const preferredCountry = useSelector((state) => state.auth?.preferredCountry);
  const isLoggedIn = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  // const { data,isSuccess } = useGetCountriesQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [errorMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(true); // Track loading state

  const countries = localStorage.getItem("countries");

  // console.log("CountryModal=DATA--CountryModal", countries);
  useEffect(() => {
    // if (countries.length) {
    if (countries) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const lspc = JSON.parse(localStorage.getItem("preferredCountry"));
    if (lspc) {
      if (!preferredCountry) {
        dispatch(setCountry(lspc));
        dispatch(setCurrency(lspc));
      }
    }

    if (!preferredCountry) {
      if (!lspc && !isLoggedIn) {
        setIsModalOpen(true);
      }
    }
  }, [preferredCountry, dispatch]);

  useEffect(() => {
    if (isLoggedIn && !preferredCountry) {
      setIsModalOpen(true);
    }
    if (isLoggedIn && preferredCountry) {
      setIsModalOpen(false);
    }
  }, [isLoggedIn, preferredCountry]);

  const handleCountrySelect = async (country) => {
    if (isLoggedIn) {
      try {
        await updateUser({ preferredCountry: country.name }).unwrap();
        dispatch(setCountry(country));
        dispatch(setCurrency(country));
        setIsModalOpen(false);
      } catch (err) {
        if (err?.status >= 400 && err?.status <= 404) {
          setErrMsg(err?.data?.message || "Failed to update user preferred country");
        } else if (err?.status >= 500) {
          setErrMsg(err?.data?.message || "Server error");
        } else {
          setErrMsg("Failed to update user preferred country");
        }
        console.error("Failed to update user preferred country:", err);
      }
    } else {
      // localStorage.setItem("preferredCountry", JSON.stringify(country));
      // localStorage.setItem("preferredCurrency", JSON.stringify(country));
      dispatch(setCountry(country));
      dispatch(setCurrency(country));
      setIsModalOpen(false);
    }

    // Avoid window.location.reload() if possible; handle state updates instead.
  };

  // if (loading) {
  //     // Show a loading view or return null to render nothing
  //     return
  // }
  return (
    <>
      {loading ? (
        <p>Loading countries...</p>
      ) : (
        <>
          <button
            className="flex items-center hover:text-regal-blue text-sm xl:text-sm text-regal-black cursor-pointer font-[500]"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={preferredCountry?.flag || Location}
              alt="Location"
              className="w-4 md:w-6  mr-1 xl:mr-2"
            />
            {preferredCountry?.name || "Enter Country"}
          </button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onCountrySelect={handleCountrySelect}
            errorMsg={errorMsg}
            preferredCountry={preferredCountry}
            isLoading={isLoading}
          />
        </>
      )}
    </>
  );
}

export default CountryModal;
