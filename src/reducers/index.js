import {combineReducers} from 'redux'
import {
  EDIT_FORM_BODY_POST, EDIT_FORM_TITLE_POST, EDIT_FORM_BODY_COMMENT, RECEIVE_SINGLE_COMMENT
} from '../actions'
import comment from './comments'
import category from './categories'
import post from './posts'

const editFormTitlePost = (state = {}, action) => {

  const {title} = action

  switch (action.type) {
    case EDIT_FORM_TITLE_POST:
      return {
        ...state,
        title
      }
    default:
      return state
  }
}

const editFormBodyPost = (state = {}, action) => {

  const {body} = action

  switch (action.type) {
    case EDIT_FORM_BODY_POST:
      return {
        ...state,
        body
      }
    default:
      return state
  }
}

const editFormBodyComment = (state = {}, action) => {

  const {body} = action

  switch (action.type) {
    case EDIT_FORM_BODY_COMMENT:
      return {
        ...state,
        body
      }
    default:
      return state
  }
}

const singleComment = (state = {}, action) => {

  const {body, comment} = action

  switch (action.type) {
    case RECEIVE_SINGLE_COMMENT:
      return {
        ...state,
        ...comment
      }
    case EDIT_FORM_BODY_COMMENT:
      return {
        ...state,
        'body': body
      }
    default:
      return state
  }
}

export default combineReducers({
  category,
  post,
  comment,
  editFormBodyPost,
  editFormTitlePost,
  editFormBodyComment,
  singleComment,
})
