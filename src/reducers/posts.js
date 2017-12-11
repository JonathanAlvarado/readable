import {
	RECEIVE_POSTS, ADD_POST, EDIT_POST, DELETE_POST, UP_VOTE_POST, DOWN_VOTE_POST, SORT_BY_UP_VOTE_POSTS,
	SORT_BY_DOWN_VOTE_POSTS, SORT_BY_INC_TIME_POSTS, SORT_BY_DEC_TIME_POSTS,
} from '../actions'
import sortBy from 'sort-by'

const post = (state = [], action) => {

	const { id, timestamp, title, body, author, category, voteScore, deleted, posts } = action

	switch(action.type) {

		case RECEIVE_POSTS:
			let result = posts.reduce((obj,item) => {
  							obj.push(item);
  							return obj;
						}, []);
			return state.concat(result)

		case ADD_POST:
			return (state.concat([{
					id,
					timestamp,
					title,
					body,
					author,
					category,
					voteScore,
					deleted
				}]))

		case UP_VOTE_POST:
			return (state.map(post => {
				if(post.id === id) {
					post['voteScore'] = parseInt(post['voteScore'], 10) + 1
				}
				return post
			}))

		case DOWN_VOTE_POST:
			return (state.map(post => {
				if(post.id === id) {
					post['voteScore'] = parseInt(post['voteScore'], 10) - 1
				}
				return post
			}))

		case EDIT_POST:
			return state.filter(post => post.id !== id).concat(
				[{
					id,
					timestamp,
					title,
					body,
					author,
					category,
					voteScore,
					deleted
				}]
			)

		case DELETE_POST:
			return state.map(post => {
				if(post.id === id) {
					post.deleted = true
				}
				return post
			})

		case SORT_BY_UP_VOTE_POSTS:
			return [...state.sort(sortBy('voteScore'))]

		case SORT_BY_DOWN_VOTE_POSTS:
			return [...state.sort(sortBy('-voteScore'))]

		case SORT_BY_INC_TIME_POSTS:
			return [...state.sort(sortBy('timestamp'))]

		case SORT_BY_DEC_TIME_POSTS:
			return [...state.sort(sortBy('-timestamp'))]

		default:
			return state;
	}
}

export default post
