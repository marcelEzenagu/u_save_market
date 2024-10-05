
import { useState } from 'react';
export function useProfileUploadHooks() {
    const [base64String, setBase64String] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [error, setError] = useState("");

    const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB in bytes
    const clearData = () => {
      setBase64String("");
      setUploadStatus("");
      setError("");
      setImagePreview("");
    }
    const handleFileChange = (event) => {
      setError("");
        const file = event.target.files[0]; // Get the selected file
        try {
          if (!file) {
            setError('No file selected');
            return;
          }
          if (file.size > MAX_FILE_SIZE) {
            setError('File size exceeds the 2GB limit. Please choose a smaller file.');
          }
          if (file) {
            const reader = new FileReader();
           
            // Define the callback for when the file is read
            reader.onloadend = () => {
              const base64String = reader.result; // Get the base64 string     
              setBase64String(base64String);
              setImagePreview(base64String); // Set image preview
              setUploadStatus("")
            };
            // Read the file as a Data URL (which contains the base64 string)
            reader.readAsDataURL(file);
          }
          
        } catch (error) {
          console.log(error);
          setError('something went wrong selecting your image.', error);
        }

      };
  return {
    base64String,
    imagePreview,
    error,
    setError,
    uploadStatus,
    handleFileChange,
    clearData,
  }
}

export default useProfileUploadHooks