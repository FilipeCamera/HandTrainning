import {createAction, createReducer} from 'typesafe-actions';

const setUser = createAction('auth/SET_USER')();
const logout = createAction('auth/LOGOUT')();

const initialState: any = {
  user: {
    uid: undefined,
    email: undefined,
    type: undefined,
    plan: undefined,
    name: undefined,
    slogan: undefined,
    avatar: undefined,
    cnpj: undefined,
    city: undefined,
    uf: undefined,
    sex: undefined,
    course: undefined,
    university: undefined,
    experience: undefined,
    specs: undefined,
    problemHealth: undefined,
    weight: undefined,
    age: undefined,
    height: undefined,
    limitGym: undefined,
    limitCommon: undefined,
    limitTrainner: undefined,
    userAssociate: undefined,
    completeRegister: undefined,
  },
};

const reducer = createReducer(initialState)
  .handleAction(setUser, (state: any, {payload: data}: any) => ({
    ...state,
    user: data,
  }))
  .handleAction(logout, () => initialState);

const authActions = {
  setUser,
  logout,
};

export {reducer as default, authActions};
