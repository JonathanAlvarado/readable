import React from 'react'
import PostList from './PostList'


const PostsCard = (props) => {
  return (
    <div>
      <h2>Posts</h2>
      <PostList
        dispatch={props.dispatch}
        posts={props.posts}
        comments={props.comments}/>
    </div>
  )
}

export default PostsCard
