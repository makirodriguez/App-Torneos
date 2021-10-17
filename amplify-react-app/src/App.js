import './App.css';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Header  from './components/Header';
import Home from './pages/Home/Home';
import Torneos from './pages/Torneos/Torneos';
import history from "./helpers/history";
import {AmplifySignOut, withAuthenticator} from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css'


Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
     <Router history={history}>
        <Header />
        <div class="App-header">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/torneos" exact component={Torneos} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router> 
    </div>
  );
}

export default withAuthenticator(App);
