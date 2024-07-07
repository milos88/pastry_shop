import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "../NavBar";
import { Torte } from "./Torte";
import Kolaci from "./Kolaci";
import Obavestenja from "./Obavestenja";
import Korpa from "./Korpa";
import Podaci from "./Podaci";
import Akcije from "./Akcije";
import ProizvodDetalji from "./ProizvodDetalji";

const Home = ({ isLogged }) => {
  return isLogged ? (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Akcije />}></Route>
          <Route path="/torte" element={<Torte />}></Route>
          <Route path="/kolaci" element={<Kolaci />}></Route>
          <Route path="/obavestenja" element={<Obavestenja />}></Route>
          <Route path="/korpa" element={<Korpa />}></Route>
          <Route path="/podaci" element={<Podaci />}></Route>
          <Route path="/torte/:id" element={<ProizvodDetalji />}></Route>
          <Route path="/kolaci/:id" element={<ProizvodDetalji />}></Route>
        </Routes>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default Home;
