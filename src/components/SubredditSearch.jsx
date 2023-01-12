import { useState, useContext } from 'react'
import { fetchNextPage, fetchSubreddit } from '../context/RedditActions'
import RedditContext from '../context/RedditContext'

function SubredditSearch() {
  const [text, setText] = useState('')
  const { pages, posts, dispatch } = useContext(RedditContext)

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (text === '') {
      //@todo - Replace with an alert!
      console.log('Please enter something')
    } else {
      dispatch({ type: 'SET_LOADING' })
      const subreddit = await fetchSubreddit(text.toLowerCase(), 25)
      dispatch({ type: 'GET_SUBREDDIT', payload: subreddit })
      // This works correctly! ✅
      dispatch({
        type: 'GET_POSTS',
        payload: subreddit.data.children.map((post) => {
          return post
        }),
      })

      // This works correctly! ✅
      const nextPage = await fetchNextPage(
        text.toLowerCase(),
        25,
        subreddit.data.after
      )
      dispatch({ type: 'GET_NEXTPAGE', payload: nextPage })

      // This doesn't work correctly! ❌
      // @todo - Fix this dispatch function!
      // --- GET_NEXTPAGE_POSTS
      //   dispatch({
      //     type: 'GET_POSTS',
      //     // There is a mistake somewhere here!  👇🏻
      //     // GET_POSTS uses map, which returns a brand new array!
      //     // Therefore the structure of state.posts array changes!
      //     payload: pages.map((page) => {
      //       page.data.children.map((post) => {
      //         return post
      //       })
      //     }),
      //   })
      // --- GET_NEXTPAGE_POSTS

      setText('')
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
