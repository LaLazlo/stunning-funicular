import React, { useEffect } from 'react'
import { Input } from '../../Components/UsedInputs'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './SideBar';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notifications/Error';
import { changePasswordAction } from '../../Redux/Actions/userActions';
import { toast } from 'react-hot-toast';

function Password() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) =>state.userLogin);

  const {isLoading, isError, message, isSuccess } = useSelector((state) =>state.userChangePassword);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(PasswordValidation)
  });

  const onSubmit = (data) =>{
    dispatch(changePasswordAction(data))
  };

  useEffect(() =>{
    if(isSuccess){
        dispatch({type: "USER_CHANGE_PASSWORD_RESET"})
    }
    if(isError){
        toast.error(isError);
        dispatch({type: "USER_CHANGE_PASSWORD_RESET"})
    }
    if(message){
      toast.success(message);
      reset();
    }
    
  }, [ setValue, isSuccess, isError, dispatch, message, reset]);


  return (
    <div className="app-container flex">
      <Sidebar isAdmin={userInfo?.isAdmin}/>
      <div className="px-4 py-8">
        <div className=" py-2">
          <h2 className='text-xl font-bold text-gray-800'>Changer le mot de passe</h2>
        </div>
        <div className="gap-4 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container p-3'>


            <div className='w-full'>
              <Input label="ancien mot de passe" placeholder="*************" type="password" name="oldPassword" register={register("oldPassword")} />
              {
                errors.oldPassword && <InlineError text={errors.oldPassword.message}/>
              }
            </div>


            <div className='w-full'>
              <Input label="nouveau mot de passe" placeholder="*************" type="password" name="newPassword" register={register("newPassword")} />
              {
                errors.newPassword && <InlineError text={errors.newPassword.message}/>
              }
            </div>

            <div className='w-full'>
              <Input label="Confirmer le nouveau mot de passe" placeholder="*************" type="password" name="confirmPassword" register={register("confirmPassword")} />
              {
                errors.confirmPassword && <InlineError text={errors.confirmPassword.message}/>
              }
            </div> 

            <div className="mt-6">
                <button disabled={isLoading} type="submit" className="mb-4 w-full px-3 py-4 text-white bg-sky-600 rounded-full">{isLoading ? ("Chargement...") : ("Changer le mot de passe")}</button>
            </div>

            
        </div>
      </form>
        </div>
      </div>
    </div>
    
  )
}

export default Password
