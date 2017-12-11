import {
  RECEIVE_CATEGORY,
} from '../actions'

const category = (state = {}, action) => {
  const {categories} = action
  switch (action.type) {
    case RECEIVE_CATEGORY:
      let result = categories['categories'].reduce((obj, item) => {
        obj[item.name] = item;
        return obj;
      }, {});
      return {
        ...state,
        ...result
      }
    default:
      return state;
  }
}

export default category
