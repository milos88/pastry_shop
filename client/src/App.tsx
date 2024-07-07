import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signiup";
import Login from "./pages/Login";
import Home from "./pages/homePages/Home";
import { useState, useEffect } from "react";
import Homez from "./pages/homePages/Homez";

function App() {
  const [isLogged, setIsLogged] = useState(() => {
    // Check localStorage for saved isLogged value on component mount
    const storedIsLogged = sessionStorage.getItem("isLogged");
    if (storedIsLogged) {
      return JSON.parse(storedIsLogged);
    } else {
      return false;
    }
  });
  return (
    <>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route
          path="/login"
          Component={() => (
            <Login isLogged={isLogged} setIsLogged={setIsLogged} />
          )}
        />
        <Route
          path="/home/*"
          Component={() => <Home isLogged={isLogged} />}
        ></Route>
        <Route
          path="/homez/*"
          Component={() => <Homez isLogged={isLogged} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
