import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const BottomLinks =() => {
const user = useSelector((state) => state?.auth?.user);
    return (
        <div className='flex flex-col gap-3'>
            {!user &&
             <>
                 <Link  to="/vendor/dashboard/home" className='font-[500] text-xs text-regal-gray-active'>Vendor</Link>
                 <Link  to="/agent/login" className='font-[500] text-xs text-regal-gray-active'>Agent</Link>
            </>
            }
            <Link className='font-[500] text-xs text-regal-gray-active'>About Us</Link>
            <Link className='font-[500] text-xs text-regal-gray-active'>Help Centre</Link>
            <Link className='font-[500] text-xs text-regal-gray-active'>Privacy</Link>
            <Link className='font-[500] text-xs text-regal-gray-active'>Terms & Conditions</Link>
        </div>
    );
}
export default BottomLinks;