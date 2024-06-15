import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

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
  constructor(props){
    super(props);
    console.log("Constructor from News component")
    this.state = {
    articles: [],
    loading: true,
    page: 1,
    totalResults: 0
    }
    document.title = `${this.props.category} - NewsMonkey`
  }

  async updateNews (){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6db50deaf276428ea5dbdc6bfe90f7c7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsData.articles,
      totalResults: parsData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount(){
    this.updateNews();
  }

  // handlePrev = async () =>{
  //   this.setState({page: this.state.page - 1})
  //   this.updateNews();
  // }

  // handleNext = async () =>{
  //   this.setState({page: this.state.page + 1})
  //   this.updateNews();
  // }

  fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6db50deaf276428ea5dbdc6bfe90f7c7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsData.articles),
      totalResults: parsData.totalResults
    })
  };

  render() {
    return (
      <>
      
        <h1 className='my-3 text-center'>NewsMonkey - Top {this.props.category} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container my-3'>
        <div className="row" key="1">
        {this.state.articles.map((element)=>{
          return <div className="col-md-4" key={element.key}>
          <NewsItem title={element.title ? element.title: ""} desc={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
      </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>
        </div> */}

      </>
    )
  }
}

export default News 
