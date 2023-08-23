import React, { useEffect } from 'react'
import Table from '../../Components/Table'
import { useDispatch, useSelector } from 'react-redux';
import { deleteAssignedMejsAction, getAssignedMejsAction } from '../../Redux/Actions/userActions';
import { toast } from 'react-hot-toast';
import Sidebar from './SideBar';
import {Empty} from '../../Components/Notifications/Empty';

function AssignedMEJs() {

  const dispatch = useDispatch();

  const {isLoading, isError, Assigned_MEJs} = useSelector(state => state.userGetAssignedMejs);

  const {isLoading: deleteLoading, isError: deleteError, isSuccess} = useSelector(state => state.userDeleteAssignedMejs);

  const deleteMejsHandler = () =>{
    window.confirm("Êtes-vous sûr de vouloir supprimer tous les fichiers MEJs?") &&
    dispatch(deleteAssignedMejsAction());
  }



  useEffect(() =>{
    dispatch(getAssignedMejsAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({type: isError ? "GET_ASSIGNED_MEJ_RESET" : "DELETE_FAVORITE_MOVIES_RESET" });
    }
  }, [dispatch, isError, deleteError, isSuccess]);


  return (
<div className="app-container flex">
      <Sidebar />
      <div className="px-4 py-8">
        <div className="py-2 flex items-center">
          <h2 className='text-xl font-bold text-gray-800'>Tâches attribuées</h2>
          {
            <button disabled={deleteLoading} onClick={deleteMejsHandler} type="submit" className="ml-4 px-3 py-4 text-white bg-red-600 rounded-full">{isLoading ? ("Chargement...") : ("Tout effacer")}</button>
          }
        </div>

        <div className=" gap-4 mt-4">
          
        {
            isLoading ?(
              <p>Chargement...</p>) : Assigned_MEJs.length > 0 ? (
              <Table data={Assigned_MEJs} admin={true} />
              ) : (
                <Empty message={"Aucun MEJ attribué trouvé"}/>
              )
          }
        </div>
      </div>
    </div>
    )
}

export default AssignedMEJs
