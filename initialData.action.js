import { categoryConstants, cruiseConstants, initialDataConstants } from "./constants";
import axios from "../helpers/axios";




export const getInitialData = () => {
    return async dispatch => {
        
        
        const res = await axios.post(`/initialData`);
        if(res.status === 200) {
            const { categories,  cruises } = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
               
           });
          dispatch({
             type : cruiseConstants.GET_ALL_CRUISES_SUCCESS,
               payload: { cruises } ,
            });
        }
        console.log(res)
        
    }
}