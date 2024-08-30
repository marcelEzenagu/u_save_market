import React, { useState, useEffect, useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { usePinInput } from "react-pin-input-hook";
import { Timer } from "../../../../components/Timer";
import ChatIcon from "../../../../assets/images/vendor/Profile/chat.webp";
import CloseIcon from "../../../../assets/images/vendor/Profile/close.webp";
import PhoneIcon from "../../../../assets/images/vendor/Profile/phone.webp";
function PasswordAndSecurity() {
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
  const [isModalOpenVerification, setisModalOpenVerification] = useState(false);
  const [isModalOpenDisableVerification, setisModalOpenDisableVerification] =
    useState(false);
  const handleChange = (e) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });
    setData(newData);
  };

  function handleVerificationInput(e) {
    if (e.target.name === "PhoneVerification") {
      if (
        e.target.name === "PhoneVerification" &&
        data?.PhoneVerification === false
      ) {
        setData({ ...data, type: "phone" });
        setisModalOpenVerification(!isModalOpenVerification);
      } else {
        setData({ ...data, type: "phone" });
        setisModalOpenDisableVerification(!isModalOpenDisableVerification);
      }
    }

    if (e.target.name === "EmailVerification") {
      if (
        e.target.name === "EmailVerification" &&
        data?.EmailVerification === false
      ) {
        setData({ ...data, type: "email" });
        setisModalOpenVerification(!isModalOpenVerification);
      } else {
        setData({ ...data, type: "email" });
        setisModalOpenDisableVerification(!isModalOpenDisableVerification);
      }
    }
  }
  function ChangeTypeVerificationBoolen() {
    if (data?.type === "phone") {
      setData({ ...data, PhoneVerification: !data?.PhoneVerification });
    } else {
      setData({ ...data, EmailVerification: !data?.EmailVerification });
    }
  }
  return (
    <div className="animate-fade-in">
      <div>
        <div className="p-4 md:p-8 border-b ">
          <h6 className="text-regal-black text-[12px] md:text-lg font-[600]">
            Password & Security
          </h6>
          <p className="text-regal-light-gray text-[10px] md:text-sm font-[400] mt-1">
            Verify your business to keep the marketplace safe for everyone
          </p>
        </div>

        <section>
          <main className="border rounded-md p-4 md:p-4 m-4 md:m-8">
            <h4 className="text-sm font-bold mb-8">Password</h4>

            <div className="mb-2 col-span-2">
              <label
                htmlFor="password"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Password
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
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
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
            <div className="mb-8 col-span-2">
              <label
                htmlFor="passwordNew"
                className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
              >
                Confirm Password
              </label>
              <div className="mb-4 relative">
                <input
                  type={data?.eyeConfirm ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  onChange={handleChange}
                  value={data.passwordConfirm}
                  placeholder="Enter password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  className="w-full p-3 md:p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                  {data?.eyeConfirm ? (
                    <AiOutlineEyeInvisible
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() =>
                        setData({ ...data, eyeConfirm: !data.eyeConfirm })
                      }
                    />
                  ) : (
                    <AiOutlineEye
                      size={20}
                      className="text-regal-light-gray"
                      onClick={() =>
                        setData({ ...data, eyeConfirm: !data.eyeConfirm })
                      }
                    />
                  )}
                </div>
              </div>
            </div>

            <button className="text-xs md:text-sm text-white bg-gray-400 py-2 px-3 rounded-md">
              Save Changes
            </button>
          </main>
        </section>
        <section>
          <main className="border rounded-md p-4 md:p-4 m-4 md:m-8">
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
                  <h6 className="text-regal-light-gray text-[10px] md:text-xs  mt-1">
                    Receive a six digit code by text message to confirm it’s you
                  </h6>
                </div>
                <label className="inline-flex items-center cursor-pointer gap-4 ">
                  <input
                    type="checkbox"
                    name="PhoneVerification"
                    checked={data?.PhoneVerification ? true : false}
                    onChange={handleVerificationInput}
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
                  <h6 className="text-regal-light-gray text-[10px] md:text-xs  mt-1">
                    Protect your account by receiving an email OTP on login
                  </h6>
                </div>
                <label className="inline-flex items-center cursor-pointer gap-4 ">
                  <input
                    type="checkbox"
                    name="EmailVerification"
                    checked={data?.EmailVerification ? true : false}
                    onChange={handleVerificationInput}
                    className="sr-only peer "
                  />
                  <div className="relative w-8 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-0   rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  after:bg-white peer-checked:after:border-blue-600 after:content-[''] after:absolute after:top-[0px] after:start-[-5.3px] peer-checked:after:bg-white after:shadow-md after:border-gray-200 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </main>
        </section>

        <Verification
          isModalOpen={isModalOpenVerification}
          type={data?.type}
          setIsModalOpen={(e) => {
            setisModalOpenVerification(e);
          }}
          ChangeTypeVerificationBoolen={ChangeTypeVerificationBoolen}
        />
        <DisableVerification
          isModalOpen={isModalOpenDisableVerification}
          type={data?.type}
          setIsModalOpen={(e) => {
            setisModalOpenDisableVerification(e);
          }}
          ChangeTypeVerificationBoolen={ChangeTypeVerificationBoolen}
        />
      </div>
    </div>
  );
}

