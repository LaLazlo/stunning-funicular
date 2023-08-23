import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsersAction } from '../Redux/Actions/userActions';
import Axios from '../Redux/APIs/Axios';
import { deleteMejAction, updateMejAction } from '../Redux/Actions/MejsActions';


const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3"


const Rows2 = (mej, i, admin) =>{
    const dispatch = useDispatch();

    const [selectedUserId, setSelectedUserId] = useState('');



  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { isLoading: deleteLoading } = useSelector((state) =>state.deleteMejById);


  const {isLoading, isError, users} = useSelector(state => state.adminGetAllusers);


  useEffect(() =>{
    dispatch(getAllUsersAction());
    if (isError) {
      toast.error(isError);
      dispatch({type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET" });
    }
  }, [dispatch, isError]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
    setSelectedUserId(event.target.value);
  };

const nonAdminUsers = users && users.filter(user => !user.isAdmin);

const handleSave = async () => {
    if (selectedUserId) {
      try {
        await Axios.post(`/users/assigned_mej`, {
            mejId: mej._id,
            userId: selectedUserId,
        });
        toast.success(`Tâche assignée avec succès`);

        dispatch(updateMejAction(
          mej?._id,
          mej?.product,
          mej?.bank,
          mej?.affair,
          mej?.amount,
          mej?.rc_number,
          mej?.court_code,
          mej?.exist,
          true,
          mej?.type_information_negative,
          mej?.date_declaration,
          mej?.numero_interrogation,
          mej?.reference,
          mej?.contract_type,
          mej?.date_cloture,
          mej?.sous_categorie,
          ));


        closeModal();
      } catch (error) {
        console.error("Erreur lors de l'assignation de la tâche:", error);
      }
    }
  };

  const deleteMej = () =>{
    window.confirm("Êtes-vous sûr de vouloir supprimer ce MEJ?") &&
    dispatch(deleteMejAction(mej._id));
    setTimeout(() => {
      window.location.reload();
  }, 2000);
}





    return(
        <tr key={i} className={mej.isAssigned ? 'disabled-row' : ''}>
            
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
                        <button className='font-medium bg-sky-600 rounded py-1 px-2' onClick={openModal}>
                          Assigner
                        </button>

                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                              <div className="bg-white rounded p-6 w-1/2 relative z-10">
                                <h2 className="text-xl font-semibold mb-2">Assigner MEJ Nº{mej._id}</h2>
                                <div>
                                <label className="block mb-2 font-medium">Select an option:</label>
                                <select className="bg-gray-100 rounded p-2 w-full" value={selectedOption} onChange={handleOptionChange}>
                                <option value="">Sélectionnez un utilisateur</option>
                                {nonAdminUsers && nonAdminUsers.map(user => (
                                    <option key={user._id} value={user._id}>
                                    {user.fullName}
                                    </option>
                                ))}
                                </select>
                                </div>

                                <div className='flex gap-4'>
                                <button className="mt-4 bg-gray-300 hover:bg-gray-400 rounded px-3 py-1" onClick={handleSave} disabled={mej.isAssigned}>
                                  Sauvegarder
                                </button>
                                    
                                    <button className="mt-4 bg-gray-300 hover:bg-gray-400 rounded px-3 py-1" onClick={closeModal}>
                                      Fermer
                                    </button>

                                </div>

                                
                            </div>
                            </div>
                        )}
                            <button onClick={deleteMej} disabled={isLoading || deleteLoading} type="submit" className="font-medium bg-red-600 rounded py-1 px-2">{isLoading ? ("Chargement...") : ("Supprimer")}</button>
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



function Table2({data, admin}) {

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
                {data.map((mej, i) => Rows2(mej, i, admin))}
            </tbody>
        </thread>
      </table>
    </div>
  )
};

export default Table2;

