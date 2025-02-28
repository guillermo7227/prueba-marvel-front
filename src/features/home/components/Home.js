import {default as HG} from "helpers/helpers";
import heroImg from 'assets/hero.png';
import { useNavigate } from "react-router-dom";

function Home() {
    const componentId = 'Home';
    const navigate = useNavigate();

    HG.isAuthorized();

    return(
        <div id={componentId}>
            <div class="bg-dark text-secondary px-4 py-5 text-center">
                <div class="py-5">
                    <h1 class="display-5 fw-bold text-white">🦸🏻‍♂️ Comics de Marvel 🦹</h1>
                    <div class="col-lg-6 mx-auto">
                        <p class="fs-5 mb-4">Visualiza los comics del mundo Marvel y guarda tus favoritos. Proyecto para prueba técnica. <br/>Guillermo Agudelo.</p>
                        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        { HG.userData?.token ?
                            <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold" onClick={_ => navigate('/comic')}>Ver Comics</button>
                        :
                            <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold" onClick={_ => navigate('/auth')}>Iniciar sesión</button>
                        }
                        </div>
                        <div className="overflow-hidden" style={{maxHeight:'30vh'}}>
                            <div className="container px-5">
                                <img src={heroImg} class="img-fluid rounded-3 ashadow-lg mt-4 mb-4" alt="Example image" width="700" height="500" loading="lazy"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;