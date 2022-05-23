import { getToken } from "./Client";

const request = (to, params, callback, method="POST") => {
    let fd = new FormData();
    for (let key in params) {
        fd.append(key, params[key]);
    }
    fetch(
        to,
        {
            method: method,
            body: method == "POST" ? fd : null,
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
    ).then(r => r.json()).then(r => {
        callback(r);
    })
}

export default request