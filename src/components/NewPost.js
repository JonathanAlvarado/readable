import React, {Component} from 'react'
import serializeForm from 'form-serialize'
import { postPost } from '../utils/actions'

class NewPost extends Component {

  handleSubmitPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const post = {
      id: Math.random().toString(36).substr(-8),
      timestamp: Date.now(),
      title: values.title,
      body: values.body,
      author: values.author,
      category: values.category,
      voteScore: 1,
      deleted: false
    }
    this.props.dispatch(postPost(post))
    window.location.href="/"
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitPost}>
          <div>
            <label>Title</label>
            <input type="text" name="title" placeholder="Title"/>
          </div>
          <div>
            <label>Author</label>
            <input type="text" name="author" placeholder="Author"/>
          </div>
          <div>
            <label>Category</label>
            <select name="category">
              {this.props.categories.map(category =>
                <option key={category.name}>{category.name}
                </option>
              )}
            </select>
          </div>
          <div>
            <label>Post</label>
            <textarea name="body"></textarea>
          </div>
          <button>
            Add
          </button>
        </form>
      </div>
    )
  }
}

export default NewPost
