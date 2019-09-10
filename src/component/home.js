import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
export default class Home extends Component {
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
  render () {
    //our data befor sort
    const dataArray = this.state.data;
    let temp = [];

    dataArray.forEach( (item, id) => {
      let scoreSor = item.data;
      temp.push(scoreSor);
    })

    function sortArray(a, b) {
      const scoreA = a.score;
      const scoreB = b.score;

      let defaultScor = 0;

      if (scoreA < scoreB) {
        defaultScor = 1;
      }else if (scoreA > scoreB) {
        defaultScor = -1;
      }
      return defaultScor;
    }
    //our data after sort
    console.log(temp.sort(sortArray), 'sortArray');

    return (
      <div className="container">
        <div className="content">
          <div className="content_head">
            <h1 className="content-head_h1 main-color">Home</h1>
            <h3 className="content-head_h3 secondery-color">Top 10 posts</h3>
          </div>
          <div className="content-posts">
            {
              this.state.data ? <div className="main-list">
                <ul className="main-list_list">{temp.sort(sortArray).map( (item, id ) =>
                  <li className="list-item" key={item.id}>
                    <Link to={`www.reddit.com/${item.permalink}`}>
                      <h3 className="list-item_title main-color">{item.title}</h3>
                    </Link>
                    <div className="list-item_score secondery-color">
                      <Link to={`post/${item.id}`}>
                        <span className="list-item_score-prefixed">{item.subreddit_name_prefixed}</span>
                      </Link>
                      <span className="list-item_score-score">{item.score}</span>
                    </div>
                  </li>
                  )}</ul>
              </div> : ``
            }
          </div>
        </div>
      </div>
    )
  }
}
