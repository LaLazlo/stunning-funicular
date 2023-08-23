import React from 'react'
import { Link } from 'react-router-dom';


const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"


const Rows = (mej, i, admin) =>{


    return(
        <tr key={i}>
            <td className={`${Text} truncate`}>{mej.product}</td>
            <td className={`${Text}`}>{mej.bank}</td>
            <td className={`${Text}`}>{mej.affair}</td>
            <td className={`${Text}`}>{mej.amount}</td>
            <td className={`${Text}`}>{mej.rc_number}</td>
            <td className={`${Text}`}>{mej.court_code}</td>
            <td className={`${Text} float-right flex gap-2`}>
                {
                    admin ? (
                        <>
                        <Link to={`/mej/${mej?._id}`} className='font-medium bg-sky-600 rounded py-1 px-2 '>
                                Traiter
                            </Link>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
                
            </td>


        </tr>
    )
};



function Table({data, admin}) {
  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border divide-y'>
        <thread>
            <tr className='bg-gray'>
                <th className={`${Head}`} scope='col'>
                    Produit
                </th>
                <th className={`${Head}`} scope='col'>
                    Institution Financière
                </th>
                <th className={`${Head}`} scope='col'>
                    Affaire
                </th>
                <th className={`${Head}`} scope='col'>
                    Montant
                </th>
                <th className={`${Head}`} scope='col'>
                    Numéro RC
                </th>
                <th className={`${Head} text-end`} scope='col'>
                    Code Tribunal
                </th>
            </tr>
            <tbody className='divide-gray-800 divide-y bg-main'>
                {data.map((mej, i) => Rows(mej, i, admin))}
            </tbody>
        </thread>
      </table>
    </div>
  )
};

export default Table;

