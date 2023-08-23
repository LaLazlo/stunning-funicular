import React from 'react'
import { Empty, shortUpperCaseId } from './Notifications/Empty';


const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"


const Rows = ({data, users, onDeleteFunction}) =>{
    return(
        <tr>
            {
                users ? (
                    <>
                    <td className={`${Text}`}>{shortUpperCaseId(data._id)}</td>
                    <td className={`${Text}`}>{data.fullName}</td>
                    <td className={`${Text}`}>{data.email}</td>
                    <td className={`${Text}`}>{data.isAdmin ? "Admin" : "Analyst"}</td>
                    <td className={`${Text} float-right flex gap-2`}>
                        {!data.isAdmin && (
                                <button onClick={() => onDeleteFunction(data?._id)} className='font-medium bg-red-600 rounded py-1 px-2 '>
                                    Supprimer
                                </button>
                        )}   
                    </td>
                    </>
                ) : (
                    <Empty message={"No users found"}/>
                )
            }
            
        </tr>
    )
};



function UsersTable({data, users, onDeleteFunction}) {
  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border divide-y'>
        <thread>
            <tr className='bg-gray'>
                <th className={`${Head}`} scope='col'>
                    Id
                </th>
                <th className={`${Head}`} scope='col'>
                    Nom
                </th>
                <th className={`${Head}`} scope='col'>
                    E-mail
                </th>
                <th className={`${Head}`} scope='col'>
                    Rôle
                </th>
                
                <th className={`${Head} text-end`} scope='col'>
                    Actions
                </th>
            </tr>
            <tbody className='divide-gray-800 divide-y bg-main'>
                {data.map((data, i) => 
                (<Rows key={i} data={data} users={users} onDeleteFunction={onDeleteFunction} />)
                )
            }
            </tbody>
        </thread>
      </table>
    </div>
  )
};

export default UsersTable;

