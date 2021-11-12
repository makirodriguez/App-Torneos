import {AmplifySignOut} from '@aws-amplify/ui-react';
import {Link} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
    return (
        <div class="bg-dark">
            <div class="container">
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand>
                        <img
                            src="/favicon-32x32.png"
                            width="30"
                            height="30"
                            className="align-top"
                            alt="TorneosApp Logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Brand href="/">TorneosApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar"/>
                    <Navbar.Collapse id="navbar">
                        <Nav className="mr-auto">
                            <NavDropdown title="Torneos" id="torneos">
                                <NavDropdown.Item href="/crear-torneo">Crear Torneo</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/mis-torneos">Mis Torneos</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Equipos" id="equipos">
                                <NavDropdown.Item href="/crear-equipo">Crear Equipo</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/mis-equipos">Mis equipos</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/perfil">Perfil</Nav.Link>
                            <Nav.Link href="#">FAQs</Nav.Link>
                        </Nav>
                        <form class="form px-2 w-75 d-flex">
                            <input class="form-control mr-sm-2" type="search" placeholder="" aria-label="Buscar"></input>
                            <button class="btn btn-outline-success mt-2 mx-2 h-25 d-inline-block" type="submit">Buscar</button>
                        </form>
                        <div class="text-end">
                            <AmplifySignOut />
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;