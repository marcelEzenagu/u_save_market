import React from 'react'

function OrderVendorStatus(props) {
    let key = props?.status?.toLowerCase() 
    switch (key) {
        case 'processing':
            return (
                <span
                    className={`inline-block px-2 py-1 text-xs  text-regal-sky-blue rounded-full bg-regal-secondary-light`}
                >
                     processing
                </span> );
        case 'accepted':
            return (
                <span
                    className={`inline-block px-2 py-1 text-xs  text-regal-sky-blue rounded-full bg-regal-secondary-light`}
                >
                     accepted
                </span> );
        case  'new':
            return (
                <span
                    className={`inline-block px-2 py-1 text-xs  text-green-500 rounded-full bg-green-100`}
                >
                     new
                </span> );
                        case  'inactive':
                            return (
                                <span
                                    className={`inline-block px-2 py-1 text-xs  text-black rounded-full bg-gray-100`}
                                >
                                     new
                                </span> );
        default:
            return (
                <span
                    className={`inline-block px-2 py-1 text-xs  text-red-500 rounded-full bg-red-100`}
                >
                     failed
                </span>
              )
    }
  
}

export default OrderVendorStatus