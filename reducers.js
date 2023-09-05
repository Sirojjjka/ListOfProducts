import { combineReducers } from 'redux';


export const postsReducer = (state = [], action) => {
    // реализация редьюсера для постов
    return state
  };
  
  export const commentsReducer = (state = [], action) => {
    // реализация редьюсера для комментариев
    return state
  };


const rootReducer = combineReducers({
  posts: postsReducer,
  // ... other reducers
});

export default rootReducer;