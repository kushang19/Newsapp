import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom"; 

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<News key="general" pageSize={9} country="in" category="general" />} />
          <Route exact path="/business" element={<News key="business" pageSize={9} country="in" category="business" />} />
          <Route exact path="/sports" element={<News key="sports" pageSize={9} country="in" category="sports" />} />
          <Route exact path="/science" element={<News key="science" pageSize={9} country="in" category="science" />} />
          <Route exact path="/health" element={<News key="health" pageSize={9} country="in" category="health" />} />
          <Route exact path="/technology" element={<News key="technology" pageSize={9} country="in" category="technology" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={9} country="in" category="entertainment" />} />
        </Routes>
        </Router>
      </div>
    )
  }
}

// 6db50deaf276428ea5dbdc6bfe90f7c7