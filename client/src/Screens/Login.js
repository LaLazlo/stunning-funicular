import React, {useEffect} from 'react'
import Layout from '../Layout/Layout'
import { Input } from '../Components/UsedInputs'
import {  useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import { LoginValidation } from '../Components/Validation/UserValidation'
import { yupResolver } from '@hookform/resolvers/yup'
import { InlineError } from '../Components/Notifications/Error'
import { loginAction } from '../Redux/Actions/userActions'
import toast from 'react-hot-toast'


function Login() {









  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {isLoading, isError, userInfo, isSuccess } = useSelector((state) =>state.userLogin);


  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(LoginValidation)
  })

  const onSubmit = (data) =>{
    dispatch(loginAction(data));
  };

  useEffect(() =>{
    if(userInfo?.isAdmin){
      navigate("/dashboard");
    }
    else if(userInfo){
      navigate("/dashboard")
    }
    if(isSuccess){
      toast.success(`Bienvenu ${userInfo?.fullName}`);
    }
    if(isError){
      toast.error(isError);
      dispatch({type: "USER_LOGIN_RESET"});
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch]);

  return (
    <Layout>
      <form onSubmit={ handleSubmit(onSubmit)} className='flex justify-center min-h-screen bg-gray-100'>
        <div className='container sm:mt-40 mt-16 my-auto max-w-md border-2 border-gray-200 p-3 bg-white'>
            <div className="text-center my-6">
                <h1 className="text-3xl font-semibold text-gray-700">Se connecter</h1>
            </div>
            <div className='w-full'>
              <Input label="Email" placeholder="Entrer votre Email" type="email" name="email" register={register("email")} />
              {
                errors.email && <InlineError text={errors.email.message}/>
              }
            </div>

            <div className='w-full'>
              <Input label="Password" placeholder="*************" type="password" name="password" register={register("password")} />
              {
                errors.password && <InlineError text={errors.password.message}/>
              }
            </div>
            <div className="m-6">
                    <button disabled={isLoading} type="submit" className="w-full px-3 py-4 text-white bg-sky-600 rounded-full">{isLoading ? ("Chargement...") : ("Se connecter")}</button>
            </div>
        </div>
      </form>
    </Layout>
  )
}

export default Login
