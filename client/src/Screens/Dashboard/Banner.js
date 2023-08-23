import React from 'react';

const Banner = ({ fullName }) => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-3xl h-96 shadow border border-gray-200 opacity-70 flex flex-col justify-center">
      <h2 className="text-xl font-bold text-center">Bienvenu, {fullName}!</h2>
    </div>
  );
};

export default Banner;
