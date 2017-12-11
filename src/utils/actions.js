import * as API from './api'

import {
  receiveCategories, receivePosts, upVotePost, downVotePost, deletePost, 
  addComment, upVoteComment, downVoteComment,
  deleteComment, receiveComments, receiveSingleComment
} from '../actions/index'


export const fetchCategories = () => dispatch => (
  API.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPostsAndComments = () => dispatch => (
  dispatch(fetchPosts())
)

export const fetchPosts = () => dispatch => (
  API.getAllPosts()
    .then((posts) => {
      Promise.all([
        dispatch(receivePosts(posts)),
        dispatch(fetchAllComments(posts))
      ])
    })
);

export const fetchAllComments = (posts) => dispatch => (
  posts.map((post) => API.getAllComments(post.id)
      .then(comments => dispatch(receiveComments(comments)))
  )
);

export const fetchComments = (id) => dispatch => (
  API.getAllComments(id)
    .then((comments) => dispatch(receiveComments(comments)))
);

export const postPost = (post) => dispatch => (
  API.createPost(post)
);

export const postComment = (comment) => dispatch => (
  API.createComment(comment)
    .then(() => dispatch(addComment(comment)))
);

export const upVotePost_wrapper = (id) => dispatch => (
  API.upVotePost(id)
    .then(() => dispatch(upVotePost({id})))
);

export const downVotePost_wrapper = (id) => dispatch => (
  API.downVotePost(id)
    .then(() => dispatch(downVotePost({id})))
);

export const deletePost_wrapper = (id) => dispatch => (
  API.deletePost(id)
    .then(() => dispatch(deletePost({ id })))
);

export const deleteComment_wrapper = (id, parentId) => dispatch => (
  API.deleteComment(id)
    .then(() => dispatch(deleteComment({id, parentId})))
);

export const upVoteComment_wrapper = (id, parentId) => dispatch => (
  API.upVoteComment(id)
    .then(() => dispatch(upVoteComment({id, parentId})))
);

export const downVoteComment_wrapper = (id, parentId) => dispatch => (
  API.downVoteComment(id)
    .then(() => dispatch(downVoteComment({id, parentId})))
);

export const receiveSingleComment_wrapper = (id) => dispatch => (
  API.getSingleComment(id)
    .then((comment) => dispatch(receiveSingleComment(comment)))
)
