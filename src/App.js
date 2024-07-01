import React,{useState} from 'react'
import LoadingBar from 'react-top-loading-bar';
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"; 
import './App.css';

const App = () => {
  const pageSize = 9;
  const country = "in";
  const REACT_APP_NEWS_API= '6db50deaf276428ea5dbdc6bfe90f7c7'
  // const apiKey = process.env.REACT_APP_NEWS_API;
  const apiKey = REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0) 

    return (
      <div>
        <Router>
        <NavBar />
        <LoadingBar color='#f11946'progress={progress}/>

        <Routes>
          <Route exact path="/" 
          element={
          <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" />  }/>

          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}key="business" pageSize={pageSize} country={country} category="Business" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}key="sports" pageSize={pageSize} country={country} category="Sports" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}key="science" pageSize={pageSize} country={country} category="science" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}key="health" pageSize={pageSize} country={country} category="Health" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}key="technology" pageSize={pageSize} country={country} category="Technology" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}key="entertainment" pageSize={pageSize} country={country} category="Entertainment" />} />
        </Routes>

        </Router>
      </div>
    )
}

export default App;
