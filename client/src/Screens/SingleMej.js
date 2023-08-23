import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MejInfo from '../Components/Single/MejInfo';
import Sidebar from './Dashboard/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import { getAllMejsAction, getMejByIdAction } from '../Redux/Actions/MejsActions';


function SingleMej() {

    const {id} = useParams(); 

    const dispatch = useDispatch();



  const { isError } = useSelector(state => state.getAllMejs);
  const {mej} = useSelector(state => state.getMejById);

  
  const { userInfo } = useSelector((state) =>state.userLogin);



   useEffect(() =>{
    dispatch(getAllMejsAction());
    dispatch(getMejByIdAction(id));
    if(isError){
      toast.error(isError);
    }
  }, [dispatch, isError]);




    



    









  return (
    <div className="app-container flex">
      <Sidebar isAdmin={userInfo?.isAdmin}/>
      <MejInfo mej={mej} />
    </div>
  )
}

export default SingleMej
