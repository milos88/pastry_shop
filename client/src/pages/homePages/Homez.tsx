import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBarZ from "./NavBarZ";
import DodajProizvod from "./DodajProizvod";
import PregledPorudzbina from "./PregledPorudzbina";
import Podaci from "./Podaci";

const Homez = ({ isLogged }) => {
  return isLogged ? (
    <>
      <div style={{ paddingBottom: 50 }}>
        <NavBarZ />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<DodajProizvod />}></Route>
          <Route
            path="/pregled_narudzbina"
            element={<PregledPorudzbina />}
          ></Route>
          <Route path="/podaci" element={<Podaci />}></Route>
        </Routes>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Homez;
