import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { MockData } from '../../data/mockData';
import { useLocation } from 'react-router-dom';
function SidebarMobile() {
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
        <div className='mt-3 lg:hidden'>
          <div className='overflow-x-scroll'>
            
          <div className='flex flex-row items-start '>
              {data && data.map((e)=> (
                      <div key={e.id}>
                      <div className={`flex items-center w-full rounded-md my-1 py-1 p-2 gap-2 hover:bg-active-gray  ${active === e.name.toLowerCase() && 'bg-active-gray'}`}
                      onClick={()=> {
                          setActive(e.name.toLowerCase())
                      }}
                      >
                          {/* <img src={e.image} alt="" className='w-6 h-6'/> */}
                          <Link to={`/products?name=${e.name.toLowerCase()}`} className='text-sm capitalize font-[600] p-1 mr-4 whitespace-nowrap'>{e.name}</Link>
                      </div>
  
                  </div>
              ))}
              </div>  
          </div>    
          <div className='overflow-x-scroll'>
          <div className='flex flex-row items-start'>
              {MockData?.length > 0  ?  MockData?.map((i) => (
                              <div key={i.id} className='flex items-center p-2 gap-2'>
                                   <div  alt="" className='w-6 h-6'></div>
                              <Link to={`/products?name=${i.name}`} className='text-sm capitalize font-[400]  truncate whitespace-nowrap '>{i.name}</Link>
                          </div>
                      )) : ''}
              </div>
          </div>
      </div>
    ) 
}
function DefaultSidebar ({name}) 
{
    const [active, setActive] = useState(null);
    const [activeSub, setActiveSub] = useState([]);
    useEffect(()=>{
        const findData = MockData.filter((e)=> e.name?.toLowerCase() === name?.toLowerCase())
        if(findData) {
            setActive(findData[0]?.id)
            setActiveSub(findData[0]?.subcat)
        }
    }, [name]);

    useEffect(()=>{
        if(active) {
            const findData = MockData.filter((e)=> e.id === active);
            setActiveSub(findData[0]?.subcat)
        }
    }, [active])

    return (
      <div className='mt-3 lg:hidden'>
          <div className='overflow-x-scroll'>
              <div className='flex flex-row items-start '>
              {MockData && MockData.map((e)=> (
                      <div key={e.id}>
                      <div className={`flex items-center w-full rounded-md my-1 py-1 p-2 gap-2 hover:bg-active-gray ${active === e.id && 'bg-active-gray'}`}
                      onClick={()=> {
                          setActive(e.id)
                      }}
                      >
                          <img src={e.image} alt="" className='w-6 h-6'/>
                          <Link to={`/products?name=${e.name}`} className='text-sm capitalize font-[600] min-w-[100px]  truncate whitespace-nowrap'>{e.name}</Link>
                      </div>
                  </div>
              ))}
              </div>  
          </div>    
          <div className='overflow-x-scroll'>
          <div className='flex flex-row items-start'>
              {activeSub?.length > 0  ?  activeSub?.map((i) => (
                              <div key={i.id} className='flex items-center p-2 gap-2'>
                                   <div  alt="" className='w-6 h-6'></div>
                              <span className='text-sm capitalize font-[400]  truncate whitespace-nowrap '>{i.name}</span>
                          </div>
                      )) : ''}
              </div>
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

export default SidebarMobile