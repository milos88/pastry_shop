import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Pocetna</Nav.Link>
            <Nav.Link href="/home/torte">Torte</Nav.Link>
            <Nav.Link href="/home/kolaci">Kolaci</Nav.Link>
            <Nav.Link href="/home/obavestenja">Obavestenja</Nav.Link>
            <Nav.Link href="/home/korpa">Moja korpa</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/home/podaci">Moji podaci</Nav.Link>
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
