import React, { Component } from "react";
import Newsitem from "./Newsitem";
import "./news.css";
import Spinner from "./Spinner"; 
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'



export class News extends Component {

  static defaultProps = {
    country: "us",
    pageSize: 5,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      
    };
    document.title=`${this.props.category}-News`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles,
      loading: false,
      totalResults: parseData.totalResults
    });
    this.props.setProgress(100)

  }


  async componentDidMount() {
    this.updateNews();
  }

  // handlePrevClick = async () => {
  //   this.setState({page: this.state.page-1})
  //   this.updateNews()
  // };
  // handleNextClick = async () => {
  //   this.setState({page: this.state.page +1})
  //   this.updateNews()
    
  // };

  fetchMoreData = async() => {
    
   this.setState({page: this.state.page + 1})
   const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
  

    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      
      articles: this.state.articles.concat(parseData.articles),
    
      totalResults: parseData.totalResults
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Club</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length} 
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-3 " key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 50) : ""
                  }
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
              
            );
            
          })}
          </div>
        </div>
        </InfiniteScroll>

        {/* for next previous button */}



        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark "
            onClick={this.handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;{" "}
          </button>
        </div> */}
      </div>
    );
  }
}

export default News;




