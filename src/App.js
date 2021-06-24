import Navbar from './components/Navbar/Navbar';
import Home from './components/HomePage/Home';
import Create from './components/CreateUser/Create';
import EditUser from './components/EditUser/EditUser';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route path="/" exact>
              <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/edit/:userId">
            <EditUser />
          </Route>
         
        </Switch> 
      </div>
    </div>
    </Router>
  );
}

export default App;
