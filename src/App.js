import './App.css';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import  {LoginComponent}  from './components/login';
import RaceDashboardComponent from './components/race-dashboard';

import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

function App() {
  return (
    <Router>
    <div className="App">
    <Switch>
    <Switch>
          <PublicRoute restricted={false} component={LoginComponent} path="/" exact />
          <PublicRoute restricted={false} component={LoginComponent} path="/signin" exact />
          <PrivateRoute component={RaceDashboardComponent} path="/dashboard" exact />
        </Switch>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
