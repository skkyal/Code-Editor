import {BrowserRouter as Router, Route} from 'react-router-dom'

import Specific from './routes/Specific'
import MainEditor from './routes/MainEditor'
import './App.css';

function App() {
  

  return (
    <Router>
      <div className="App">
        <Route path="/:_id" exact component={Specific} />
        <Route path="/" exact component={MainEditor} />
      </div>
    </Router>
  );
}

export default App;
