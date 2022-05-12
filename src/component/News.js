import React, { Component } from "react";
import Newsitem from "./Newsitem";
import "./news.css";
import Spinner from "./Spinner";

export class News extends Component {
  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    console.log("previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    console.log(this.state.page);
    console.log(this.props.pageSize);

    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    });
  };
  handleNextClick = async () => {
    console.log("Next");
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    console.log(this.state.page);
    console.log(this.props.pageSize);
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page + 1,

      articles: parsedata.articles,
      loading: false,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">News Club</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!(this.setState.loading) && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-3 " key={element.url}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 50) : ""
                  }
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
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
        </div>
      </div>
    );
  }
}

export default News;




