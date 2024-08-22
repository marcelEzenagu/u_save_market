import React from 'react'

function Status(key) {
    switch (key) {
        case 'accepted':
            return  <div className='py-1 px-4 text-xs md:text-sm rounded-md text-orange-500 bg-orange-200'>Accepted</div>
        default:
            return  <div className='py-1 px-5 text-xs   rounded-sm text-orange-400 bg-orange-200'>Accepted</div>
    }

}

export default Status