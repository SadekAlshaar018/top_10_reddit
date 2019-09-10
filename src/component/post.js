import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Back from '../Back.svg'
export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    };
  }
  componentDidMount () {
    const url = 'https://www.reddit.com/best.json?limit=10';
    fetch(url)
      .then( data => {
        return data.json();
      })
      .then( data => {
        // console.log(data);
        this.setState({
          data: data.data.children
        })
      })
      .catch( err => {
        console.log(err);
      })
  }

  render() {
    const { params } = this.props.match
    // console.log(this.props.match);
    return (
      <div className="post-page">
        <div className="container">
          <div className="inner">
            <Link to={`/home`}>
              <img src={Back} alt="" />
            </Link>
          </div>
          <div className="content">
            {
              this.state.data ? <div className="main-list">
                <ul className="main-list_list">{this.state.data.map( (item, id ) =>
                  params.id === item.data.id ? <li className="list-item" key={item.data.id}>
                      <h3 className="list-item_title main-color">{item.data.title}</h3>
                    <div className="list-item_score secondery-color">
                      <span className="list-item_score-prefixed">{item.data.subreddit_name_prefixed}</span>
                      <span className="list-item_score-score">{item.data.score}</span>
                    </div>
                  </li> : ''
                  )}</ul>
              </div> : ``
            }
          </div>
        </div>
      </div>
    )
  }
}
