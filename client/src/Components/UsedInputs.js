import React from 'react'

export const Input = ({label, placeholder, type, register, name, value, onChange}) =>{
    return(
        <div className='mx-6 mt-6'>
            <label className='block mb-2 text-sm text-gray-600'>{label}</label>
            <input  name={name} value={value} onChange={onChange} {...register} type={type} placeholder={placeholder} className={`w-full px-3 py-2 focus:outline-gray-300 placeholder-gray-400 border rounded-md text-black`} />
        </div>
    )
}