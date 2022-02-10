import React, { Component } from 'react'

export class Newsitems extends Component {
    render() {
        let {title,description,imageurl,url} = this.props
        return (
          
                <div className="card" style={{width: "18rem"}}>
                    <img src={imageurl} style={{height:'200px'}} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={url} className="btn my-1 btn-primary">Read More</a>
                    </div>
                </div>
      
        )
    }
}

export default Newsitems