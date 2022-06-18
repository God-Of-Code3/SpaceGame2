import baseGameRequest from "./baseGetRequest";

const getSystems = ({setSystems}) => baseGameRequest('get_systems', setSystems);

export default getSystems;