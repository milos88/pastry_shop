import axios from "axios";
import React, { useEffect, useState } from "react";
import { Accordion, Spinner, Table } from "react-bootstrap";

const PregledPorudzbina = () => {
  const [loading, setLoading] = useState(false);
  const [porudzbine, setPorudzbine] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/proizvod/getPorudzbine`)
      .then((res) => {
        setPorudzbine(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  function handlePrihvati(id: any) {
    axios
      .put(`http://localhost:3001/proizvod/prihvati/${id}`)
      .then(() => {
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleOdbij(id: any) {
    axios
      .put(`http://localhost:3001/proizvod/odbij/${id}`)
      .then(() => {
        window.location.reload(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="text-center container">
      <div className="row justify-content-md-center">
        <h2>Pregled narudzbina</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="col-sm-12 col-md-10">
            <Accordion>
              {porudzbine &&
                porudzbine.map((por, index) => (
                  <div key={index}>
                    <div className="d-inline-block col-sm-8 col-md-8">
                      <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header className="d-block text-center">
                          Porudzbina broj {por.broj_por}
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Naziv proizvoda</th>
                                <th>Kolicina</th>
                              </tr>
                            </thead>
                            <tbody>
                              {por.proizvodi &&
                                por.proizvodi.map((p, index) => (
                                  <tr key={index}>
                                    <td>{p.naziv}</td>
                                    <td>{p.kolicina}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                    <div className="d-inline-block col-sm-4 col-md-4">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handlePrihvati(por._id);
                          window.location.reload(false);
                        }}
                      >
                        Prihvati
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          handleOdbij(por._id);
                          window.location.reload(false);
                        }}
                      >
                        Odbij
                      </button>
                    </div>
                  </div>
                ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default PregledPorudzbina;
