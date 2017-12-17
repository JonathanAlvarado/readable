import React, {Component} from 'react'
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { Button } from 'reactstrap';
import { editFormBodyPost, editFormTitlePost } from '../actions'
import { editPost } from '../utils/api'


class EditPost extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.editingPost.length !== nextProps.editingPost.length) {
      this.props.dispatch(
        editFormTitlePost({
          title: nextProps.editingPost[0] ? nextProps.editingPost[0].title : "loading"
        }))

      this.props.dispatch(
        editFormBodyPost({
          body: nextProps.editingPost[0] ? nextProps.editingPost[0].body : "loading"
        }))
    }
  }

  handleEditPost = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const postEdit = {
      title: values.title,
      body: values.body,
    }
    editPost(this.props.editingPost[0].id, postEdit)
  }

  setEditBodyFormPost = (e) => {
    const body = e.target.value
    this.props.dispatch(editFormBodyPost({body}))
  }

  setEditTitleFormPost = (e) => {
    const title = e.target.value
    this.props.dispatch(editFormTitlePost({title}))
  }

  render() {
    const {editFormBodyPost, editFormTitlePost} = this.props

    return (
      <div>
        <div>
          <h4>
            Edit Post
          </h4>
          <form onSubmit={this.handleEditPost}>
            <div>
              <label>Title</label>
              <input name="title" type="text"
                value={
                  editFormTitlePost ?
                  editFormTitlePost.title : "loading..."
                }
                onChange={this.setEditTitleFormPost}
              />
            </div>
            <div>
              <label>Post</label>
              <input 
                name="body"
                type="text"
                value={
                  editFormBodyPost ?
                  editFormBodyPost.body : "loading..."
                }
                onChange={this.setEditBodyFormPost}
              />
            </div>
            <Button
              color="secondary"
            >
              Save
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({post, editFormBodyPost, editFormTitlePost}, ownProps) {
  return {
    editingPost: post.filter(post => post.id === ownProps.editingPostId),
    editFormBodyPost: editFormBodyPost,
    editFormTitlePost: editFormTitlePost
  }
}

export default connect(mapStateToProps)(EditPost);
