import { useContext } from 'react'
import { fetchNextPage } from '../context/RedditActions'
import RedditContext from '../context/RedditContext'
import SubredditItem from './SubredditItem'

function SubredditResults() {
  const { text, pages, posts, loading, dispatch } = useContext(RedditContext)

  // const handleScroll = async (e) => {
  //   if (e.target.clientHeight + e.target.scrollTop >= e.target.scrollHeight) {
  //     console.log('test', 123)
  //     const nextPage = await fetchNextPage
  //     dispatch({ type: 'GET_SUBREDDIT', payload: nextPage })
  //     dispatch({
  //       type: 'GET_POSTS',
  //       payload: nextPage.data.children.map((post) => {
  //         return post
  //       }),
  //     })
  //   }
  // }

  // @todo - Make it happen onScroll!
  const loadNextPage = async (e) => {
    let nextPageId = pages[pages.length - 1].data.after

    const nextPage = await fetchNextPage(text, 100, nextPageId)
    dispatch({ type: 'GET_SUBREDDIT', payload: nextPage })
    dispatch({
      type: 'GET_POSTS',
      payload: nextPage.data.children.map((post) => {
        return post
      }),
    })
  }

  if (!loading) {
    return (
      <div className='container text-center text-white'>
        <div className='row row-cols-3'>
          {posts.map((postArray) => {
            return postArray.map((post) => {
              if (
                ['.jpg', '.png', '.gif'].some((format) =>
                  post.data.url.endsWith(format)
                )
              ) {
                return <SubredditItem key={post.data.id} post={post} />
              }
            })
          })}
        </div>
        <button className='btn btn-danger' onClick={loadNextPage}>
          Load More
        </button>
      </div>
    )
  } else {
    return <h3 className='text-white'>Loading...</h3>
  }
}
export default SubredditResults
