const fetchForm = (to, method, f, messages, setMessages, callback=()=>{}) => {
    fetch(to, {
        method: method,
        body: new FormData(f),
        headers: {
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    }).then(r => r.json()).then(r => {
        setMessages(r.formAlerts);
        callback(r);
    });
}


export {fetchForm}