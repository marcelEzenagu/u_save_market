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
        <div className="min-h-[500px] max-w-[800px] mt-5">
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

        <button
            className="inline-block px-8  py-2 md:py-3 mt-8  text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-sm cursor-pointer">
                Update Details 
                
            </button>
        </div>
  )
}

export default UserPassword