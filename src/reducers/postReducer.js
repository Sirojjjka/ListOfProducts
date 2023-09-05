const initialState = {
    posts: [

    ],
    filters: {
      status: 'All',
      colors: [],
    },
  };
  
  const ADD_TODO = 'ADD_TODO';
  const ADD_ITEMS = 'ADD_ITEMS'
  const REMOVE_TODO = 'REMOVE_TODO';
  const START_EDIT_POST = 'START_EDIT_POST';
  const EDIT_POST = 'EDIT_POST';
  const SAVE_POST = 'SAVE_POST';
  const ADD_COMMENT = 'ADD_COMMENT';
  const REMOVE_COMMENT = 'REMOVE_COMMENT';
  const EDIT_COMMENT = 'EDIT_COMMENT';
  const SAVE_COMMENT = 'SAVE_COMMENT';
  

  function postsReducer(state = initialState.posts, action) {
    switch (action.type) 
    {
      case ADD_TODO:
        return [...state, action.payload];
    
      case ADD_ITEMS:
        return {
            ...state,
            posts: [...state.posts, action.payload],
          };
  
      case START_EDIT_POST:
        return state.map((post) => ({
          ...post,
          isEditing: post.id === action.payload,
        }));
  
      case EDIT_POST:
        return state.map((post) =>
          post.id === action.payload.id ? { ...post, [action.payload.field]: action.payload.value } : post
        );
  
      case SAVE_POST:
        return state.map((post) =>
          post.id === action.payload.id ? { ...post, title: action.payload.title, body: action.payload.body, isEditing: false } : post
        );
  
      case REMOVE_TODO:
        return state.filter((post) => post.id !== action.payload);
  
        case ADD_COMMENT:
            const { postId } = action.payload;
            const { text } = action.payload.comment;
            return state.map((post) =>
              post.id === postId
                ? { ...post, comments: [...post.comments, { id: post.comments.length, text }] }
                : post
            );
      case REMOVE_COMMENT:
        const { postId: removedPostId, commentId: removedCommentId } = action.payload;
        return state.map((post) =>
          post.id === removedPostId
            ? { ...post, comments: post.comments.filter((comment) => comment.id !== removedCommentId) }
            : post
        );
  
      case EDIT_COMMENT:
        const { postId: editedPostId, commentId: editedCommentId, editedText } = action.payload;
        return state.map((post) =>
          post.id === editedPostId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment.id === editedCommentId ? { ...comment, text: editedText } : comment
                ),
              }
            : post
        );
  
      default:
        return state;
    }
  }
  
  function filtersReducer(state = initialState.filters, action) {
    return state;
  }
  
  function rootReducer(state = initialState, action) {
    return {
      posts: postsReducer(state.posts, action),
      filters: filtersReducer(state.filters, action),
    };
  }
  
  export default rootReducer;
  