import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [adress, setAdress] = useState("");
  const [telephone, setTelephone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      surname,
      adress,
      telephone,
      username,
      password,
    };
    axios
      .post("http://localhost:3001/users/register/", data)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setMessage("Podaci nisu ispravno uneti");
        console.log(error);
      });
  };

  return (
    <div className="auth-wrapper">
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
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
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
              Registruj se
            </button>
          </form>
          <p>{message}</p>
          <p>
            Vec imas nalog? <Link to="/login">Uloguj se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
