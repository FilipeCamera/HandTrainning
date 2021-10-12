import {createAction, createReducer} from 'typesafe-actions';

const setGymAssociate = createAction('@trainner/SET_GYM_ASSOCIATE')();
const removeGymAssociate = createAction('@trainner/REMOVE_GYM_ASSOCIATE')();

const initialState = {
  gym: undefined,
};

const reducer = createReducer(initialState)
  .handleAction(setGymAssociate, (state: any, {payload: data}: any) => ({
    ...state,
    gym: data,
  }))
  .handleAction(removeGymAssociate, () => initialState);

const trainnerActions = {
  setGymAssociate,
  removeGymAssociate,
};
export {reducer as default, trainnerActions};
