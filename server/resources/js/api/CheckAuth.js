import request from "./Request";

const checkAuth = (setAuth) => {
    request("/api/user", {}, r => {
        if (r.message) {
            setAuth(0);
        } else {
            setAuth(r.role.level);
        }
    }, "GET");
}

export default checkAuth;