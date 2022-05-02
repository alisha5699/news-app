import React, { Component } from "react";
import Newsitem from "./Newsitem";
import './news.css'

export class News extends Component {
  articles = []
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false
    };
    
  }

  async componentDidMount(){
      let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=1&pageSize=21` 
      let data = await fetch(url);
      let parsedata = await data.json()
      console.log(parsedata);
      this.setState({articles: parsedata.articles})

      
  }

  handlePrevClick = async() =>{
    console.log("previous")
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=${this.state.page - 1}&pageSize=21`; 
    let data = await fetch(url);
    let parsedata = await data.json()
    this.setState({
      page: this.state.page -1,
      articles: parsedata.articles
    })

  }
  handleNextClick = async () =>{
    console.log("Next")
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=e321e7c8be2b4de1814ef55540d7bdd8&page=${this.state.page + 1}&pageSize=21`; 
    let data = await fetch(url);
    let parsedata = await data.json()
    this.setState({
      page: this.state.page + 1,
      articles: parsedata.articles
    })
    
    
  }
  render() {
    return (
      <div className="container my-3">
        <h1>This is news</h1>
        <div className="row">
          {this.state.articles.map((element) => {
          
            return (
              <div className="col-md-4 my-3 " key={element.url}>
                <Newsitem 
                  title={ element.title? element.title.slice(0,30):""}
                  description={element.description? element.description.slice(0,50):""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                />
              </div>
            ); 
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClickS}>Next &raquo; </button>
        </div>


      </div>
    );
  }
}

export default News;
