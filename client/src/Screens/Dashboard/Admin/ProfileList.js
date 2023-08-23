import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Sidebar from '../SideBar'
import UsersTable from '../../../Components/UsersTable'
import  toast  from 'react-hot-toast'
import { deleteUserAction, getAllUsersAction } from '../../../Redux/Actions/userActions'
import { Empty } from '../../../Components/Notifications/Empty'



function ProfileList() {

  const dispatch = useDispatch();

  const {isLoading, isError, users} = useSelector(state => state.adminGetAllusers);

  const { userInfo } = useSelector((state) =>state.userLogin);

  const { isError: deleteError} = useSelector(state => state.adminDeleteUser);

  const deleteUserHandler = (id) =>{
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur")) {
      dispatch(deleteUserAction(id));
    }
  };


  useEffect(() =>{
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" });
    }
  }, [dispatch, isError, deleteError]);




  return (
    <div className="app-container flex">
      <Sidebar isAdmin={userInfo?.isAdmin}/>

      <div className="px-4 py-8">
        <div className=" py-2">
          <h2 className='text-xl font-bold text-gray-800'>Liste des utilisateurs</h2>
        </div>

        <div className=" gap-4 mt-4">
        {
            isLoading ?(
              <p>Chargement...</p>) : users?.length > 0 ? (
                <UsersTable data={users} users={true} onDeleteFunction={deleteUserHandler} />
              ) : (
                <Empty message={"Aucun utilisateur trouvé"}/>
              )
          }
          
        
        </div>
      </div>
    </div>
  )
}

export default ProfileList
