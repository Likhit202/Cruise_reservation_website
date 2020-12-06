import axios from "../helpers/axios"

export const addCruise = form => {
    return async dispatch => {
        const res= await axios.post(`cruise/create`, form);
        console.log(res);
    }
}