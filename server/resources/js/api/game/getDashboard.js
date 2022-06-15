import request from "../Request";


const getDashboard = ({setDashboard}) => {
    request('/api/game/get_dashboard', {}, r => {
        setDashboard(r.content);
    }, "GET");
};

export default getDashboard;