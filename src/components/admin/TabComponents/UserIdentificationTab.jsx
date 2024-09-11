import React, {useState} from 'react'
import IdentifyComponent from '../../Identification/IdentifyComponent'
function UserIdentificationTab() {
    const [interview, setInterview] = useState(false);
    const handleSet = () => {
        setInterview(false);
    }
  return (
    <div className='p-4 md:px-8 md:pt-8 pb-4 animate-fade-in'>
  <section className='max-w-[800px] '>
    <IdentifyComponent scheduleInterview={interview} handleSet={handleSet}/>
    {!interview && 
                <button
                onClick={()=>{
                    setInterview(true)
                }}
                className="inline-block px-8  py-2 md:py-3 mt-24 mb-8  text-[10px] md:text-xs text-white border-regal-sky-blue bg-regal-sky-blue rounded-sm cursor-pointer">
                  Schedule Interview
                    
                </button>
    }
    
  </section>
  </div>
  )
}

export default UserIdentificationTab