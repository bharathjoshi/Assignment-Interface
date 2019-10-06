    import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  gradedAssignments : [], 
  error: null,
  loading: false
};

const getGradedAssListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getGradedAssListSuccess = (state, action) => {
  return updateObject(state, {
    gradedAssignments : action.gradedAssignments ,
    error: null,
    loading: false
  });
};

const getGradedAssListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_GRADED_ASSIGNMENTS_LIST_START:
        return getGradedAssListStart(state, action);
      case actionTypes.GET_GRADED_ASSIGNMENTS_LIST_SUCCESS:
        return getGradedAssListSuccess(state, action);
      case actionTypes.GET_GRADED_ASSIGNMENTS_LIST_FAIL:
        return getGradedAssListFail(state, action);
      

      
      default:
        return state;
    }
  };
  
  export default reducer;