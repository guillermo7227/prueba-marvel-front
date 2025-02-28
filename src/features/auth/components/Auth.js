import { useState } from "react";
import ApiAuth from "../api/api";
import {default as HG} from "helpers/helpers";
import LS from "helpers/localStorage";
import { useNavigate } from "react-router-dom";
import ProcessingScreen from "components/ProcessingScreen";

function Auth() {
    const navigate = useNavigate();
    const [isProcesing, setIsProcesing] = useState(false);
    const componentId='Auth';

    const userData = LS.get('userData');

    if(userData.token) navigate('/');


    function register(formData) {
        setIsProcesing(true);
        HG.jsonRequest({
            componentId,
            url: ApiAuth.register,
            method: 'POST',
            body: Object.fromEntries(formData),
            successCodes: [201],
            success: dataRes => {
                navigate('/auth');
                HG.showToast(componentId,'✅ Se creó el registro. Ya puede iniciar sesión con su email y contraseña')
            },
            final: () => setIsProcesing(false)
        })
    }

    function login(formData) {
        setIsProcesing(true);
        HG.jsonRequest({
            componentId,
            url: ApiAuth.login,
            method: 'POST',
            body: Object.fromEntries(formData),
            successCodes: [200],
            success: dataRes => {
                LS.set('userData', dataRes.data);
                navigate('/auth');
                HG.showToast(componentId,'✅ Bienvenido '+dataRes.data.user.nombre)
            },
            final: () => setIsProcesing(false)
        })
    }


    function clearForms() {
        document.getElementById("form-login").reset();
        document.getElementById("form-register").reset();
    }

    return (
        <div id={componentId}>
            <div className="row">
                <div className="col col-sm-8 col-md-6 col-lg-4 mx-auto">

                    <h4 className="mb-5">Inicie sesión o regístrese</h4>

                    {/* <!-- Pills navs --> */}
                    <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-login" role="tab"
                        aria-controls="pills-login" aria-selected="true" data-bs-toggle="tab" data-bs-target="#pills-login">Iniciar sesión</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="tab-register" role="tab" 
                        aria-controls="pills-register" aria-selected="false" data-bs-toggle="tab" data-bs-target="#pills-register">Registrarse</a>
                    </li>
                    </ul>   
                    {/* <!-- Pills navs --> */}

                    {/* <!-- Pills content --> */}
                    <div className="tab-content">
                    <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                        <form action={login} id="form-login">
                      
                        {/* <!-- Email input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input name="email" type="email" id="loginName" className="form-control" />
                            <label className="form-label" htmlFor="loginName">Email</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input name="password" type="password" id="loginPassword" className="form-control" />
                            <label className="form-label" htmlFor="loginPassword">Contraseña</label>
                        </div>

                        {/* <!-- Submit button --> */}
                        <button type="submit" disabled={isProcesing} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Iniciar sesión</button>

                        {/* <!-- Register buttons --> */}
                        <div className="text-center">
                            <p>¿No es un miembro? <a href="#!" onClick={_ => document.querySelector('#tab-register').click()}><b>Regístrese</b></a></p>
                        </div>
                        </form>
                    </div>
                    <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                        <form action={register}  id="form-register">
                        {/* <!-- Name input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input name="nombre" type="text" id="registerName" className="form-control" avalue="Guillermo Jose"/>
                            <label className="form-label" htmlFor="registerName" >Nombre</label>
                        </div>

                        {/* <!-- Identification input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input name="identificacion" type="text" id="registerIdentification" className="form-control"  avalue="112233"/>
                            <label className="form-label" htmlFor="registerIdentification">Identificación</label>
                        </div>

                        {/* <!-- Email input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input name="email" type="email" id="registerEmail" className="form-control"  avalue="guillej@gmail.com"/>
                            <label className="form-label" htmlFor="registerEmail">Email</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input name="password" type="password" id="registerPassword" className="form-control"  avalue="12345"/>
                            <label className="form-label" htmlFor="registerPassword">Contraseña</label>
                        </div>

                        {/* <!-- Repeat Password input --> */}
                        <div data-mdb-input-init className="form-outline mb-4">
                            <input name="confirmarPassword" type="password" id="registerRepeatPassword" className="form-control"  avalue="12345"/>
                            <label className="form-label" htmlFor="registerRepeatPassword">Confirmar contraseña</label>
                        </div>


                        {/* <!-- Submit button --> */}
                        <button type="submit" disabled={isProcesing} data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-3">Registrarse</button>
                        </form>
                    </div>
                    </div>
                    {/* <!-- Pills content --> */}
                </div>
            </div>

            {isProcesing ?
            <ProcessingScreen/>
            :<></>}

        </div>
    )
}


export default Auth;