import React from 'react'

function Status(key) {
    switch (key?.status) {
        case 'ACCEPTED':
            return  <div className='py-1 px-4 text-xs md:text-sm rounded-sm text-orange-500 bg-orange-200'>Accepted</div>

            case 'CANCELLED':
                return  <div className='py-1 px-4 text-xs md:text-sm rounded-sm text-red-500 bg-red-200'>Cancelled</div>
        default:
            return  <div className='py-1 px-5 text-xs   rounded-sm text-orange-400 bg-orange-200'>Accepted</div>
    }

}

export default Status