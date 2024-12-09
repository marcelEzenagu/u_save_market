import { Link } from "react-router-dom";
import vendorImage from "../../assets/images/nav/icons/vendor.png"
import agentImage from "../../assets/images/nav/icons/agent.png"
import { useSelector } from "react-redux";
const BottomLinks =() => {
const user = useSelector((state) => state?.auth?.user);
    return (
        <div className='flex flex-col gap-3'>
            {!user &&
             <>
                 <Link  to="/vendor/home" className='font-[500] text-xs text-regal-gray-active'>
                 <div className="flex items-center" >
                 <img src={vendorImage}  className='w-10 h-10 pr-2' />
                 Become a Vendor
             </div>
                 </Link>

                 <Link  to="/agent/login" className='font-[500] text-xs text-regal-gray-active'>
                 
                 
                 <div className="flex items-center" >
                    <img src={agentImage}  className='w-10 h-10 pr-2'  />
                    Become a Agent
                </div>
                 </Link>
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