import {createStore} from 'redux';
import {getType} from 'typesafe-actions';
import {persistStore, persistReducer} from 'redux-persist';
import reducers from './ducks';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
  key: 'HandTrainning',
  storage: AsyncStorage,
  whiteList: ['auth'],
};

const persistReduce = persistReducer(config, reducers);

const store = createStore(persistReduce);

const persist = persistStore(store);

const dispatchAction = (type: any, payload: any) => {
  return store.dispatch({type: getType(type), payload});
};

export {dispatchAction, persist, store as default};
