import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Sidebar from '../SideBar'
import Table2 from '../../../Components/Table2'
import { toast } from 'react-hot-toast'
import { getAllMejsAction } from '../../../Redux/Actions/MejsActions'
import { Empty } from '../../../Components/Notifications/Empty'




function MovieList() {

  const dispatch = useDispatch();

  const {isLoading, isError, mejs} = useSelector(state => state.getAllMejs);
  
  const { userInfo } = useSelector((state) =>state.userLogin);


  const addmejredirect = () => {
    window.location.href = '/addtask';
  };


   useEffect(() =>{
    dispatch(getAllMejsAction());
    if(isError){
      toast.error(isError);
    }
  }, [dispatch, isError]);
  



  return (
    <div className="app-container flex">
      <Sidebar isAdmin={userInfo?.isAdmin}/>
      <div className="px-4 py-8">
      <div className="py-2 flex items-center">
          <h2 className='text-xl font-bold text-gray-800'>Liste des MEJ {mejs?.length}</h2>
          {
            <button onClick={addmejredirect} className="ml-4 px-3 py-4 text-white bg-sky-600 rounded-full">Add MEJ</button>
          }
        </div>
        

        <div className=" gap-4 mt-4">

        {
            isLoading ?(
              <p>Chargement...</p>) : mejs?.length > 0 ? (
                <Table2 data={mejs} admin={userInfo?.isAdmin} />
                ) : (
                <Empty message={"Aucun MEJ trouvé"}/>
              )
          }
          
        </div>
      </div>
    </div>
  )
}

export default MovieList
