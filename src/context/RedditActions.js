const redditURL = 'https://www.reddit.com'

export const fetchSubreddit = async (subreddit, limit, options) => {
  const response = await fetch(
    `${redditURL}/r/${subreddit}.json?limit=${limit}`,
    {}
  )

  const data = await response.json()

  return data
}

export const fetchNextPage = async (subreddit, limit, nextPageId, options) => {
  const response = await fetch(
    `${redditURL}/r/${subreddit}.json?limit=${limit}&after=${nextPageId}`,
    {}
  )

  const data = await response.json()

  return data
}
