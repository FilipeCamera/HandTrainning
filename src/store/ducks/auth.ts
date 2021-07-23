import {createAction, createReducer} from 'typesafe-actions';

export const setUser = createAction('auth/SET_USER'){}
export const logout = createAction('auth/LOGOUT'){}

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
    state: undefined,
    course: undefined,
    university: undefined,
    experience: undefined,
    specs: undefined,
    problemHealth: undefined,
    weight: undefined,
    years: undefined,
    height: undefined,
  },
};

const reducer = createReducer(initialState).handleAction(setUser, (state: any, {payload}: any) => ({
  ...state,
  user: payload.data
})).handleAction(logout, () => initialState)

export default reducer