import {ReactSession} from 'react-client-session';

const setToken = (token) => {
    ReactSession.set("token", token);
}

const getToken = () => {
    return ReactSession.get("token");
}

export {setToken, getToken}