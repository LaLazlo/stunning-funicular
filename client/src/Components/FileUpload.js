import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Screens/Dashboard/SideBar';
import { useSelector } from 'react-redux';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:3000/api/upload', formData);
      console.log('Fichier téléchargé avec succès');
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
    }
  };

  const { userInfo } = useSelector((state) =>state.userLogin);


  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar isAdmin={userInfo?.isAdmin}/>
      </div>
        <div className="w-4/5 p-4">
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
