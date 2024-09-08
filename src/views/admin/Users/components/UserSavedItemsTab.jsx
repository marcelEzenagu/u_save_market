import EmptyBag from '../../../../assets/images/account/empty.png'
import { Items } from '../../../../data/mockData'
import UserSavedCard from '../../../../components/cards/UserSavedCard'
function UserSavedItemsTab() {
  return (
    <div className='p-4'>
       <h6 className='text-regal-black text-sm md:text-xl font-bold'>Saved Items</h6>
            {Items.length > 0 ? 
            (
                <div className='grid grid-cols-2 md:grid-col-5 lg:grid-cols-5 2xl:grid-cols-7'>
                    {Items.map((e)=> (
                        <UserSavedCard item={e} key={e?.id}/>
                    ))}
                </div>
            ): 
            (
                <div className=" p-14   rounded-lg mx-auto max-w-[400px] text-center">
                <img src={EmptyBag} alt=""  className="text-center my-3 mx-auto"/>
        
                    <h6 className="text-regal-black text-sm mt-4 mb-6 font-[700]"> 
                      This User Doesn't have any saved Item
                    </h6>
                  </div>
            )}
    </div>
  )
}

export default UserSavedItemsTab