import request from "../Request";

const baseGameRequest = (api, setFunc) => {
    request(`/api/game/${api}`, {}, r => {
        setFunc(r.content);
    }, "GET");
}

export default baseGameRequest;