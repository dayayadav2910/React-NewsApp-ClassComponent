import React, { Component } from 'react'
import Newsitems from './Newsitems'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        category : "General",
        // pagesize : "5"
    }

      static propTypes = {
            // pagesize : PropTypes.number,
            category: PropTypes.string,
      }

    articles = []

    async componentDidMount() {
        let url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7627c9b831b549a189503486a1a96f64&page=1&pageSize=20`;
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults })



    }
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page:1
        }
    }
    handlePreviousClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7627c9b831b549a189503486a1a96f64&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);
        let parsedata = await data.json();

        this.setState({
            page : this.state.page-1,
            articles: parsedata.articles 

        })
    }
    handleNextClick = async ()=>{
        if(this.state.page + 1 >Math.ceil(this.state.totalResults/20)){

        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7627c9b831b549a189503486a1a96f64&page=${this.state.page+1}&pageSize=20`;
            let data = await fetch(url);
            let parsedata = await data.json();

            this.setState({
                page : this.state.page + 1,
                articles: parsedata.articles 
            })
        }


    }

    render() {
        console.log("render");
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin: '40px 0px', marginTop:'100px'}}>News Monkey - Top Headlines of {this.props.category}</h1>
                <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!== this.totalResults}
                        loader={<h4>Loading...</h4>}
                        >
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (<div className="col-md-4 my-2">
                            <Newsitems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} url={element.url} />
                        </div>)
                    })}
                  

                </div>
                </InfiniteScroll>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button"   className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News