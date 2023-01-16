import { createContext, useReducer } from 'react'
import redditReducer from './RedditReducer'

const RedditContext = createContext()

export const RedditProvider = ({ children }) => {
  const initialState = {
    text: '',
    pages: [],
    posts: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(redditReducer, initialState)

  return (
    <RedditContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RedditContext.Provider>
  )
}

export default RedditContext
