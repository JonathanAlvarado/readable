import React, { Component } from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import { editFormBodyComment } from '../actions'
import { editComment } from '../utils/api'
import { receiveSingleComment_wrapper } from '../utils/actions'
import { Button } from 'reactstrap';

class EditComment extends Component {

  componentDidMount() {
    this.props.dispatch(receiveSingleComment_wrapper(this.props.commentId))
  }

  handleEditComment = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const commentEdit = {
      timeStamp: Date.now(),
      body: values.comment,
    }
    editComment(this.props.commentId, commentEdit)
    window.location.href="/editComment/" + this.props.commentId
  }

  setEditBodyFormComment = (e) => {
    const body = e.target.value
    this.props.dispatch(editFormBodyComment({body}))
  }

  render() {
    const {comment} = this.props

    return (
      <div>
        <div>
          <h4>
            Edit Comment
          </h4>
          <form onSubmit={this.handleEditComment}>
            <div>
              <label>Comment</label>
              <br/>
              <textarea 
                type="text"
                name="comment"
                value={comment.body}
                onChange={this.setEditBodyFormComment}
              >
              </textarea>
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

function mapStateToProps({singleComment}, ownProps) {

  return {
    comment: singleComment,
    commentId: ownProps.commentId
  }
}

export default connect(mapStateToProps)(EditComment);
