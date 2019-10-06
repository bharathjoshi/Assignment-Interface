
    
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  assignments : [],
  currentAssignment : {}, 
  error: null,
  loading: false
};

const getAssListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssListSuccess = (state, action) => {
  console.log(action.user,111)
  return updateObject(state, {
    assignments : action.assignments ,
    error: null,
    loading: false
  });
};

const getAssListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const getAssDetailStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getAssDetailSuccess = (state, action) => {
  console.log(action.assignment,111)
  
  return updateObject(state, {
    currentAssignment: action.assignment  ,
    error: null,
    loading: false
  });
};

const getAssDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};
const createAssStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const createAssSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
};

const createAssFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ASSIGNMENT_LIST_START:
      return getAssListStart(state, action);
    case actionTypes.GET_ASSIGNMENTS_LIST_SUCCESS:
      return getAssListSuccess(state, action);
    case actionTypes.GET_ASSIGNMENTS_LIST_FAIL:
      return getAssListFail(state, action);
    case actionTypes.GET_ASSIGNMENT_DETAIL_START:
      return getAssDetailStart(state, action);
    case actionTypes.GET_ASSIGNMENTS_DETAIL_SUCCESS:
      return getAssDetailSuccess(state, action);
    case actionTypes.GET_ASSIGNMENTS_DETAIL_FAIL:
      return getAssDetailFail(state, action);
    case actionTypes.CREATE_ASSIGNMENTS_START:
      return createAssStart(state, action);
    case actionTypes.CREATE_ASSIGNMENTS_SUCCESS:
      return createAssSuccess(state, action);
    case actionTypes.CREATE_ASSIGNMENTS_FAIL:
      return createAssFail(state, action);
    
    default:
      return state;
  }
};

export default reducer;
