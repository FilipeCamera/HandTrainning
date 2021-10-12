import {createAction, createReducer} from 'typesafe-actions';

const setVisualized = createAction('@visualized/SET_VISUALIZED')();
const setNotVisualized = createAction('@visualized/SET_NOT_VISUALIZED')();

const initialState = {
  visualized: true,
};

const reducer = createReducer(initialState)
  .handleAction(setVisualized, () => initialState)
  .handleAction(setNotVisualized, (state: any) => ({
    ...state,
    visualized: false,
  }));

const visualizedActions = {
  setVisualized,
  setNotVisualized,
};

export {reducer as default, visualizedActions};
