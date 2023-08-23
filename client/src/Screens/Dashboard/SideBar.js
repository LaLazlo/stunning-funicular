import {
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ClipboardIcon,
    PowerIcon,
    UsersIcon,
    ChevronDownIcon,
    ChevronUpIcon,
  } from "@heroicons/react/24/solid";
  import {Link, NavLink, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutAction } from "../../Redux/Actions/userActions";
import toast from 'react-hot-toast'
import { useState } from "react"

import React from 'react';

const Sidebar = ({isAdmin}) => {




  const [isMoviesSubMenuOpen, setIsMoviesSubMenuOpen] = useState(false);
  const toggleMoviesSubMenu = () => {
    setIsMoviesSubMenuOpen(!isMoviesSubMenuOpen);
  };
  const handleMoviesLinkClick = () => {
    toggleMoviesSubMenu();
  };

  const [isUsersSubMenuOpen, setIsUsersSubMenuOpen] = useState(false);
  const toggleUsersSubMenu = () => {
    setIsUsersSubMenuOpen(!isUsersSubMenuOpen);
  };
  const handleUsersLinkClick = () => {
    toggleUsersSubMenu();
  };


    const dispatch = useDispatch();
  const navigate = useNavigate();



    const logoutHandler = () =>{
      dispatch(logoutAction())
      navigate("/login")
      toast.success("Déconnecté avec succès")
    }






  return (
    <div className="sidebar w-64 h-screen p-4 shadow-xl">
      <NavLink to="/">
                <img className="h-24 m-auto" src="https://www.tamwilcom.ma/sites/all/themes/ccgtheme/logo.png" alt="" />
         </NavLink>
         <List className="mt-10">
          <Link to={`/dashboard`}>
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 fill-black"/>
              </ListItemPrefix>
              <p className="text-black">Tableau de bord</p>
            </ListItem>
          </Link>
          
          <Link className="flex items-center justify-between" onClick={handleMoviesLinkClick}>
          <ListItem>
            <ListItemPrefix>
              <ClipboardIcon className="h-5 w-5 fill-black" />
            </ListItemPrefix>
            <p className="flex-1 text-black">MEJs</p>
            {isMoviesSubMenuOpen ? (
            <ChevronUpIcon className="h-5 w-5 fill-black" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 fill-black" />
          )}
          </ListItem>
        </Link>
      {isMoviesSubMenuOpen && (
        <div className="ml-8 mt-2 flex flex-col gap-2">
        {isAdmin ? (
            <>
            <Link to="/mejlist">Liste des MEJ</Link>
            <Link to="/addtask">Ajouter des MEJ</Link>
            </>
        ) : (
            <Link to="/assigned_mejs">MEJ attribués</Link>
          )}
        </div>
      )
      }
      

          
        <Link className="flex items-center justify-between" onClick={handleUsersLinkClick}>
            <ListItem>
              <ListItemPrefix>
                <UsersIcon className="h-5 w-5 fill-black" />
              </ListItemPrefix>
              <p className="flex-1 text-black">Utilisateurs</p>
            {isUsersSubMenuOpen ? (
            <ChevronUpIcon className="h-5 w-5 fill-black" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 fill-black" />
          )}
          </ListItem>
        </Link>
      {isUsersSubMenuOpen && (
        <div className="ml-8 mt-2 flex flex-col gap-2">

{isAdmin && (
        <>
          <Link to="/profileslist">Liste des utilisateurs</Link>
          <Link to="/register">Ajouter un utilisateur</Link>
        </>
      )}
         <Link to="/profile">Mettre à jour le profil</Link>
         <Link to="/password">Changer le mot de passe</Link>

          

        </div>
      )}

          

          <ListItem onClick={logoutHandler}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 fill-black" />
            </ListItemPrefix>
            <p className="text-black">Se déconnecter</p>
          </ListItem>
          
        </List>
    </div>
  );
};

export default Sidebar;

