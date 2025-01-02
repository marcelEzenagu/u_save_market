
import React from 'react'

function Card({data}) {
  return (
    <div className='flex'>
        <p className=''>
            <span className='flex'>
                <div>Icon</div>
                <div className='px-1'>{data.createdAt}</div>
            </span>
            <span>
                {data.title}
            </span>
            <span>
                {data.content}
            </span>
            <span>Read More </span>
            
        </p>
        <div>
            <img 
                src={`${data.image}`}
            />
        </div>
    
    </div>
  )
}

export default Card