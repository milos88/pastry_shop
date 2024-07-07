import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Obavestenja = () => {
  const [loading, setLoading] = useState(false);
  const [obavestenja, setObavestenja] = useState([]);

  useEffect(() => {
    setLoading(true);
    const username = sessionStorage.getItem("username");
    axios
      .get(`http://localhost:3001/proizvod/getObavestenja/${username}`)
      .then((res) => {
        setObavestenja(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
    //console.log(item);
  }, []);
  return (
    <div className="container">
      <h2 style={{ width: "100%", textAlign: "center", paddingBottom: "50px" }}>
        Obavestenja
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="row">
          {obavestenja &&
            obavestenja.map((o: any, index) => (
              <div key={index} className="col-sm-12 col-md-8">
                <p>{o.text}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Obavestenja;
