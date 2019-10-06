import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getAssListStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_LIST_START
  };
};

export const getAssListSuccess = assignments => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_SUCCESS,
    assignments
  };
};

export const getAssListFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_LIST_FAIL,
    error: error
  };
};

export const getAssList = token =>{
    return dispatch => {
        dispatch(getAssListStart())
        axios.defaults.headers = {
            "Content-Type":"application/json",
            Authorization : `Token ${token}`
        
        }
        console.log('step 1')
        axios
            .get("http://127.0.0.1:8000/assignments/")
            .then(res=>{
                const assignments = res.data
                dispatch(getAssListSuccess(assignments))
            })
            .catch(err => {

                dispatch(getAssListFail());
              });

            }
}








export const getAssDetailStart = () => {
  return {
    type: actionTypes.GET_ASSIGNMENT_DETAIL_START
  };
};

export const getAssDetailSuccess = assignment    => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_DETAIL_SUCCESS,
     assignment
  };
};

export const getAssDetailFail = error => {
  return {
    type: actionTypes.GET_ASSIGNMENTS_DETAIL_FAIL,
    error: error
  };
};

export const getAssDetail = (token ,id)=>{
    return dispatch => {
        dispatch(getAssDetailStart())
        axios.defaults.headers = {
            "Content-Type":"application/json",
            Authorization : `Token ${token}`
        
        }
        axios
            .get(`http://127.0.0.1:8000/assignments/${id}/`)
            .then(res=>{
              console.log(res.data)
                const assignment = res.data
                dispatch(getAssDetailSuccess(assignment))
            })
            .catch(err => {

                dispatch(getAssDetailFail());
              });

            }
}


export const createAssStart = () => {
  return {
    type: actionTypes.CREATE_ASSIGNMENTS_START
  };
};

export const createAssSuccess = ()    => {
  return {
    type: actionTypes.CREATE_ASSIGNMENTS_SUCCESS,
  };
};

export const createAssFail = error => {
  return {
    type: actionTypes.CREATE_ASSIGNMENTS_FAIL,
    error: error
  };
};

export const createAss = (token ,ass)=>{
    return dispatch => {
        dispatch(createAssStart())
        axios.defaults.headers = {
            "Content-Type":"application/json",
            Authorization : `Token ${token}`
        
        }
        axios
            .post(`http://127.0.0.1:8000/assignments/`,ass)
            .then(res=>{
               // const assignment = res.data
                dispatch(createAssSuccess())
            })
            .catch(err => {

                dispatch(createAssFail());
              });

            }
}
