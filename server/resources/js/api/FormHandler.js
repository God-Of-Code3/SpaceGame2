
const fetchForm = (to, method, f, messages, setMessages, setFieldErrors, callback=()=>{}) => {
    // fetch(to, {
    //     method: method,
    //     body: new FormData(f),
    //     headers: {
    //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    //     }
    // }).then(r => r.json()).then(r => {
    //     setMessages(r.formAlerts);
    //     setFieldErrors(r.fieldErrors);
    //     callback(r);
    // });
    const fd = new FormData(f);
    if (method == "PATCH") {
        fd.append("_method", "PATCH");
    }
    axios(
        {
            url: to,
            method: method != "PATCH" ? method : "POST",
            data: fd
        }
    ).then(r => {
        setMessages(r.data.formAlerts);
        setFieldErrors(r.data.fieldErrors);
        callback(r.data);
    });
    
}


export {fetchForm}