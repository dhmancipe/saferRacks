export const SET_USER_ID='SET_USER_ID';
export const SET_USER_ROL='SET_USER_ROL';
export const SET_USER_CARGO='SET_USER_CARGO';
export const SET_USER_NAME='SET_USER_NAME';

export const setId = id => dispatch => {
  dispatch({
    type:SET_USER_ID,
    payload:id,
  });
};

export const setRol = rol => dispatch => {
  dispatch({
    type:SET_USER_ROL,
    payload:rol,
  });
};

export const setCargo = cargo => dispatch => {
  dispatch({
    type:SET_USER_CARGO,
    payload:cargo,
  });
};

export const setName = name => dispatch => {
  dispatch({
    type:SET_USER_NAME,
    payload:name,
  });
};
