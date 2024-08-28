import { FaPizzaSlice, FaHamburger, FaIceCream } from 'react-icons/fa';
const LoadingScreen = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="flex flex-row items-center justify-center space-x-4 animate-bounce">
            <FaPizzaSlice className="text-6xl text-yellow-500" />
            <FaHamburger className="text-6xl text-orange-600" />
            <FaIceCream className="text-6xl text-pink-500" />
          </div>
          <p className="mt-4 text-sm font-semibold text-gray-700">
            Cooking up something delicious...
          </p>
        </div>
      </div>
    );
  };

  export default LoadingScreen