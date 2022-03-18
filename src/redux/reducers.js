import {SET_USER_ID, SET_USER_ROL, SET_USER_NAME,SET_USER_CARGO} from './actions';

const initialState = {
  id:0,
  rol:3,
  cargo:'',
  name:''
}

function userReducer(state=initialState, action){
  switch (action.type){
    case SET_USER_ID:
      return {...state,id:action.payload };
    case SET_USER_ROL:
      return {...state,rol:action.payload };
    case SET_USER_CARGO:
      return {...state,cargo:action.payload };
    case SET_USER_NAME:
      return {...state,name:action.payload };
    default:
      return state;



  }

}

export default userReducer;
