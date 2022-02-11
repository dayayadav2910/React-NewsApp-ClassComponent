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
       this.updateNews()



    }
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page:1,
            totalResults:0
        }
    }
    async updateNews(pageNo){
        const url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7627c9b831b549a189503486a1a96f64&page=${this.state.page}&pageSize=20`;
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults })
    }



    handlePreviousClick = async ()=>{
        this.setState({page:this.state.page+1})
        this.updateNews()
    }
    handleNextClick = async ()=>{
        this.setState({page:this.state.page+1})
        this.updateNews()


    }
    
    fetchMoreData = async  () => {
        this.setState({page:this.state.page +1})
        const url =`https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7627c9b831b549a189503486a1a96f64&page=${this.state.page}&pageSize=20`;
        let data = await fetch(url);
        let parsedata = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedata.articles), totalResults: parsedata.totalResults })
      };
    
    render() {
        console.log("render");
        return (
            <div className='container my-3'>
                <h1 className='text-center' style={{margin: '40px 0px', marginTop:'100px'}}>News Monkey - Top Headlines of {this.props.category}</h1>
                <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length!== this.state.totalResults}
                        >
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (<div className="col-md-4 my-2">
                            <Newsitems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} url={element.url} />
                        </div>)
                    })}
                  

                </div>
                </InfiniteScroll>


            </div>

        )
    }
}

export default News