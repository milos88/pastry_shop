import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const DodajProizvod = () => {
  const [naziv, setNaziv] = useState("");
  const [cena, setCena] = useState("");
  const [sastav, setSastav] = useState("");
  const [opis, setOpis] = useState("");
  const [tip, setTip] = useState("");
  const [slika, setSlika] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setSlika(e.target.files[0]);

    // const file = e.target.files[0];
    // console.log(file);
    // setSlika(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("slika", slika);
    formData.append("naziv", naziv);
    formData.append("cena", cena);
    formData.append("sastav", sastav);
    formData.append("opis", opis);
    formData.append("tip", tip);
    axios
      .post("http://localhost:3001/proizvod/upload", formData)
      .then((response) => {
        setMessage(response.data.message);
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
              <label htmlFor="slika" className="form-label">
                Slika
              </label>
              <input
                accept="image/*"
                onChange={handleImageChange}
                type="file"
                className="form-control"
                id="slika"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="naziv" className="form-label">
                Naziv
              </label>
              <input
                value={naziv}
                onChange={(e) => setNaziv(e.target.value)}
                type="text"
                className="form-control"
                id="naziv"
                placeholder="Unesi naziv proizvoda"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cena" className="form-label">
                Cena
              </label>
              <input
                value={cena}
                onChange={(e) => setCena(e.target.value)}
                type="text"
                className="form-control"
                id="cena"
                placeholder="Unesi cenu"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sastav" className="form-label">
                Sastav
              </label>
              <textarea
                value={sastav}
                onChange={(e) => setSastav(e.target.value)}
                className="form-control"
                id="sastav"
                placeholder="Unesi sastav"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="opis" className="form-label">
                Opis
              </label>
              <textarea
                value={opis}
                onChange={(e) => setOpis(e.target.value)}
                className="form-control"
                id="opis"
                placeholder="Unesi opis"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="opis" className="form-label">
                Tip
              </label>
              <Form.Select
                aria-label="Default select example"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
              >
                <option>Izaberi tip proizvoda</option>
                <option value="Torta">Torta</option>
                <option value="Kolac">Kolac</option>
              </Form.Select>
            </div>
            <button type="submit" className="btn btn-primary">
              Dodaj proizvod
            </button>
          </form>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default DodajProizvod;
