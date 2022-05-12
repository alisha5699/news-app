import React, { Component } from "react";
import Newsitem from "./Newsitem";
import "./news.css";
import Spinner from "./Spinner"; 
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  articles = [];
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title=`${this.props.category}-News`;
  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
  

    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      
      articles: parsedata.articles,
      loading: false,
      totalResults: parsedata.totalResults
    });

  }

  async updateNews(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
  

    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews()
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
   let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
  

    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      
      articles: this.state.articles.concat(parsedata.articles),
      loading: false,
      totalResults: parsedata.totalResults
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
          hasMore={this .state.articles.length !== this.state.totalResults}
          loader={<h4> {this.state.loading && <Spinner />}</h4>}
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




