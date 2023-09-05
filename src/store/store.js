import { createStore } from 'redux';
import postReducer from '../reducers/postReducer';

const store = createStore(postReducer);

export default store;