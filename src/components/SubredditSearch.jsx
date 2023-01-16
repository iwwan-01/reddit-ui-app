import { useContext } from 'react'
import { fetchSubreddit } from '../context/RedditActions'
import RedditContext from '../context/RedditContext'

function SubredditSearch() {
  const { text, pages, posts, dispatch } = useContext(RedditContext)

  const handleChange = (e) => {
    const text = e.target.value
    dispatch({ type: 'SET_TEXT', payload: text })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    //@todo - Fix the nested if statement!
    if (text === '') {
      //@todo - Replace with an alert!
      console.log('Please enter something')
    } else {
      // @todo - Could be written better!
      if (pages.length !== 0 && posts.length !== 0) {
        dispatch({ type: 'CLEAR_SUBREDDIT' })
      } else dispatch({ type: 'SET_LOADING' })
      const subreddit = await fetchSubreddit(text.toLowerCase(), 100)
      dispatch({ type: 'GET_SUBREDDIT', payload: subreddit })
      dispatch({
        type: 'GET_POSTS',
        payload: subreddit.data.children.map((post) => {
          return post
        }),
      })
    }
  }

  return (
    <div className='container my-2'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='input-group'>
            <input
              className='form-control'
              type='text'
              placeholder='Enter a subreddit name'
              value={text}
              onChange={handleChange}
            />
            <button type='submit' className='btn btn-danger'>
              Go
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SubredditSearch
