import React from 'react'
import {Outlet} from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu';

export default function HomeTemplate() {
  return (
    <>
        <Header />
        <Menu />
        <Outlet />
        <Footer />
    </>
  )
}
 