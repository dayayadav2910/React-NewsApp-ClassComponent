import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
        <Navbar> </Navbar>
        <LoadingBar
        color='#f11946'
        progress={100}
       
      />

          <Routes>
          <Route exact path="/" element={<News key="general" category="general"></News>}></Route>
          <Route exact path="/entertainment" element={<News key="entertainment" category="entertainment"></News>}></Route>
          <Route exact path="/business" element={<News key="business" category="business"></News>}></Route>
          <Route exact path="/health" element={<News key="health"  category="health"></News>}></Route>
          <Route exact path="/science" element={<News key="science" category="science"></News>}></Route> 
          <Route exact path="/sports" element={<News key="sports" category="sports"></News>}></Route>
          <Route exact path="/technology" element={<News key="technology"  category="technology"></News>}></Route>
          </Routes>
         
        </Router>        

      </div>
    )
  }
}
