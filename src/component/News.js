import React, { useState } from "react";
import { useEffect } from "react";


import Newsitem from "./Newsitem";
import "./news.css";
import Spinner from "./Spinner"; 
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'



const News = (props) => {

  const[articles, setArticles] = useState([])
  const[loading, setLoading] = useState(true)
  const[page, setPage] = useState(1)
  const[totalResults, setTotalResults] = useState(0)

   
 



  const updateNews = async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30)
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles)
    setLoading(false)
    setTotalResults(parseData.totalResults)
   
    props.setProgress(100)

  }

useEffect(()=>{
   document.title=`${props.category}-News`;
  updateNews();
}, [])


  const fetchMoreData = async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page +1 )
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles))
    setTotalResults(parseData.totalResults)
    
  };
  
    return (
      <div className="container my-3">
        <h1 className="text-center">News Club</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length} 
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
          {articles.map((element) => {
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
            disabled={page <= 1}
            type="button"
            className="btn btn-dark "
            onClick={handlePrevClick}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &raquo;{" "}
          </button>
        </div> */}
      </div>
    );
  }

News.defaultProps = {
  country: "us",
  pageSize: 5,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;




