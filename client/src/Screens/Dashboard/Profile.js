import React, { useEffect } from 'react'
import Sidebar from './SideBar'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notifications/Error';
import { Input } from '../../Components/UsedInputs';
import { deleteProfileAction, updateProfileAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast'

function Profile() {



  const dispatch = useDispatch();

  
  const { userInfo } = useSelector((state) =>state.userLogin);
  const { isLoading, isError, isSuccess } = useSelector((state) =>state.userUpdateProfile);
  const { isLoading: deleteLoading, isError:deleteError } = useSelector((state) =>state.userDeleteProfile);



  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(ProfileValidation)
  })

  const onSubmit = (data) =>{
    dispatch(updateProfileAction({...data}));
  };

  useEffect(() =>{
    if(userInfo){
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if(isSuccess){
        dispatch({type: "USER_UPDATE_PROFILE_RESET"})
    }
    if(isError || deleteError){
        toast.error(isError || deleteError);
        dispatch({type: "USER_UPDATE_PROFILE_RESET"})
        dispatch({type: "USER_DELETE_PROFILE_RESET" });
    }
    
  }, [userInfo, setValue, isSuccess, isError, dispatch, deleteError]);



  return (
    <div className="app-container flex">
      <Sidebar isAdmin={userInfo?.isAdmin}/>
      <div className="px-4 py-8">
        <div className=" py-2">
          <h2 className='text-xl font-bold text-gray-800'>Modifier le profil</h2>
        </div>
        <div className="gap-4 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container p-3'>


            <div className='w-full'>
              <Input label="Full Name" placeholder="Entrez votre nom complet" type="text" name="fullName" register={register("fullName")} />
              {
                errors.fullName && <InlineError text={errors.fullName.message}/>
              }
            </div>


            <div className='w-full'>
              <Input label="Email" placeholder="Entrer votre Email" type="email" name="email" register={register("email")} />
              {
                errors.email && <InlineError text={errors.email.message}/>
              }
            </div>


            <div className="mt-6">
                <button disabled={isLoading || deleteLoading} type="submit" className="mb-4 w-full px-3 py-4 text-white bg-sky-600 rounded-full">{isLoading ? ("Chargement...") : ("Modifier")}</button>
            </div>

            
        </div>
      </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
