import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import RightImage from "../../../assets/images/vendor/Auth/login.webp";
import Logo from "../../../assets/images/nav/logo.webp";
import { setCredentials } from "../../../features/auth/authSlice";
import { useLoginAdminMutation } from "../../../features/auth/authApiSlice";
import { useErrorMessageHooks } from "../../../hooks/useErrorMessageHooks";
import { setCookie } from "../../../utils";
const LoginAdmin = () => {
  const {
    errMsg,
    data,
    setData,
    handleChange,
    handleError,
    setErrMsg,
    dispatch,
    navigate,
    setErrorMessagesList,
    handleErrorMessagesList,
  } = useErrorMessageHooks();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setErrorMessagesList([]);
    try {
      const { response } = await loginAdmin({
        email: data.email,
        password: data.password,
      }).unwrap();
      setCookie("accessToken", response?.access_data?.access_token);
      dispatch(
        setCredentials({
          accessToken: response?.access_data?.access_token,
          user: response?.user,
          role: response?.access_data?.role,
        })
      );
      setData({
        email: "",
        password: "",
        eye: false,
      });
      navigate("/admin/overview");
    } catch (err) {
      console.log(err);
      handleError(err, "Login");
    }
  };

  return (
    <div className="block lg:flex  items-start px-4 pt-8 pb-4 h-screen max-w-[1366px] mx-auto">
      <div className="w-full lg:w-1/2  hidden md:flex flex-col ">
        <div className="w-full ">
          <img src={Logo} alt="" className="  w-32 2xl:w-48" />
        </div>

        <div className="mb-6  max-w-[370px] 2xl:max-w-[420px]  mx-auto mt-10 2xl:mt-20">
          <img
            src={RightImage}
            alt="Illustration"
            className=" rounded-2xl"
          />
            <p className="text-center 2xl:text-xl text-regal-black mt-8 font-[400]">
            Let’s see what we have new, check it out! So maybe write here something more.
          </p>
        </div>

      </div>
      <div className=" mx-auto my-auto border rounded-xl  shadow-md py-14 px-8 animated fadeInDown">
        <div className="flex flex-col  justify-center md:w-[440px] mx-auto">
          {/* <Link to="/" className="mb-8">
            <img src={Logo} alt="" className="w-36 mx-auto" />
          </Link> */}
          <h1 className="text-xl md:text-[26px] font-bold text-center mb-5 md:w-[410px] mx-auto ">
            Welcome Back
          </h1>
          {/* Description Text */}
          {/* <p className="text-center text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras elementum elit eget purus suscipit, sed egestas 
          </p> */}

          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4 col-span-2 mt-4">
              <label
                htmlFor="Email"
                className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
              >
                Email or phone
              </label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Enter your email or phone number"
                className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
              />
              {handleErrorMessagesList("email")}
            </div>

            <div className="mb-4 col-span-2">
              <label
                htmlFor="password"
                className="block text-xs md:text-[14px] font-[600]  leading-6 mb-2 text-regal-black"
              >
                Password
              </label>
              <div className="mb-4 relative">
                <input
                  type={data.eye ? "text" : "password"}
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                  id="text"
                  placeholder="Enter your password"
                  className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {data.eye ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() => setData({ ...data, eye: !data.eye })}
                    />
                  ) : (
                    <AiOutlineEye
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() => setData({ ...data, eye: !data.eye })}
                    />
                  )}
                </div>
              </div>
              <p className=" text-xs md:text-xs text-regal-light-gray mb-8 font-[400]">
                Must be 8 characters
              </p>
              {handleErrorMessagesList("password")}
            </div>
            <p className="text-red-600 text-xs mb-1">{errMsg}</p>

            <div className="w-full ">
              <button
                className=" text-xs md:text-[12px] bg-regal-sky-blue text-white px-4  py-4 font-semibold w-full rounded-lg hover:bg-blue-600  "
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Loading..." : "Log In"}
              </button>
            </div>
            {/* <div className="flex items-center justify-center my-6">
              <span className="text-gray-400 text-xs">
                or do it via other accounts
              </span>
            </div> */}
            <div className="flex flex-row items-center my-6 px-8">
              <hr className="w-full border-b-[1px]" />
              <span className="mx-4 text-xs  whitespace-nowrap ">
                {" "}
                or do it via other accounts
              </span>
              <hr className="w-full border-b-[1px]" />
            </div>

            <div className="flex justify-center gap-4">
              <button className="p-3 px-6 bg-white shadow-lg border rounded-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_17520_48661)">
                    <path
                      d="M5.54676 14.4638L4.73983 17.4762L1.79054 17.5386C0.909128 15.9037 0.40918 14.0333 0.40918 12.0456C0.40918 10.1236 0.876619 8.31106 1.70519 6.71509H1.70582L4.33152 7.19647L5.48174 9.80642C5.241 10.5083 5.10979 11.2617 5.10979 12.0456C5.10988 12.8965 5.264 13.7117 5.54676 14.4638Z"
                      fill="#FBBB00"
                    />
                    <path
                      d="M23.3884 9.87988C23.5216 10.581 23.591 11.3052 23.591 12.0452C23.591 12.875 23.5037 13.6845 23.3375 14.4653C22.7733 17.1223 21.2989 19.4424 19.2565 21.0842L19.2559 21.0836L15.9487 20.9148L15.4806 17.9929C16.8358 17.1981 17.8949 15.9543 18.4528 14.4653H12.2549V9.87988H18.5433H23.3884Z"
                      fill="#518EF8"
                    />
                    <path
                      d="M19.2559 21.084L19.2565 21.0847C17.2701 22.6813 14.7469 23.6366 12.0001 23.6366C7.58598 23.6366 3.74826 21.1694 1.79053 17.5386L5.54675 14.4639C6.5256 17.0763 9.04567 18.9359 12.0001 18.9359C13.27 18.9359 14.4597 18.5926 15.4805 17.9933L19.2559 21.084Z"
                      fill="#28B446"
                    />
                    <path
                      d="M19.3987 3.12303L15.6437 6.19716C14.5872 5.53675 13.3382 5.15525 12.0002 5.15525C8.97893 5.15525 6.41173 7.10021 5.48192 9.80628L1.70596 6.71495H1.70532C3.63439 2.99567 7.52052 0.45459 12.0002 0.45459C14.8126 0.45459 17.3913 1.45639 19.3987 3.12303Z"
                      fill="#F14336"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_17520_48661">
                      <rect
                        width="23.1818"
                        height="23.1818"
                        fill="white"
                        transform="translate(0.40918 0.45459)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className="p-3 px-6 bg-white shadow-lg border rounded-lg">
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 21 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_17520_48668)">
                    <path
                      d="M20.0352 18.1421C19.6848 18.953 19.27 19.6994 18.7894 20.3856C18.1343 21.3211 17.5979 21.9686 17.1845 22.3282C16.5437 22.9184 15.8572 23.2207 15.122 23.2379C14.5942 23.2379 13.9577 23.0875 13.2168 22.7823C12.4734 22.4786 11.7903 22.3282 11.1656 22.3282C10.5105 22.3282 9.80795 22.4786 9.05645 22.7823C8.3038 23.0875 7.69748 23.2465 7.2339 23.2623C6.52888 23.2924 5.82615 22.9815 5.12471 22.3282C4.67701 21.9371 4.11703 21.2666 3.4462 20.3168C2.72645 19.3025 2.13471 18.1263 1.67114 16.7854C1.17466 15.337 0.925781 13.9345 0.925781 12.5767C0.925781 11.0213 1.26134 9.67978 1.93346 8.55561C2.46169 7.65263 3.16442 6.94033 4.04394 6.41743C4.92346 5.89452 5.87378 5.62806 6.8972 5.61101C7.45718 5.61101 8.19152 5.7845 9.10408 6.12546C10.0141 6.46757 10.5984 6.64106 10.8545 6.64106C11.0461 6.64106 11.6952 6.4382 12.7955 6.03377C13.8361 5.65871 14.7143 5.50342 15.4338 5.56459C17.3834 5.72218 18.848 6.49192 19.8221 7.87869C18.0785 8.93682 17.216 10.4189 17.2332 12.3201C17.2489 13.801 17.7853 15.0333 18.8395 16.0118C19.3172 16.4659 19.8507 16.8169 20.4443 17.0662C20.3156 17.4401 20.1797 17.7983 20.0352 18.1421ZM15.564 0.51949C15.564 1.68021 15.1406 2.76397 14.2967 3.76709C13.2783 4.9596 12.0464 5.64868 10.7106 5.53995C10.6936 5.4007 10.6838 5.25414 10.6838 5.10014C10.6838 3.98585 11.1681 2.79334 12.0281 1.8183C12.4575 1.32462 13.0036 0.914132 13.6659 0.586679C14.3267 0.264111 14.9518 0.0857238 15.5396 0.0551758C15.5568 0.210346 15.564 0.365526 15.564 0.519475V0.51949Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_17520_48668">
                      <rect
                        width="19.5185"
                        height="23.2091"
                        fill="white"
                        transform="translate(0.925781 0.0546875)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className="p-3 px-6 bg-white shadow-lg border rounded-lg">
                <svg
                  width="14"
                  height="28"
                  viewBox="0 0 16 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1931 8.81829V13.3637H0.727228V8.81829H14.1931ZM3.80961 30.6365V7.24159C3.80961 5.66015 4.11738 4.34859 4.73291 3.30693C5.35791 2.26526 6.21018 1.48401 7.28973 0.963177C8.36927 0.442344 9.5956 0.181927 10.9687 0.181927C11.8967 0.181927 12.7443 0.252951 13.5113 0.394997C14.2878 0.537042 14.8655 0.664883 15.2443 0.77852L14.1647 5.32397C13.928 5.24822 13.6344 5.17719 13.284 5.1109C12.9431 5.04462 12.5928 5.01147 12.2329 5.01147C11.3428 5.01147 10.7225 5.21981 10.3721 5.63647C10.0217 6.04367 9.84655 6.61659 9.84655 7.35522V30.6365H3.80961Z"
                    fill="#3B5999"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
