import React, { Component } from 'react'
import Newsitems from './Newsitems'

export class News extends Component {
    articles = []

    async componentDidMount() {
        let url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=7627c9b831b549a189503486a1a96f64&page=1pageSize=20';
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
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7627c9b831b549a189503486a1a96f64&page=${this.state.page-1}&pageSize=20`;
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
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=7627c9b831b549a189503486a1a96f64&page=${this.state.page+1}&pageSize=20`;
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
                <h1>News Monkey - Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (<div className="col-md-4 my-2">
                            <Newsitems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} url={element.url} />
                        </div>)
                    })}

                </div>

                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button"   className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>

        )
    }
}

export default News