import { Link } from "react-router-dom";
const BottomLinks =() => {
    return (
        <div className='flex flex-col gap-3'>
        <Link  to="/vendor/dashboard/home" className='font-[500] text-xs text-regal-gray-active'>Vendor</Link>
        <Link  to="/agent/onboarding" className='font-[500] text-xs text-regal-gray-active'>Agent</Link>
            <Link className='font-[500] text-xs text-regal-gray-active'>About Us</Link>
            <Link className='font-[500] text-xs text-regal-gray-active'>Help Centre</Link>
            <Link className='font-[500] text-xs text-regal-gray-active'>Privacy</Link>
            <Link className='font-[500] text-xs text-regal-gray-active'>Terms & Conditions</Link>
        </div>
    );
}
export default BottomLinks;