import React, {Component} from 'react'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import { Button } from 'reactstrap';
import {
  fetchComments, upVotePost_wrapper, downVotePost_wrapper, deletePost_wrapper,
  postComment, upVoteComment_wrapper,
  downVoteComment_wrapper, deleteComment_wrapper
} from '../utils/actions'
import { sortByUpVoteComments, sortByDownVoteComments, sortByIncTimeComments,
  sortByDecTimeComments } from '../actions'
import { Link } from 'react-router-dom'


class Post extends Component {

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId))
  }

  handleUpVotePost = (id) => {
    this.props.dispatch(upVotePost_wrapper(id))
  }

  handleDownVotePost = (id) => {
    this.props.dispatch(downVotePost_wrapper(id))
  }

  handleDeletePost = (id) => {
    this.props.dispatch(deletePost_wrapper(id))
  }

  handleSubmitComment = (postId) => (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true})
    const comment = {
      id: Math.random().toString(36).substr(-8),
      parentId: postId,
      timestamp: Date.now(),
      body: values.comment,
      author: values.author,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }
    this.props.dispatch(postComment(comment))
    e.target.comment.value = ""
    e.target.author.value = ""
  }

  handleUpVoteComment = (id, parentId) => {
    this.props.dispatch(upVoteComment_wrapper(id, parentId))
  }

  handleDownVoteComment = (id, parentId) => {
    this.props.dispatch(downVoteComment_wrapper(id, parentId))
  }

  handleDeleteComment = (id, parentId) => {
    this.props.dispatch(deleteComment_wrapper(id, parentId))
  }

  render() {
    const {selectedPost, postId, comment} = this.props

    if(selectedPost.length === 0 && postId !== 'posts') {
      if(Object.keys(comment).length >  0 && comment[postId] && comment[postId][0].parentDeleted === true) {
        return (
          <h3>Post deleted</h3>
        )
      }
    }

    return (
      <div>
        {selectedPost.map((postSelected) => 
          <div key={postSelected.id}>
            <div>
              <h1>{postSelected.title}</h1>
              <h3>
                <div>
                  Category: {postSelected.category}
                </div>
              </h3>
              <hr/>
              <p>
                By: <strong>{postSelected.author}</strong><br/>
                At: <strong>{(new Date(postSelected.timestamp)).toLocaleString()}</strong>
              </p>
              <hr/>
              <h3>{postSelected.body}</h3>
              <hr/>
              <div>
                <Button
                  color="info"
                  onClick={() => this.handleUpVotePost(postSelected.id)}
                >
                  UpVote
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.handleDownVotePost(postSelected.id)}
                >
                  DownVote
                </Button>
                <br/>
                <b>Score : {postSelected.voteScore}</b>
                <br/>
                <br/>
                <Button
                  color="danger"
                  onClick={() => this.handleDeletePost(postSelected.id)}
                >
                  Delete Post
                </Button>
                <Link to={`/editPost/${postSelected.id}`}>
                  <Button
                    color="success"
                  >
                  Edit Post
                  </Button>
                </Link>
              </div>
              <hr/>
              <div>              
                <h3>
                  Comments
                </h3>
                <div>
                  <h4>Total comments: {
                    this.props.comment.hasOwnProperty(postId) ? 
                    this.props.comment[postId].length : 0}
                  </h4>
                </div>
              </div>
              <hr/>
              <div>
                <h4>Leave a Comment:</h4>
                <form onSubmit={this.handleSubmitComment(postId)}>
                  <div>
                    <input type="text" name="author" placeholder="Author"/>
                  </div>
                  <div>
                    <textarea type="text" name="comment" placeholder="Add Comment">
                    </textarea>
                  </div>
                  <button>Comment</button>
                </form>
              </div>
            </div>
            <div>
              {this.props.comment[postId] && (
                <div>
                  <div>
                    <ul>
                      <li>
                        <Button
                          color="secondary"
                          onClick={() => this.props.dispatch(
                            sortByUpVoteComments({parentId: postSelected.id}))}
                        >
                          Sort by UpVotes
                        </Button>
                      </li>
                      <li>
                        <Button
                          color="secondary"
                          onClick={() => this.props.dispatch(
                            sortByDownVoteComments({parentId: postSelected.id}))}
                        >
                          Sort by DownVotes
                        </Button>
                      </li>
                      <li>
                        <Button
                          color="secondary"
                          onClick={() => this.props.dispatch(
                            sortByIncTimeComments({parentId: postSelected.id}))}
                        >
                          Sort by Incremental Time
                        </Button>
                      </li>
                      <li>
                        <Button
                          color="secondary"
                          onClick={() => this.props.dispatch(
                            sortByDecTimeComments({parentId: postSelected.id}))}
                        >
                          Sort by Decremental Time
                        </Button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <hr/>
              <div>
                {this.props.comment[postId] && this.props.comment[postId].map(
                  (comment) => {
                  if (!comment.deleted) {
                    return (
                      <div key={comment.id}>
                        <div>
                          <h4>
                            By: <strong>{comment.author}</strong>
                            <p>At:  
                              <strong>
                                 {(new Date(comment.timestamp)).toLocaleString()}
                              </strong>
                            </p>
                          </h4>
                          <br/>
                          <p>{comment.body}</p>
                          <br/>
                          <b>Vote Score : {comment.voteScore}</b>
                          <br/>
                          <Button
                            color="info"
                            onClick={() => this.handleUpVoteComment(
                              comment.id, postId)}
                          >
                            UpVote
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => this.handleDownVoteComment(
                              comment.id, postId)}
                          >
                            DownVote
                          </Button>
                          <br/>
                          <Button
                            color="danger"
                            onClick={() => this.handleDeleteComment(comment.id, postId)}
                          >
                            Delete
                          </Button>
                          
                          <Link to={`/editComment/${comment.id}`}>
                            <Button
                              color="success"
                              >
                              Edit
                            </Button>
                          </Link>
                        </div>
                        <hr />
                      </div>
                    )
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({postId, posts, comment}, ownProps) {
  // post.filter(post => post.id === ownProps.postId),
  return {
    selectedPost: ownProps.posts.filter(post => post.id === ownProps.postId),
    comment: ownProps.comment,
    postId: ownProps.postId
  }
}

// export default withRouter(Post)
export default connect(mapStateToProps)(Post);
