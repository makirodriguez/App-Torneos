import {AmplifySignOut} from '@aws-amplify/ui-react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {API, Auth} from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { useEffect, useState } from "react";

const Header = () => {
    const [listTorneos, setListTorneos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    var [array, setArrayBusqueda] = useState([]);
    const [union, setUnion]= useState();
    const [userCreator, setUserCreator] = useState('');

    useEffect(() =>{
        async function getAllTorneos(){
            const allTorneos = await API.graphql({query: queries.listTorneos});
            setListTorneos(allTorneos.data.listTorneos.items);  
        }
        getAllTorneos();
        Auth.currentAuthenticatedUser().then(user => {
            setUserCreator(user.username);
          })
       
    });

    const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=listTorneos.filter((elemento)=>{
               if(((elemento.name.toString().toLowerCase()).includes(terminoBusqueda.toLowerCase())))
               {
                   return elemento;
               }                      
         }); 
         setArrayBusqueda(resultadosBusqueda)
       } 
    
   const buscador = (e) =>{
       e.preventDefault()
       if(!busqueda.trim()){
           window.alert("Ingrese su busqueda")
           return
       }
       filtrar(busqueda);
     
   }

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
                    </Navbar.Collapse>
                    <div class="d-flex justify-content-end">
                        <AmplifySignOut />
                    </div>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;