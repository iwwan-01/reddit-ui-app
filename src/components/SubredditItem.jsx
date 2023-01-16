function SubredditItem({ post }) {
  return (
    <div className='container my-4'>
      <h6>{post.data.title}</h6>
      <img className='img-fluid' src={post.data.url} alt={post.data.title} />
    </div>
  )
}
export default SubredditItem
