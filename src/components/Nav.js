import React from 'react'
import {Link} from 'react-router-dom'

export default function Nav(props) {
  return (
    <div>
      <Link to="/">
        Home
      </Link>
      <br/>
      <Link to={`/newPost`}>
        New Post
      </Link>
      <ul>
        {props.category.map(category =>
          <li key={category.name}>
            <Link to={`/${category.name}/posts`}>{category.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
