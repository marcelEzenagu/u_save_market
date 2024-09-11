import React, {useEffect, useState,useMemo} from 'react'
import { Link } from 'react-router-dom';
import { MockData } from '../../data/mockData';
import { useLocation } from 'react-router-dom';
import BottomLinks from './BottomLinks';
function Sidebar() {
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const name = query.get('name');

    const [activeTab, setActiveTab] = useState(false);
    useEffect(()=>{
        if (name != '') {
         const findData = data.filter((e)=> e?.name?.toLowerCase() === name?.toLowerCase())
        if(findData.length > 0) {
            setActiveTab(true)
        }else{
            setActiveTab(false)
        }
    }else{
        setActiveTab(false)
    }
    }, [name]);
 return (
    <>
    {activeTab ? <FilterSider name={name}/>: <DefaultSidebar name={name}/>}
        
    </>
 );
}

const FilterSider = ({name}) => {
    const [active, setActive] = useState(name);
    useEffect(()=>{
        const findData = data.filter((e)=> e.name?.toLowerCase() === name?.toLowerCase())
        if(findData) {
            setActive(name)
        }
    }, [name]);
    return (
      <div>
          <div>
              <h5 className="text-md font-[700] mb-2 capitalize">{name}</h5>
              <div className='flex flex-col items-start mb-16'>
              {data && data.map((e)=> (
                      <div key={e.id}>
                      <div className={`flex items-center w-full rounded-md my-1 py-1 p-2 gap-2 hover:bg-active-gray  ${active === e.name.toLowerCase() && 'bg-active-gray'}`}
                      onClick={()=> {
                          setActive(e.name.toLowerCase())
                      }}
                      >
                          {/* <img src={e.image} alt="" className='w-6 h-6'/> */}
                          <Link to={`/products?name=${e.name.toLowerCase()}`} className='text-sm capitalize font-[600] w-[180px] truncate whitespace-nowrap'>{e.name}</Link>
                      </div>
                      {MockData.length > 0 && active === e.name.toLowerCase() ?  MockData.map((i) => (
                              <div key={i.id} className='flex items-center p-2 gap-2'>
                                   <div  alt="" className='w-6 h-6'></div>
                              <span className='text-sm capitalize font-[400] w-[180px] truncate whitespace-nowrap '>{i.name}</span>
                          </div>
                      )) : ''}
                  </div>
              ))}
              </div>  
             <BottomLinks/>
          </div>    
      </div>
    ) 
}
function DefaultSidebar ({name}) 
{
    const [active, setActive] = useState(null);
    useEffect(()=>{
        const findData = MockData.filter((e)=> e.name?.toLowerCase() === name?.toLowerCase())
        if(findData) {
            setActive(findData[0]?.id)
        }
    }, [name]);
    return (
      <div>
          <div>
              <h5 className="text-md font-[700] mb-2">CATEGORIES</h5>
              <div className='flex flex-col items-start mb-16'>
              {MockData && MockData.map((e)=> (
                      <div key={e.id}>
                      <div className={`flex items-center w-full rounded-md my-1 py-1 p-2 gap-2 hover:bg-active-gray ${active === e.id && 'bg-active-gray'}`}
                      onClick={()=> {
                          setActive(e.id)
                      }}
                      >
                          <img src={e.image} alt="" className='w-6 h-6'/>
                          <Link to={`/products?name=${e.name}`} className='text-sm capitalize font-[600] w-[180px] truncate whitespace-nowrap'>{e.name}</Link>
                      </div>
                      {e?.subcat?.length > 0 && active === e.id ?  e.subcat.map((i) => (
                              <div key={i.id} className='flex items-center p-2 gap-2'>
                                   <div  alt="" className='w-6 h-6'></div>
                              <span className='text-sm capitalize font-[400] w-[180px] truncate whitespace-nowrap '>{i.name}</span>
                          </div>
                      )) : ''}
                  </div>
              ))}
              </div>  
             <BottomLinks/>
          </div>    
      </div>
    ) 
}

const data = [
    {
      id:'1',
      name:'Recommended',
    },
    {
      id:'2',
      name:'Bestsellers',
    },
    {
      id:'3',
      name:'New arrivals',
    },
    {
      id:'4',
      name:'  Deals ',
    }
  ]

export default Sidebar