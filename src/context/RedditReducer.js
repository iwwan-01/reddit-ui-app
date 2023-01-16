const redditReducer = (state, action) => {
  switch (action.type) {
    case 'GET_SUBREDDIT':
      return {
        ...state,
        pages: [...state.pages, action.payload],
        loading: false,
      }

    case 'GET_POSTS':
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      }

    case 'GET_NEXTPAGE':
      return {
        ...state,
        pages: [...state.pages, action.payload],
        loading: false,
      }

    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }

    case 'SET_TEXT':
      return {
        ...state,
        text: action.payload,
      }

    case 'CLEAR_SUBREDDIT':
      return {
        ...state,
        pages: [],
        posts: [],
      }

    default:
      return state
  }
}

export default redditReducer
