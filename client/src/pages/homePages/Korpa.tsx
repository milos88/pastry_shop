import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";

const Korpa = () => {
  const [loading, setLoading] = useState(false);
  const [proizvodi, setProizvodi] = useState([]);
  const [brojPor, setBrojPor] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoading(true);
    const username = sessionStorage.getItem("username");
    axios
      .post("http://localhost:3001/proizvod/getKorpa", { username })
      .then((response) => {
        setProizvodi(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleKupi = async (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem("username");
    axios
      .post("http://localhost:3001/proizvod/addPorudzbina", { username })
      .then((res) => {
        setBrojPor(res.data.brojPor);
        setShow(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="text-center container">
      <div className="row justify-content-md-center">
        <h2>Korpa</h2>
        {loading ? (
          <Spinner />
        ) : proizvodi.length > 0 ? (
          <div className="col-sm-12 col-md-6 ">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Naziv proizvoda</th>
                  <th>Kolicina</th>
                </tr>
              </thead>
              <tbody>
                {proizvodi &&
                  proizvodi.map((p, index) => (
                    <tr key={index}>
                      <td>{p.naziv}</td>
                      <td>{p.kolicina}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <form onSubmit={handleKupi}>
              <button type="submit" className="btn btn-primary">
                Kupi
              </button>
            </form>
          </div>
        ) : (
          <p>Niste dodali nijedan proizvod u korpu</p>
        )}
      </div>
      <Modal
        centered
        show={show}
        onHide={() => {
          setShow(false);
          window.location.reload(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Potvrda narudzbine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Narudzbina broj {brojPor} je registrovana, uskoro cete dobiti
            obavestenje
          </p>
        </Modal.Body>
        <Modal.Footer className="d-block text-center">
          <Button
            variant="primary"
            onClick={() => {
              setShow(false);
              window.location.reload(false);
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Korpa;
