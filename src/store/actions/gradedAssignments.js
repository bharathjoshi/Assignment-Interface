import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getGradedAssListStart = () => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENTS_LIST_START
  };
};

export const getGradedAssListSuccess = gradedAssignments => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENTS_LIST_SUCCESS,
    gradedAssignments
  };
};

export const getGradedAssListFail = error => {
  return {
    type: actionTypes.GET_GRADED_ASSIGNMENTS_LIST_FAIL,
    error: error
  };
};


export const getGradedAss= (token ,username)=>{
    return dispatch => {
        dispatch(getGradedAssListStart())
        axios.defaults.headers = {
            "Content-Type":"application/json",
            Authorization : `Token ${token}`
        
        }
        axios
            .get(`http://127.0.0.1:8000/graded-assignments/?username=${username}`)
            .then(res=>{
                const assignment = res.data
                dispatch(getGradedAssListSuccess(assignment))
            })
            .catch(err => {

                dispatch(getGradedAssListFail());
              });

            }
}
