import {AmplifySignOut} from '@aws-amplify/ui-react';
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div class="bg-dark text-white">
            <div class="container">
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-white justify-content-between">
                        <span class="navbar-brand mb-0 h1">
                            <img src="/favicon-32x32.png" width="30" height="30" class="d-inline-block align-top" alt=""></img>
                            TorneosApp
                        </span>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item active">
                                    <a class="nav-link" href="/">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/perfil">Perfil</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="Torneos" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Torneos
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="Torneos">
                                        <a class="dropdown-item" href="/crear-torneo">Crear torneo</a>
                                        <a class="dropdown-item" href="/mis-torneos">Mis torneos</a>
                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" id="Equipos" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Equipos
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="Equipos">
                                        <a class="dropdown-item" href="/crear-equipo">Crear equipo</a>
                                        <a class="dropdown-item" href="/mis-equipos">Mis equipos</a>
                                    </div>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/">FAQS</a>
                                </li>
                            </ul>
                            <form class="form px-2 w-75 d-flex">
                                <input class="form-control mr-sm-2" type="search" placeholder="" aria-label="Buscar"></input>
                                <button class="btn btn-outline-success mt-2 mx-2 h-25 d-inline-block" type="submit">Buscar</button>
                            </form>
                            <div class="text-end">
                                <AmplifySignOut />
                            </div>
                        </div> 
                    </nav>
            </div>
        </div>
    );
};

export default Header;