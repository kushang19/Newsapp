import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(){
    super();
    console.log("Constructor from News component")
    this.state = {
    articles: [],
    loading: false,
    page: 1,
    }
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6db50deaf276428ea5dbdc6bfe90f7c7&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      articles: parsData.articles,
      totalResults: parsData.totalResults,
      loading: false
    })
  }

  handlePrev = async () =>{
    console.log("Prev");

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6db50deaf276428ea5dbdc6bfe90f7c7&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsData.articles,
      loading: false
    })
  }

  handleNext = async () =>{
    console.log("Next");

    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6db50deaf276428ea5dbdc6bfe90f7c7&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsData.articles,
        loading: false
      })
    } 

  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='my-3 text-center'>NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.key}>
          <NewsItem title={element.title ? element.title: ""} desc={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
      </div>
        })}
        </div>

        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>
        </div>

      </div>
    )
  }
}

export default News 
