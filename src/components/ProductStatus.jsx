import moment from 'moment'
import React from 'react'

function ProductStatus({item}) {

    function isCreatedWithinLastMonth(item) {
        // Check if the created_at date is within the last month
        return moment(item?.created_at).isAfter(moment().subtract(1, 'months'));
      }
      let value = null;
    if ( item?.in_stock === true && item?.percentageOFF !== null) {
        value =  'discount';
    }else if (item?.in_stock === false) {
        value =  'sold_out';
    }else if ( isCreatedWithinLastMonth(item) ) {
        value =  'new';
    }
    switch (value) {
  
              case 'sold_out':
                return <div className="absolute top-2 left-2 flex space-x-2 ">
                <button className="px-2 py-1 text-xs font-[500] shadow-md text-white bg-black border-2 border-black rounded-md">
                   SOLD OUT
                </button>
              </div> 
                    case 'discount':
                        return <div className="absolute top-2 left-2 flex space-x-2 ">
                        <button className="px-2 py-1 text-xs font-[500] shadow-md text-white bg-red-700 border-2 border-black rounded-md">
                          {item?.percentageOFF} OFF
                        </button>
                      </div>  
                      
                      case 'new':
                        return <div className="absolute top-2 left-2 flex space-x-2 ">
                        <button className="px-2 py-1 text-xs font-[500] shadow-md text-white bg-green-700 border-2 border-black rounded-md">
                            New
                        </button>
                      </div> 
        default:
            break;
    }
}

export default ProductStatus