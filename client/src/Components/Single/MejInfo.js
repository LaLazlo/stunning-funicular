import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIncidentByIdAction } from '../../Redux/Actions/IncidentActions';
import { getContractByIdAction } from '../../Redux/Actions/ContractActions';
import { updateMejAction } from '../../Redux/Actions/MejsActions';




function MEJInfo({mej}) {


  const dispatch = useDispatch();

  const {incident} = useSelector(state => state.incidentById);
  const {contract} = useSelector(state => state.contrcatById);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      closeModal();
      window.location.reload();
  }, 10000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [exist_verify, setexist_verify] = useState(false);



  const handleButtonClick = async () => {
    dispatch(getIncidentByIdAction(mej?.rc_number, mej?.court_code, mej?.bank));
    dispatch(getContractByIdAction(mej?.amount));
    try {
      openModal();
      const response = await fetch(`http://localhost:3000/api/incident/${mej?.rc_number}/${mej?.court_code}/${mej?.bank}`);
      if (response.ok) {
        const response2 = await fetch(`http://localhost:3000/api/contract/${mej?.amount}`);
        if(response2.ok){
          setexist_verify(true);
        } else {
          setexist_verify(false);
        }
      } else {
        setexist_verify(false);
      }
    } catch (error) {
      console.error("Une erreur est survenue:", error);
    }
};

  const [showtab1, settab1] = useState(true);
  const [showtab2, settab2] = useState(false);


  const handletab1ButtonClick = () => {
    settab1(true);
    settab2(false);
  };

  const handletab2ButtonClick = () => {
    settab1(false);
    settab2(true);
  };

  useEffect(() => {
    if (exist_verify) {
      dispatch(updateMejAction(
        mej?._id,
        mej?.product,
        mej?.bank,
        mej?.affair,
        mej?.amount,
        mej?.rc_number,
        mej?.court_code,
        exist_verify,
        incident?.type_information_negative,
        incident?.date_declaration,
        incident?.numero_interrogation,
        contract?.reference,
        contract?.contract_type,
        contract?.date_cloture,
        contract?.sous_categorie,
        ));
    }
  }, [exist_verify,
    mej?._id,
    mej?.product,
    mej?.bank,
    mej?.affair,
    mej?.amount,
    mej?.rc_number,
    mej?.court_code,
    incident?.type_information_negative,
    incident?.date_declaration,
    incident?.numero_interrogation,
    contract?.reference,
    contract?.contract_type,
    contract?.date_cloture,
    contract?.sous_categorie,
    dispatch,]);
  





  return (
    <div className="px-4 mt-6 m-auto">
      <div className="grid grid-cols-4 gap-x-2">
        <div className="rounded-xl flex items-center justify-center">
          <button
            onClick={handletab1ButtonClick}
            className="w-52 text-2xl text-white bg-gray-400 opacity-70 rounded-t-xl text-center hover:scale-105 transform transition duration-500"
          >
            Informations MEJ
          </button>
        </div>

        <div className="rounded-xl flex items-center justify-center">
          <button
            onClick={handletab2ButtonClick}
            className="w-52 text-2xl text-white bg-gray-400 opacity-70 rounded-t-xl text-center hover:scale-105 transform transition duration-500"
          >
            Vérification MEJ
          </button>
        </div>

        
      </div>

      {showtab1 ? (
        <div className="col-span-4 bg-gray-600 p-4 text-white flex items-start justify-start h-128 rounded-b-3xl opacity-70">
        <div className="flex flex-col">
          <label htmlFor="title" className="block text-2xl font-bold mb-2">
            Produit
          </label>
          <input
            type="text"
            id="title"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.product}
          />

              
          
          <label htmlFor="director" className="block text-2xl font-bold mb-2">
            Institution Financière
          </label>
          <input
            type="text"
            id="director"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.bank}
          />              

          <label htmlFor="director" className="block text-2xl font-bold mb-2">
            Affaire
          </label>
          <input
            type="text"
            id="director"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.affair}
          />

         
          

          <label htmlFor="director" className="block text-2xl font-bold mb-2">
            Type Information Negative
          </label>
          <input
            type="text"
            id="director"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.type_information_negative}
          />

          <label htmlFor="genre" className="block text-2xl font-bold mb-2">
            Date Declaration
          </label>
          <input
            type="text"
            id="genre"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.date_declaration}
          />

          <label htmlFor="genre" className="block text-2xl font-bold mb-2">
            Numero Interrogation
          </label>
          <input
            type="text"
            id="genre"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.numero_interrogation}
          />

          <label htmlFor="genre" className="block text-2xl font-bold mb-2">
            Vérifié
          </label>
          <input
            type="text"
            id="genre"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.exist ? "Existe" : "N'existe pas"}
          />
        </div>
        
        <div className="ml-4">
          <label htmlFor="releaseYear" className="block text-2xl font-bold mb-2">
            Numéro RC
          </label>
          <input
            type="text"
            id="releaseYear"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.rc_number}
          />
          
          <label htmlFor="rating" className="block text-2xl font-bold mb-2">
            Code Tribunal
          </label>
          <input
            type="text"
            id="rating"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.court_code}
          />

          <label htmlFor="genre" className="block text-2xl font-bold mb-2">
            Montant
          </label>
          <input
            type="text"
            id="genre"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.amount}
          />


          <label htmlFor="director" className="block text-2xl font-bold mb-2">
            Référence
          </label>
          <input
            type="text"
            id="director"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.reference}
          />

          <label htmlFor="genre" className="block text-2xl font-bold mb-2">
            Type de contrat
          </label>
          <input
            type="text"
            id="genre"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.contract_type}
          />

          <label htmlFor="genre" className="block text-2xl font-bold mb-2">
            Date Cloture
          </label>
          <input
            type="text"
            id="genre"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.date_cloture}
          />

          <label htmlFor="genre" className="block text-2xl font-bold mb-2">
            Sous-categorie
          </label>
          <input
            type="text"
            id="genre"
            className="w-full rounded-md border-gray-300 text-black mb-4"
            value={mej?.sous_categorie}
          />

          
        </div>

        </div>
      


        
      ) : showtab2 ? (
        <div className="col-span-4 bg-gray-600 p-4 text-white h-128 rounded-b-3xl opacity-70">
  <div className="flex flex-col h-full justify-between">
    <div className="text-2xl font-bold mb-2">
      MEJ Existante?
    </div>
      <div className="flex items-center">
        <input type="checkbox" name="yesCheckbox" id="yesCheckbox" disabled checked={mej?.exist}
          />
        <span className="ml-2">Oui</span>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="noCheckbox" id="noCheckbox" disabled checked={!mej?.exist}
        />
        <span className="ml-2">Non</span>
      </div>
    <div className="mx-auto mt-auto">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  onClick={handleButtonClick}>
        Vérifier
      </button>

      {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                                <div className="bg-white rounded p-6 w-1/2 relative z-10">
                                <h2 className="text-xl font-semibold mb-2 text-black">Vérification en cours...</h2>
                                <div className='flex gap-4'>
                                </div>

                                
                            </div>
                            </div>
                        )}
    </div>

  </div>
</div>




      


      





      ) : null}
    </div>
  );
}


export default MEJInfo
