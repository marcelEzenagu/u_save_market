import React, { useEffect, useState } from "react";
  import { Timer } from "../../../../components/Timer"
  import { usePinInput } from "react-pin-input-hook"
  import {useErrorMessageHooks} from "../../../../hooks/useErrorMessageHooks";
  import { useVerifyOtpUserMutation, useForgotPasswordUserMutation } from "../../../../features/auth/authApiSlice";
const OtpModal = ({handleToggle, verifiedDetails, setVerifiedDetails}) => {
    const [intervals, setIntervals] = useState([]);
    const [verifyOtpUser, {isLoading}] = useVerifyOtpUserMutation()
    const [resetPasswordUser, { isLoading: loading }] = useForgotPasswordUserMutation();
      const {
       setErrorMessagesList,
       handleErrorMessagesList,
       setErrMsg,
       errMsg,
       handleError,
       setData,
       data,
       } = useErrorMessageHooks();
       const registerInterval = (id) => {
       setIntervals(intervals.concat([id]));
     };
     useEffect(()=>{
      console.log(verifiedDetails);
      if (!verifiedDetails?.email || !verifiedDetails?.requestID){
        handleToggle('login');
      }
     }, [verifiedDetails])
   
     const { fields } = usePinInput({
       onComplete: OTP => {
           setData(OTP)
       },
     })
     const clearTimer = () => {
       setIntervals([]);
     };

     const handleResendOtp = async () => {

      setErrMsg("");
      setErrorMessagesList([]);
      try {
        const userData = await resetPasswordUser({email : verifiedDetails?.email}).unwrap();
        setVerifiedDetails({...verifiedDetails, requestID : userData?.requestID});
      }catch (err) {
       console.log(err);
       handleError(err, 'OTP');
    }
    }
   
     const handleSubmit = async (e) => {
       e.preventDefault()
       setErrMsg("");
       setErrorMessagesList([]);
       try {
         const {access_data} = await verifyOtpUser({ otp : data, requestID : verifiedDetails?.requestID, email: verifiedDetails?.email}).unwrap();
         console.log(access_data?.access_token);
         setVerifiedDetails({...verifiedDetails, token: access_data?.access_token })
         handleToggle('Reset Password')
       }catch (err) {
        console.log(err);
        handleError(err, 'OTP');
     }
    }
 
       return (
         <div className="max-w-[400px]">
                  <p className="text-start text-xs md:text-sm text-regal-light-gray mb-8 font-[400]">
             A reset PIN has been sent to your email {verifiedDetails?.email}
             </p>
   
               <div className="mb-3 col-span-2 md:mx-2">
               <div className="flex flex-row gap-2">
                   {fields.map((propsField, index) => (
                 <input
                   key={index}
                   className="otp mb-3"
                   type="text"
                   onInput="digitValidate(this)"
                   {...propsField}
                   maxLength={1}
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
               <p className="text-sm mt-4">
                 Didn’t receive the code?{" "}
                 <button className="text-sm text-regal-blue "
                   onClick={handleResendOtp}
                  type="button"
                  disabled={loading}

                 >
                   {loading ? 'sending Otp...': 'Send again'}
                 </button>
               </p>
             ) : (
               ""
             )}
             {handleErrorMessagesList('otp')}
               </div>
   
               <p className="text-red-600 text-xs">{errMsg && errMsg}</p>
               <div className="w-full ">
               <button  className="w-full bg-regal-blue text-white font-semibold py-2 rounded-full"
               type="submit"
               disabled={isLoading}
               onClick={handleSubmit}
               >
                    {isLoading ? 'Confirming...' : 'Confirm PIN'}
                 </button>
               </div>
         </div>
      
       )
   }
   

export default OtpModal