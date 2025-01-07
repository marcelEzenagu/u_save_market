import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const useErrorMessageHooks = () => {
  const [errorMessagesList, setErrorMessagesList] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleErrorMessagesList = (key) => {
  //   if (errorMessagesList[0]?.field) {
  //     let message = errorMessagesList.filter((e) =>
  //       e?.field.toLowerCase().includes(key.toLowerCase())
  //     );
  //     return (
  //       <div className="mt-2">
  //         {message.map((e) => (
  //           <p className="text-red-600 text-xs" key={e}>
  //             {e?.message.replaceAll('Path ', '').replaceAll('`', '')}
  //           </p>
  //         ))}
  //       </div>
  //     );
  //   } else if (typeof errorMessagesList === 'string') {
  //     return (
  //       <div className="mt-2">
  //         <p className="text-red-600 text-xs">
  //           {errorMessagesList.toLowerCase().includes(key.toLowerCase()) &&
  //             errorMessagesList.replaceAll(',', ' ')}
  //         </p>
  //       </div>
  //     );
  //   } else {
  //     let message = errorMessagesList.filter((e) =>
  //       e.toLowerCase().includes(key.toLowerCase())
  //     );
  //     return (
  //       <div className="mt-2">
  //         {message.map((e) => (
  //           <p className="text-red-600 text-xs" key={e}>
  //             {e}
  //           </p>
  //         ))}
  //       </div>
  //     );
  //   }
  // };

  const handleErrorMessagesList = (key) => {
    // Check if errorMessagesList is an array of objects with a "field" key
    if (Array.isArray(errorMessagesList) && errorMessagesList[0]?.field) {
      console.log("handleErrorMessagesList1 ")
      let message = errorMessagesList.filter((e) =>
        e?.field.toLowerCase().includes(key.toLowerCase())
      );
      return (
        <div className="mt-2">
          {message?.map((e, index) => (
            <p className="text-red-600 text-xs" key={index}>
              {e?.message.replaceAll('Path ', '').replaceAll('`', '')}
            </p>
          ))}
        </div>
      );
    }
    // Check if errorMessagesList is a string
    else if (typeof errorMessagesList === 'string') {

      console.log("handleErrorMessagesList2 ")

      return (
        <div className="mt-2">
          <p className="text-red-600 text-xs">
            {errorMessagesList.toLowerCase().includes(key.toLowerCase()) &&
              errorMessagesList.replaceAll(',', ' ')}
          </p>
        </div>
      );
    }
    // Handle case where errorMessagesList is an array of strings
    else if (Array.isArray(errorMessagesList)) {
      
      // if(errorMessagesList.length){
      //   let message = errorMessagesList?.filter((e) =>
      //     e.toLowerCase().includes(key.toLowerCase())
      // );
      // console.log("handleErrorMessagesList3 ",errorMessagesList)
      // console.log("handleErrorMessagesList3message ",message)
        return (
          <div className="mt-2">
            {errorMessagesList?.map((e, index) => (
              <p className="text-red-600 text-xs" key={index}>
                {e}
              </p>
            ))}
          </div>
        );

      // }
    }
    // Default case: Render nothing if none of the conditions match
    return null;
  };
  

  const handleError = (err, name) => {
    console.log("entere",err)

    if (err?.status >= 400 && err?.status < 500) {
      console.log("entere 1")
      setErrorMessagesList(err?.data?.message || []);
      setErrMsg(err?.data?.message);
    } else if (err?.status >= 500) {
      console.log("entere 2")
      setErrMsg(name + ' failed');
    } else {
      console.log("entere 3")
      setErrMsg(name + ' failed');
    }
  };

  const handleChange = (e) => {
    
    const newData = Object.assign({}, data, {
      [e.target.name]: e.target.value,
    });

    setData(newData);
  };

  return {
    errorMessagesList,
    setErrorMessagesList,
    handleErrorMessagesList,
    setErrMsg,
    errMsg,
    handleError,
    handleChange,
    navigate,
    dispatch,
    setData,
    data,
  };
};

export default useErrorMessageHooks;
