import React, { Component } from 'react'
import Card from './Card';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : []
    }
  }
  render() {
    const posts =this.state.posts
    return (
      <div className="flex overflow-hidden flex-col self-stretch pb-14 my-auto bg-gray-50 max-md:max-w-full px-4">
        News
        <div className='flex'>
          <div>

          </div>
          {
            posts.length ? posts.map(post =>(
              <Card 
                data={post}
              />
            ))
            :""
          }
        </div>
      </div>
    )
  }
}
