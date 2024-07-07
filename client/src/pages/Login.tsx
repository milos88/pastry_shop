import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ isLogged, setIsLogged }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:3001/users/login/", {
      username,
      password,
    });
    console.log(response.data);
    if (response.data.message === "Login successful") {
      if (response.data.type === "kupac") {
        navigate("/home");
        setIsLogged(true);
        sessionStorage.setItem("isLogged", true);
        const user = response.data;
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("surname", user.surname);
        sessionStorage.setItem("telephone", user.telephone);
        sessionStorage.setItem("address", user.address);
        sessionStorage.setItem("username", user.username);
      } else {
        setIsLogged(true);
        sessionStorage.setItem("isLogged", true);
        const user = response.data;
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("surname", user.surname);
        sessionStorage.setItem("telephone", user.telephone);
        sessionStorage.setItem("address", user.address);
        sessionStorage.setItem("username", user.username);
        navigate("/homez");
      }
    } else {
      setMessage(response.data.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="">
          <form onSubmit={handleSubmit}>
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
                placeholder="Unesi sifru"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Uloguj se
            </button>
          </form>
          {(() => {
            if (message != "") {
              return <p className="text-danger">{message}</p>;
            }
          })()}
          <p>
            Nemas nalog? <Link to="/register">Registruj se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
