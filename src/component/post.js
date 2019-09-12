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
    const  formatNum = (num) => {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
    return (
      <div className="post__page">
            <div className="post__page-inner">
              <Link to={`/home`}>
                <img src={Back} alt="" />
              </Link>
            </div>
            {
              this.state.data ? <div className="post__page-main__post">

                <div className="main-post_list">{this.state.data.map( (item, id ) =>
                  params.id === item.data.id ? <div className="post__item" key={item.data.id}>
                      <div className="post__item-details">
                        <h1 className="main-color bold">{item.data.subreddit_name_prefixed}</h1>
                        <span className="subdetails secondery-color">Subreddit details</span>
                      </div>
                      <div className="post__item-title">
                        <h3 className="post_title main-color title">Title</h3>
                        <span className="lightblue">{item.data.title}</span>
                      </div>
                      <div className="post__item-description">
                      <h3 className="post_title main-color title">Public description</h3>
                      {
                        item.data.all_awardings[0].description.length > 0 ?
                        <span className="lightblue">{item.data.all_awardings[0].description}</span>: ''
                      }
                      </div>
                      <div className="post__item-score main-color">
                        <h3 className="post_title title">Subscriber count</h3>
                        <span className="post_score-score lightblue">{formatNum(item.data.subreddit_subscribers)}</span>
                      </div>
                  </div> : ''
                )}</div>
              </div> : ``
            }
          </div>
    )
  }
}
