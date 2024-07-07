import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Pagination, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Kolaci = () => {
  const [sviKolaci, setSviKolaci] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/proizvod/kolaci")
      .then((response) => {
        setSviKolaci(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sviKolaci.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function getImg(data: any): any {
    const blob = new Blob([Int8Array.from(data.slika.data.data)], {
      type: data.slika.contentType,
    });
    return window.URL.createObjectURL(blob);
  }

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1 className="text-center">Kolaci</h1>
          <br />
          <Container>
            {currentItems &&
              currentItems.map((torta: any, index) => (
                <Row key={index} style={{ paddingBottom: 50 }}>
                  <Col sm md={6} lg={5} xl={4}>
                    <Link to={`/home/kolaci/${torta._id}`}>
                      <img
                        width={300}
                        height={300}
                        src={getImg(torta)}
                        alt="...."
                      ></img>
                    </Link>
                  </Col>
                  <Col sm>
                    <Link to={`/home/kolaci/${torta._id}`}>
                      <h2>{torta.naziv}</h2>
                    </Link>
                    <p>Cena: {torta.cena}</p>
                  </Col>
                </Row>
              ))}
            <Row>
              <Col>
                <Pagination className="d-flex justify-content-center">
                  {Array.from({
                    length: Math.ceil(sviKolaci.length / itemsPerPage),
                  }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Kolaci;
