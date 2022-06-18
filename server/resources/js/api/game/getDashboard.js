import baseGameRequest from "./baseGetRequest";

const getDashboard = ({setDashboard}) => baseGameRequest('get_dashboard', setDashboard);

export default getDashboard;