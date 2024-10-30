import React from 'react'

function UserStatus(props) {
    let key = props?.status?.toLowerCase() 
    switch (key) {
        case 'verified':
            return (
                <span
                    className={`inline-block px-2 py-1 text-xs  text-green-500 rounded-full bg-green-100`}
                >
                     verified
                </span>
            )
        default:
            return (
                <span
                    className={`inline-block px-2 py-1 text-xs  text-red-500 rounded-full bg-red-100`}
                >
                     pending
                </span>
              )
    }
  
}

export default UserStatus