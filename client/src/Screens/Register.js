import React, { useEffect } from 'react'
import { Input } from '../Components/UsedInputs'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { InlineError } from '../Components/Notifications/Error';
import { RegisterValidation } from '../Components/Validation/UserValidation';
import { registerAction } from '../Redux/Actions/userActions';
import Layout from '../Layout/Layout';

function Register() {



  const dispatch = useDispatch();
  const navigate = useNavigate();




  const {isLoading, isError, userInfo, isSuccess } = useSelector((state) =>state.userRegister);


  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(RegisterValidation)
  })

  const onSubmit = (data) =>{
    dispatch(registerAction(data));
    window.location.href = '/register';
  };

  useEffect(() =>{
    if(isSuccess){
      toast.success(`${userInfo?.fullName} Inscrit`);
      dispatch({type: "USER_REGISTER_RESET"});
    }
    if(isError){
      toast.error(isError);
      dispatch({type: "USER_REGISTER_RESET"});
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);





  return (


    <Layout>
      <form onSubmit={ handleSubmit(onSubmit)} className='flex justify-center min-h-screen bg-gray-100'>
        <div className='container mt-12 my-auto max-w-md border-2 border-gray-200 p-3 bg-white'>
            <div className="text-center my-6">
                <h1 className="text-3xl font-semibold text-gray-700">Registrer</h1>
            </div>
            <div className='w-full'>
              <Input label="Full Name" placeholder="Entrez le nom complet" type="text" name="fullName" register={register("fullName")} />
              {
                errors.fullName && <InlineError text={errors.fullName.message}/>
              }
            </div>


            <div className='w-full'>
              <Input label="Email" placeholder="Entrez l'e-mail" type="email" name="email" register={register("email")} />
              {
                errors.email && <InlineError text={errors.email.message}/>
              }
            </div>

            <div className='w-full'>
              <Input label="Password" placeholder="************" type="password" name="password" register={register("password")} />
              {
                errors.password && <InlineError text={errors.password.message}/>
              }
            </div>
            <div className="m-6">
                <button disabled={isLoading} type="submit" className="w-full px-3 py-4 text-white bg-sky-600 rounded-full">{isLoading ? ("Chargement...") : ("Registrer")}</button>
            </div>
        </div>
      </form>
    </Layout>


  )
}

export default Register
