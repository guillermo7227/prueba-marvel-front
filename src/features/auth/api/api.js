import ApiGeneral from "app/api/api";

const ApiAuth = {
    register: `${ApiGeneral.host}/api/auth/register`,
    login: `${ApiGeneral.host}/api/auth/login`,
} 

export default ApiAuth;