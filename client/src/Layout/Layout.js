import React from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

function Layout({children}) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
