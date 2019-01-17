import {combineReducers} from 'redux';
import {locale} from './reducers/locale';

const rootReducer = combineReducers({
  locale,
});
export default rootReducer;
