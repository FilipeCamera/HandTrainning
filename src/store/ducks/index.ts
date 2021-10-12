import {combineReducers} from 'redux';

import auth from './auth';
import visualized from './visualized';
import trainner from './trainner';

export default combineReducers({
  auth,
  visualized,
  trainner,
});
