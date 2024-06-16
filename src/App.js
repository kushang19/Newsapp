import React,{useState} from 'react'
import LoadingBar from 'react-top-loading-bar';
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"; 
import './App.css';

const App = () => {
  const pageSize = 9;
  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0) 

    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}key="business" pageSize={pageSize} country="in" category="Business" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}key="sports" pageSize={pageSize} country="in" category="Sports" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}key="science" pageSize={pageSize} country="in" category="science" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}key="health" pageSize={pageSize} country="in" category="Health" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}key="technology" pageSize={pageSize} country="in" category="Technology" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}key="entertainment" pageSize={pageSize} country="in" category="Entertainment" />} />
        </Routes>
        </Router>
      </div>
    )
}

export default App;
