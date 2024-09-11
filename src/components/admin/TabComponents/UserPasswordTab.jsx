import React, {useState} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
function UserPassword() {
  const [data, setData] = useState({
    passwordOld: "",
    passwordNew: "",
    passwordConfirm: "",
    terms: false,
    eyeOld: false,
    eyeNew: false,
    eyeConfirm: false,
    PhoneVerification: true,
    EmailVerification: false,
    type: "",
  });

  const handleChange = (e) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });
    setData(newData);
  };
  return (
    <div className="p-4 md:px-8 md:pt-2 pb-4 animate-fade-in">

      <div>
      <div className=" max-w-[800px] mt-5 ">
        <div className="mb-2 col-span-2">
              <label
                htmlFor="password"
                className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
              >
               Old Password
              </label>
              <div className="mb-4 relative">
                <input
                  type={data?.eyeOld ? "text" : "password"}
                  name="passwordOld"
                  id="password"
                  onChange={handleChange}
                  value={data.passwordOld}
                  placeholder="Enter password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {data?.eyeOld ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() => setData({ ...data, eyeOld: !data.eyeOld })}
                    />
                  ) : (
                    <AiOutlineEye
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() => setData({ ...data, eyeOld: !data.eyeOld })}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="mb-2 col-span-2">
              <label
                htmlFor="passwordNew"
                className="block text-xs md:text-[12px] font-[600]  leading-6 mb-2 text-regal-black"
              >
                New Password
              </label>
              <div className="mb-4 relative">
                <input
                  type={data?.eyeNew ? "text" : "password"}
                  name="passwordNew"
                  id="passwordNew"
                  onChange={handleChange}
                  value={data.passwordNew}
                  placeholder="Enter password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {data?.eyeNew ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() => setData({ ...data, eyeNew: !data.eyeNew })}
                    />
                  ) : (
                    <AiOutlineEye
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() => setData({ ...data, eyeNew: !data.eyeNew })}
                    />
                  )}
                </div>
              </div>
            </div>



        </div>
        <hr className='my-8'/>

      <main className=" max-w-[800px]   ">
            <div>
              <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                Two Factor Verification Options
              </h5>
              <h6 className="text-regal-light-gray text-[10px] md:text-xs mt-1">
                Add an extra layer of security to block unauthorized access and
                protect your account
              </h6>
            </div>

            <div className="border-b py-4 mt-4">
              <div className="w-full flex flex-row items-center justify-between ">
                <div>
                  <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                    Phone Verification
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 18.4297H13L8.54999 21.3897C7.88999 21.8297 7 21.3598 7 20.5598V18.4297C4 18.4297 2 16.4297 2 13.4297V7.42969C2 4.42969 4 2.42969 7 2.42969H17C20 2.42969 22 4.42969 22 7.42969V13.4297C22 16.4297 20 18.4297 17 18.4297Z"
                        stroke="#21367F"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9998 11.3604V11.1504C11.9998 10.4704 12.4198 10.1104 12.8398 9.82037C13.2498 9.54037 13.6598 9.18039 13.6598 8.52039C13.6598 7.60039 12.9198 6.86035 11.9998 6.86035C11.0798 6.86035 10.3398 7.60039 10.3398 8.52039"
                        stroke="#21367F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9955 13.75H12.0045"
                        stroke="#21367F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </h5>

                </div>
                <label className="inline-flex items-center cursor-pointer gap-4 ">
                  <input
                    type="checkbox"
                    name="PhoneVerification"
                    className="sr-only peer "
                  />
                  <div className="relative w-8 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[0px] after:start-[-5.3px] peer-checked:after:bg-white after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="py-4">
              <div className="w-full flex flex-row items-center justify-between ">
                <div>
                  <h5 className="text-regal-black text-[12px] md:text-sm  font-[600] flex flex-row items-center gap-2">
                    Email Verification
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 18.4297H13L8.54999 21.3897C7.88999 21.8297 7 21.3598 7 20.5598V18.4297C4 18.4297 2 16.4297 2 13.4297V7.42969C2 4.42969 4 2.42969 7 2.42969H17C20 2.42969 22 4.42969 22 7.42969V13.4297C22 16.4297 20 18.4297 17 18.4297Z"
                        stroke="#21367F"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9998 11.3604V11.1504C11.9998 10.4704 12.4198 10.1104 12.8398 9.82037C13.2498 9.54037 13.6598 9.18039 13.6598 8.52039C13.6598 7.60039 12.9198 6.86035 11.9998 6.86035C11.0798 6.86035 10.3398 7.60039 10.3398 8.52039"
                        stroke="#21367F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9955 13.75H12.0045"
                        stroke="#21367F"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </h5>
 
                </div>
                <label className="inline-flex items-center cursor-pointer gap-4 ">
                  <input
                    type="checkbox"
                    name="EmailVerification"
                    className="sr-only peer "
                  />
                  <div className="relative w-8 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[0px] after:start-[-5.3px] peer-checked:after:bg-white after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
      </main>
      </div>


        <button
            className="inline-block px-8  py-2 md:py-3 mt-24 mb-8 text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-sm cursor-pointer">
                Update Details 
                
            </button>
        </div>
  )
}

export default UserPassword