import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

const App3: React.FC = () => {

    return (
      <>
        <NavLink to={"/home"}>Home | </NavLink>
        <NavLink to={"/about"}>About | </NavLink>
        <NavLink to={"/contact"}>Contact </NavLink>

        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </>
    );
};

export default App3;