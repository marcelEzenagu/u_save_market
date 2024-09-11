import React, {useState} from 'react'

function useErrorMessageHooks() {
    const [errorMessagesList, setErrorMessagesList] = useState([]);
    const handleErrorMessagesList = (key) => {
        if (errorMessagesList[0]?.field) {
          let message = errorMessagesList.filter((e) =>
            e?.field.toLowerCase().includes(key.toLowerCase())
          );
          return (
            <div className="mt-2">
              {message.map((e) => (
                <p className="text-red-600 text-xs" key={e}>
                  {e?.message.replaceAll("Path ", "").replaceAll("`", "")}
                </p>
              ))}
            </div>
          );
        } else if (typeof errorMessagesList === "string") {
          return (
            <div className="mt-2">
              <p className="text-red-600 text-xs">
                {errorMessagesList.toLowerCase().includes(key.toLowerCase()) &&
                  errorMessagesList.replaceAll(",", " ")}
              </p>
            </div>
          );
        } else {
          let message = errorMessagesList.filter((e) =>
            e.toLowerCase().includes(key.toLowerCase())
          );
          return (
            <div className="mt-2">
              {message.map((e) => (
                <p className="text-red-600 text-xs" key={e}>
                  {e}
                </p>
              ))}
            </div>
          );
        }
      };
       
  return [
    errorMessagesList,
    setErrorMessagesList,
    handleErrorMessagesList,
  ];
}

export default useErrorMessageHooks