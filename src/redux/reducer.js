import { combineReducers } from "redux";

const initialState = {};

const root = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  root
});
