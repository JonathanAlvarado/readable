export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_POST = 'EDIT_POST'
export const EDIT_COMMENT = 'EDIT_COMMMENT'
export const DELETE_POST = 'DELETE_POST'
export const DELETE_COMMENT = 'DELETE_COMMMENT'
export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const UP_VOTE_POST = 'UP_VOTE_POST'
export const DOWN_VOTE_POST = 'DOWN_VOTE_POST'
export const UP_VOTE_COMMENT = 'UP_VOTE_COMMENT'
export const DOWN_VOTE_COMMENT = 'DOWN_VOTE_COMMENT'
export const SORT_BY_UP_VOTE_POSTS = 'SORT_BY_UP_VOTE_POSTS'
export const SORT_BY_DOWN_VOTE_POSTS = 'SORT_BY_DOWN_VOTE_POSTS'
export const SORT_BY_INC_TIME_POSTS = 'SORT_BY_INC_TIME_POSTS'
export const SORT_BY_DEC_TIME_POSTS = 'SORT_BY_DEC_TIME'
export const SORT_BY_UP_VOTE_COMMENTS = 'SORT_BY_UP_VOTE_COMMENTS'
export const SORT_BY_DOWN_VOTE_COMMENTS = 'SORT_BY_DOWN_VOTE_COMMENTS'
export const SORT_BY_INC_TIME_COMMENTS = 'SORT_BY_INC_TIME_COMMENTS'
export const SORT_BY_DEC_TIME_COMMENTS = 'SORT_BY_DEC_TIME_COMMENTS'
export const EDIT_FORM_BODY_POST = "EDIT_FORM_BODY_POST"
export const EDIT_FORM_TITLE_POST = "EDIT_FORM_TITLE_POST"
export const EDIT_FORM_BODY_COMMENT = "EDIT_FORM_COMMENT"
export const RECEIVE_SINGLE_COMMENT = "RECEIVE_SINGLE_COMMENT"

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORY,
    categories
  }
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function addPost({id, timestamp, title, body, author, category, voteScore, deleted}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export function upVotePost({id}) {
  return {
    type: UP_VOTE_POST,
    id
  }
}

export function downVotePost({id}) {
  return {
    type: DOWN_VOTE_POST,
    id
  }
}

export function editPost({id, timestamp, title, body, author, category, voteScore, deleted}) {
  return {
    type: EDIT_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export function sortByUpVotePosts(posts) {
  return {
    type: SORT_BY_UP_VOTE_POSTS,
    posts
  }
}

export function sortByDownVotePosts(posts) {
  return {
    type: SORT_BY_DOWN_VOTE_POSTS,
    posts
  }
}

export function sortByIncTimePosts(posts) {
  return {
    type: SORT_BY_INC_TIME_POSTS,
    posts
  }
}

export function sortByDecTimePosts(posts) {
  return {
    type: SORT_BY_DEC_TIME_POSTS,
    posts
  }
}

export function deletePost({id}) {
  return {
    type: DELETE_POST,
    id
  }
}

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function addComment({id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted}) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}

export function upVoteComment({id, parentId}) {
  return {
    type: UP_VOTE_COMMENT,
    id,
    parentId
  }
}

export function downVoteComment({id, parentId}) {
  return {
    type: DOWN_VOTE_COMMENT,
    id,
    parentId
  }
}

export function editComment({id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted}) {
  return {
    type: EDIT_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}

export function sortByUpVoteComments({parentId}) {
  return {
    type: SORT_BY_UP_VOTE_COMMENTS,
    parentId
  }
}

export function sortByDownVoteComments({parentId}) {
  return {
    type: SORT_BY_DOWN_VOTE_COMMENTS,
    parentId
  }
}

export function sortByIncTimeComments({parentId}) {
  return {
    type: SORT_BY_INC_TIME_COMMENTS,
    parentId
  }
}

export function sortByDecTimeComments({parentId}) {
  return {
    type: SORT_BY_DEC_TIME_COMMENTS,
    parentId
  }
}

export function deleteComment({id, parentId}) {
  return {
    type: DELETE_COMMENT,
    id,
    parentId
  }
}

export function editFormBodyPost({body}) {
  return {
    type: EDIT_FORM_BODY_POST,
    body
  }
}

export function editFormTitlePost({title}) {
  return {
    type: EDIT_FORM_TITLE_POST,
    title
  }
}

export function editFormBodyComment({body}) {
  return {
    type: EDIT_FORM_BODY_COMMENT,
    body
  }
}

export function receiveSingleComment(comment) {
  return {
    type: RECEIVE_SINGLE_COMMENT,
    comment
  }
}