function Verification(props) {
  const [data, setData] = useState({
    passwordOld: "",
    email: "",
    phone: "",
    otp: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");
  const [step, setStep] = useState(1);
  const [intervals, setIntervals] = useState([]);
  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
    setType(props.type);
  }, [props.isModalOpen, props.type]);
  function resetData() {
    setStep(1);
    props.setIsModalOpen(false);
    setData({
      passwordOld: "",
      email: "",
      phone: "",
      otp: 0,
    });
    props.ChangeTypeVerificationBoolen();
  }
  const dropdownaddRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownaddRef.current &&
        !dropdownaddRef.current.contains(event.target)
      ) {
        props.setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { fields, clear } = usePinInput({
    onComplete: (OTP) => {
      setData({ ...data, otp: OTP });
    },
  });
  const handleChange = (e) => {
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });
    setData(newData);
  };

  const registerInterval = (id) => {
    setIntervals(intervals.concat([id]));
  };

  const clearTimer = () => {
    setIntervals([]);
  };
  return (
    isModalOpen && (
      <div
        className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown"
        ref={dropdownaddRef}
      >
        <div className="bg-white  flex flex-col md:flex-row rounded-lg shadow-lg md:w-[720px] overflow-hidden  ">
          <div className="md:h-[400px] md:w-2/4 flex flex-col items-center justify-center bg-regal-auth-bg-color">
            <img src={type === "phone" ? PhoneIcon : ChatIcon} alt="" />
          </div>
          <div className="md:w-3/4 px-8 py-14 ">
            {step === 1 && (
              <div className="w-full animate-fade-in">
                <h6 className="text-lg font-[700] text-regal-black">
                  {type === "phone"
                    ? "Phone Verification"
                    : "Email Verification"}
                </h6>
                <p className="text-sm mt-2 text-regal-light-gray">
                  To get started, enter your password to verify <br /> account
                  authorization
                </p>

                <div className="mt-8 col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                  >
                    Password
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
                          onClick={() =>
                            setData({ ...data, eyeOld: !data.eyeOld })
                          }
                        />
                      ) : (
                        <AiOutlineEye
                          size={20}
                          className="text-regal-light-gray"
                          onClick={() =>
                            setData({ ...data, eyeOld: !data.eyeOld })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-4 mt-8  justify-end">
                  <button
                    onClick={() => {
                      // Handle Close action here
                      props.setIsModalOpen(false);
                    }}
                    className=" text-regal-sky-blue text-sm py-[8px] px-4  border-2 border-white rounded-lg hover:border-regal-sky-blue transition font-[500] active:scale-95"
                  >
                    Back to Profile
                  </button>
                  <button
                    onClick={() => {
                      setStep(2);
                    }}
                    className="bg-regal-sky-blue text-white py-[8px] px-4 text-sm rounded-lg hover:bg-blue-900 transition active:scale-95"
                  >
                    Start Setup
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="w-full animate-fade-in">
                <h6 className="text-lg font-[700] text-regal-black">
                  Enter code
                </h6>
                <p className="text-sm mt-2 text-regal-light-gray">
                  {type === "phone"
                    ? `Enter the 6-digit code that was sent to 08099****23 to finish setting up the two-factor authentication`
                    : `Enter the 6-digit code that was sent to the email ti****es@gmail.com.`}
                </p>

                <div className="mt-8 col-span-2">
                  <label
                    htmlFor="otpcode"
                    className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
                  >
                    OTP code
                  </label>
                  <div className="mb-4 ">
                    <div className="flex flex-row gap-2">
                      {fields.map((propsField, index) => (
                        <input
                          key={index}
                          className="otp mb-3"
                          type="text"
                          oninput="digitValidate(this)"
                          {...propsField}
                          maxlength={1}
                          placeholder=""
                        />
                      ))}
                    </div>
                    <Timer
                      id={data}
                      registerInterval={registerInterval}
                      clearTimer={clearTimer}
                    />
                    {intervals.length == 0 ? (
                      <span className="text-sm text-regal-blue ">
                        Resend OTP
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="flex flex-row gap-4 mt-2  justify-end">
                  <button
                    onClick={() => {
                      // Handle Close action here
                      props.setIsModalOpen(false);
                    }}
                    className=" text-regal-sky-blue text-sm py-[8px] px-4  border-2 border-white rounded-lg hover:border-regal-sky-blue transition font-[500] active:scale-95"
                  >
                    Back to Profile
                  </button>
                  <button
                    onClick={() => {
                      setStep(3);
                    }}
                    className="bg-regal-sky-blue text-white py-[8px] px-4 text-sm rounded-lg hover:bg-blue-900 transition active:scale-95"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="w-full animate-fade-in">
                <h6 className="text-lg font-[700] text-regal-black">
                  Successful!
                </h6>
                <p className="text-sm mt-2 text-regal-light-gray">
                  Two-factor authentication has been successfully configured and
                  linked to your mobile device. You'll get an email with an
                  authentication code to enter when logging into
                </p>

                <div className="flex flex-row gap-4 mt-8  justify-end">
                  <button
                    onClick={() => {
                      // Handle Close action here
                      resetData();
                    }}
                    className="bg-regal-sky-blue text-white py-[8px] px-4 text-sm rounded-lg hover:bg-blue-900 transition active:scale-95"
                  >
                    Back to Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

function DisableVerification(props) {
  const [data, setData] = useState({
    passwordOld: "",
    email: "",
    phone: "",
    otp: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [type, setType] = useState("");

  useEffect(() => {
    setIsModalOpen(props.isModalOpen);
    setType(props.type);
  }, [props.isModalOpen, props.type]);
  function resetData() {
    props.setIsModalOpen(false);
    setData({
      passwordOld: "",
      email: "",
      phone: "",
      otp: 0,
    });
    props.ChangeTypeVerificationBoolen();
  }
  const dropdownaddRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownaddRef.current &&
        !dropdownaddRef.current.contains(event.target)
      ) {
        props.setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    isModalOpen && (
      <div
        className="fixed inset-0 bg-black w-full bg-opacity-75  z-50 flex justify-center items-center animated fadeInDown"
        ref={dropdownaddRef}
      >
        <div className="bg-white  flex flex-col md:flex-row rounded-lg shadow-lg md:w-[720px] overflow-hidden  ">
          <div className="md:h-[400px] md:w-2/4 flex flex-col items-center justify-center bg-regal-disable-red">
            <img src={CloseIcon} alt="" className="w-[150px]" />
          </div>
          <div className="md:w-3/4 px-8 py-14 ">
            <div className="w-full animate-fade-in">
              <h6 className="text-lg font-[700] text-regal-black">
                {type === "phone"
                  ? "Disable Phone Verification"
                  : "Disable Email Verification"}
              </h6>
              <p className="text-sm mt-2 text-regal-light-gray">
                Disabling this option will remove the two-factor authentication
                method from your phone. Are you sure you want to proceed?
              </p>

              <div className="flex flex-row gap-4 mt-8  justify-end">
                <button
                  onClick={() => {
                    resetData();
                  }}
                  className=" text-regal-sky-blue text-sm py-[8px] px-4  border-2 border-white  rounded-lg border-regal-sky-blue transition font-[500] active:scale-95"
                >
                  Yes Disable
                </button>
                <button
                  onClick={() => {
                    // Handle Close action here
                    props.setIsModalOpen(false);
                  }}
                  className="bg-regal-sky-blue text-white py-[8px] px-4 text-sm rounded-lg hover:bg-blue-900 transition active:scale-95"
                >
                  No, Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
export default PasswordAndSecurity;
