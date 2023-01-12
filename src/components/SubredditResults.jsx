import { useContext } from 'react'
import SubredditItem from './SubredditItem'
import RedditContext from '../context/RedditContext'

function SubredditResults() {
  const { pages, loading } = useContext(RedditContext)

  if (!loading) {
    return <div className='text-white'>results</div>
  } else {
    return <h3 className='text-white'>Loading...</h3>
  }
}
export default SubredditResults
