import {Link} from "react-router-dom"; 
import LS from "helpers/localStorage";
import { useNavigate } from "react-router-dom";


function Header() {
    let userData = LS.get('userData');
    const navigate = useNavigate();

    function cerrarSesion() {
        LS.remove('userData');
        userData = {};
        navigate('/');
    }
    
    return(
        <div className="mb-4 ">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li class="nav-item">
                            {/* <a class="nav-link active" aria-current="page" href="#">Home</a> */}
                            <Link className="nav-link active" to ="/"> 🏠 Home </Link>
                            </li>
                            <li class="nav-item">
                            {/* <a class="nav-link" href="#">Features</a> */}
                            <Link className="nav-link active" to ="/comic"> 🦹 Comics </Link>
                            </li>
                            <li class="nav-item">
                            {/* <a class="nav-link" href="#">Pricing</a> */}
                            <Link className="nav-link active" to ="/favorite"> 🌟 Mis Favoritos </Link>
                            </li>
                            <li class="nav-item">
                            {/* <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a> */}
                            {
                                userData.token ?
                                <a className="nav-link active" href="#!" onClick={cerrarSesion}> 🔒 Cerrar Sesión </a>
                                :
                                <Link className="nav-link active" to ="/auth"> 🔑 Iniciar Sesión </Link>
                            }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
        </div>
    )
}

export default Header;