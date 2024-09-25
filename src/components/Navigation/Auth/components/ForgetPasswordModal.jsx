
import {
    useForgotPasswordUserMutation
  } from "../../../../features/auth/authApiSlice";
  import { useErrorMessageHooks } from "../../../../hooks/useErrorMessageHooks";
  
const ForgetPasswordModal = ({handleToggle, onClose, setVerifiedDetails }) => {

  const {
    setErrorMessagesList,
    handleErrorMessagesList,
    handleError,
    handleChange,
    setErrMsg,
    errMsg,
    data, 
    setData,
  } = useErrorMessageHooks();
    const [resetPasswordUser, { isLoading }] = useForgotPasswordUserMutation();
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrMsg("");
      setErrorMessagesList([]);
   
      try {
        const userData = await resetPasswordUser({email : data?.email}).unwrap();
        console.log(userData);
        setVerifiedDetails(
          {
            email : data?.email,
            requestID : userData?.requestID
            
          });
        setData({
          email: "",
        });
        handleToggle("Enter OTP");
      } catch (err) {
        console.log(err);
        handleError(err, "Forget Password");
      }
    };
  
    return (
      <div className="max-w-[400px]">
        {/* Description Text */}
        <p className="text-start text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
          These things happen all the time. Please enter the email or phone number
          used to create your account.
        </p>
  
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3 col-span-2">
            <label
              htmlFor="Email"
              className="block text-xs md:text-[12px] font-[400]  leading-6 mb-2 text-regal-black"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={data.email}
              placeholder="Enter Email"
              className="w-full p-4 text-xs md:text-[12px] border font-[300] focus:outline-regal-blue rounded-lg bg-transparent text-regal-black"
            required
            />
            {handleErrorMessagesList("email")}
          </div>
  
          <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
          <div className="w-full flex flex-col gap-4 mt-3">
          <button
            className="w-full bg-regal-blue text-white font-semibold py-2 rounded-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Verifying Email..." : "Send PIN"}
            </button>

            <button
                          className="block  text-regal-sky-blue text-xs w-full py-2 rounded-full"
              type="button"
              onClick={() => {
                handleToggle("login");
              }}
            >
              Back
            </button>
  
       
          </div>
        </form>
      </div>
    );
  };
export default ForgetPasswordModal