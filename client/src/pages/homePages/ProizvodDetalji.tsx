import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const ProizvodDetalji = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [kolicina, setKolicina] = useState(0);
  const [komentar, setKomentar] = useState("");
  const [oldComments, setOldComments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/proizvod/torte/${id}`)
      .then((res) => {
        setItem(res.data);
        setOldComments(res.data.komentar);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    //console.log(item);
  }, []);

  function getItem(slika: any): any {
    if (slika) {
      const blob = new Blob([Int8Array.from(slika.data.data)], {
        type: slika.contentType,
      });
      return window.URL.createObjectURL(blob);
    } else {
      return "";
    }
  }

  const handleAddItem = async (e) => {
    e.preventDefault();
    const naziv = item.naziv;
    const username = sessionStorage.getItem("username");
    const data = {
      username,
      naziv,
      kolicina,
    };
    axios
      .post("http://localhost:3001/proizvod/addKorpa", data)
      .then((res) => {
        if (res.data.message == "success") {
          navigate("/home/korpa");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const username = sessionStorage.getItem("username");
    const data = {
      id,
      komentar,
      username,
    };
    axios.put("http://localhost:3001/proizvod/addComment", data).then((res) => {
      window.location.reload(false);
    });
  };

  return (
    <div style={{ paddingTop: 50 }}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Container>
            <Row style={{ paddingBottom: 50 }}>
              <Col sm md={6} lg={5} xl={4}>
                <img
                  width={300}
                  height={300}
                  src={getItem(item.slika)}
                  alt="...."
                ></img>
              </Col>
              <Col sm>
                <h2>{item.naziv}</h2>
                <p>Cena: {item.cena}</p>
                <p>Sastav: {item.sastav}</p>
                <p>Opis: {item.opis}</p>
                <form onSubmit={handleAddItem}>
                  <label htmlFor="kolicina" className="form-label">
                    Unesi kolicinu:
                  </label>
                  <input
                    style={{ width: 100 }}
                    value={kolicina}
                    onChange={(e) => setKolicina(Number(e.target.value))}
                    type="text"
                    className="form-control"
                    id="kolicina"
                  />
                  <button type="submit" className="btn btn-primary">
                    Dodaj u korpu
                  </button>
                </form>
              </Col>
            </Row>
            <div>
              <p>Komentari:</p>
              {oldComments &&
                oldComments.map((kom: any, index) => (
                  <div key={index}>
                    <h4>{kom.username}</h4>
                    <p>{kom.text}</p>
                  </div>
                ))}
              <form onSubmit={handleAddComment}>
                <textarea
                  style={{ width: 300, height: 150 }}
                  value={komentar}
                  onChange={(e) => setKomentar(e.target.value)}
                  className="form-control"
                  id="naziv"
                  placeholder="Unesi komentar"
                />
                <button type="submit" className="btn btn-primary">
                  Dodaj komentar
                </button>
              </form>
            </div>
          </Container>
        </>
      )}
    </div>
  );
};

export default ProizvodDetalji;
