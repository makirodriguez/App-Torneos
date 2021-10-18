import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react';
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div class="p-3 bg-dark text-white">
            <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                    </a>
            
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to="/" class="nav-link px-2 text-secondary">Home</Link></li>
                        <li><Link to="/torneos" class="nav-link px-2 text-white">Torneos</Link></li>
                        <li><Link to="#" class="nav-link px-2 text-white">FAQs</Link></li>
                    </ul>
            
                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                        <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search"></input>
                    </form>
            
                    <div class="text-end">
                        <AmplifySignOut />
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default Header;