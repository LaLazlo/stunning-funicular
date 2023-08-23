import React from 'react';
import { Link } from 'react-router-dom';



function Hero() {
  return (
    <div className="bg-white ">
  <div className="container py-4 mx-auto my-auto lg:flex mt-28">
    <div className="flex flex-col items-center w-full lg:flex-row">
      <div className="max-w-lg">
        <h1 className="tracking-wide text-gray-800 text-4xl">Libérez votre potentiel commercial avec<strong>
        TAMWILCOM Naviguez, innovez et grandissez sans effort dans votre parcours financier!</strong></h1>
        <p className="mt-4 text-gray-300 text-gray-600">Découvrez un nouvel horizon dans les services financiers avec TAMWILCOM. 
        Optimisez les processus, renforcez les entreprises et profitez de la prospérité financière. 
        Vivez dès aujourd'hui l'avenir de la croissance économique!</p>
        <div className="mt-6 mb-2">
          <Link to="/offers" className="inline-block px-3 py-2 font-semibold text-center text-white bg-sky-600 rounded-full">
            Découvrir
          </Link>
        </div>
      </div>
    </div>
        <div className="flex items-center justify-center w-full mt-2 lg:h-96">
      <img className="object-cover w-full max-w-2xl rounded-md lg:h-full"
        src="https://tamwilcom.ma/sites/default/files/slider/1949.png" alt="" />
    </div>
  </div>
</div>

  )
}

export default Hero;
