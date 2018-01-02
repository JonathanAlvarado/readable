import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  upVotePost_wrapper,
  downVotePost_wrapper,
  deletePost_wrapper,
} from '../utils/actions'
import {
  sortByUpVotePosts,
  sortByDownVotePosts,
  sortByIncTimePosts,
  sortByDecTimePosts
} from '../actions'
import { Button } from 'reactstrap';


class PostList extends Component {

  handleDeletePost = (id) => {
    this.props.dispatch(deletePost_wrapper(id))
  }

  handleUpVotePost = (id) => {
    this.props.dispatch(upVotePost_wrapper(id))
  }

  handleDownVotePost = (id) => {
    this.props.dispatch(downVotePost_wrapper(id))
  }

  render() {

    return (
      <div>
        <hr/>
        <ul>
          <li>
            <Button
              color="secondary"
              onClick={() => this.props.dispatch(
              sortByUpVotePosts(this.props.posts))}
            >
              Sort by UpVotes
            </Button>
          </li>
          <li>
            <Button
              color="secondary"
              onClick={() => this.props.dispatch(
              sortByDownVotePosts(this.props.posts))}
            >
              Sort by DownVotes
            </Button>
          </li>
          <li>
            <Button
              color="secondary"
              onClick={() => this.props.dispatch(
              sortByIncTimePosts(this.props.posts))}
            >
              Sort by Incremental Time
            </Button>
          </li>
          <li>
            <Button
              color="secondary"
              onClick={() => this.props.dispatch(
              sortByDecTimePosts(this.props.posts))}
            >
              Sort by Decremental Time
            </Button>
          </li>
        </ul>
        <hr/>
        <ul className="post">
          {this.props.posts.map((post) => {
            if (!post.deleted) {
              return (
                <div key={post.id}>
                  <li>
                    <h3>
                      <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>
                      <br/>
                      Score : {post.voteScore}
                    </h3>
                    <p>
                      By: <strong>{post.author}</strong>
                      <br/>
                      At: <strong>{(new Date(post.timestamp)).toLocaleString()}</strong>
                    </p>
                    <div>
                      <Button
                        color="info"
                        onClick={() => this.handleUpVotePost(post.id)}
                      >
                        UpVote
                      </Button>
                      <Button
                        color="danger"
                        onClick={() => this.handleDownVotePost(post.id)}
                      >
                        DownVote
                      </Button>
                      <br/>
                      Comments: {
                        this.props.comments.hasOwnProperty(post.id) ? 
                        this.props.comments[post.id].length : 0}
                      <br/>
                      <Button
                        color="danger"
                        onClick={() => this.handleDeletePost(post.id)}
                      >
                        Delete
                      </Button>
                      <Link to={`/editPost/${post.id}`}>
                        <Button
                        color="success"
                        >
                        Edit
                        </Button>
                      </Link>
                    </div>
                  </li>
                  <hr/>
                </div>
              )
            } else {
              return null
            }
          })}
        </ul>
      </div>
    )
  }
}

export default PostList
