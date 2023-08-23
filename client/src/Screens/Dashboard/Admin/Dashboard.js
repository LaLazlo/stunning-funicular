import React, { useEffect } from 'react';
import Banner from '../Banner';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../SideBar';
import Card from '../Card';
import { getAssignedMejsAction } from '../../../Redux/Actions/userActions';
import { toast } from 'react-hot-toast';

function Dashboard() {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin) || {};

  const { isError, isSuccess, Assigned_MEJs } = useSelector((state) => state.userGetAssignedMejs) || {};

  useEffect(() => {
    dispatch(getAssignedMejsAction());
    
    if (isError) {
      toast.error(isError);
      dispatch({ type: "GET_ASSIGNED_MEJ_RESET" });
    }
  }, [dispatch, isError, isSuccess]);

  const assignedMejsCount = Assigned_MEJs ? Assigned_MEJs.length : 0;

  return (
    <div className="flex">
      <Sidebar isAdmin={userInfo?.isAdmin} />
      <div className="flex-1 flex flex-col p-4">
        {userInfo && (
          <Banner fullName={userInfo.fullName} />
        )}
        {!userInfo?.isAdmin && (
          <div className="w-full md:w-1/3 mt-2 md:mt-4">
            <Card assignedtask={assignedMejsCount} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
