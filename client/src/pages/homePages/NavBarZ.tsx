import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/homez/">Dodaj proizvod</Nav.Link>
            <Nav.Link href="/homez/pregled_narudzbina">
              Pregled narudzbina
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/homez/podaci">Moji podaci</Nav.Link>
            <Nav.Link
              href="/login"
              onClick={() => sessionStorage.setItem("isLogged", false)}
            >
              Odjavi se
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
