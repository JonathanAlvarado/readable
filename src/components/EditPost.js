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
    else if (Object.keys(this.props.editFormBodyPost).length === 0 && this.props.editingPost.length > 0 ){
      this.props.editFormTitlePost.title = this.props.editingPost[0].title;
      this.props.editFormBodyPost.body = this.props.editingPost[0].body;
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
    window.location.href="/editPost/" + this.props.editingPost[0].id
  }

  setEditBodyFormPost = (e) => {
    const body = e.target.value
    this.props.dispatch(editFormBodyPost({body}))
  }

  setEditTitleFormPost = (e) => {
    const title = e.target.value;
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
  var editingPost = post.filter(post => post.id === ownProps.editingPostId);
  var titlePost = null;
  var bodyPost = null;

  if (Object.keys(editFormBodyPost).length){
    titlePost = editFormTitlePost;
    bodyPost = editFormBodyPost;
  }
  else if (Object.keys(editFormBodyPost).length === 0 && editingPost.length > 0){
    titlePost = {'title': editingPost[0].title}
    bodyPost = {'body': editingPost[0].body}
  }else{
    titlePost = {}
    bodyPost = {}
  }

  return {
    editingPost: editingPost,
    editFormBodyPost: bodyPost,
    editFormTitlePost: titlePost
  }
}

export default connect(mapStateToProps)(EditPost);
