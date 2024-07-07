import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Podaci = () => {
  const [name, setName] = useState(() => {
    return sessionStorage.getItem("name");
  });
  const [surname, setSurname] = useState(() => {
    return sessionStorage.getItem("surname");
  });
  const [address, setAddress] = useState(() => {
    return sessionStorage.getItem("address");
  });
  const [telephone, setTelephone] = useState(() => {
    return sessionStorage.getItem("telephone");
  });
  const [username, setUsername] = useState(() => {
    return sessionStorage.getItem("username");
  });
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      surname,
      address,
      telephone,
      username,
      password,
    };
    const result = await axios.put("http://localhost:3001/users/update/", data);
    setMessage(result.data.message);
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("surname", surname);
    sessionStorage.setItem("telephone", telephone);
    sessionStorage.setItem("address", address);
    sessionStorage.setItem("username", username);
  };

  return (
    <div style={{ paddingTop: 50 }} className="auth-wrapper">
      <div className="auth-inner">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Ime
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control"
                id="name"
                placeholder="Unesi ime"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Prezime
              </label>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                className="form-control"
                id="surname"
                placeholder="Unesi prezime"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="adress" className="form-label">
                Adresa
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="form-control"
                id="adress"
                placeholder="Unesi adresu"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="telephone" className="form-label">
                Telefon
              </label>
              <input
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                type="text"
                className="form-control"
                id="telephone"
                placeholder="Unesi broj telefona"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Korisnicko ime
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                className="form-control"
                id="username"
                autoComplete="username"
                placeholder="Unesi korisnicko ime"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Sifra
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="password"
                autoComplete="current-password"
                placeholder="Unesi sifru"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sacuvaj izmene
            </button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Podaci;
