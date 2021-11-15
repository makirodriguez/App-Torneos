import './App.css';
import { Router, Switch, Route, Redirect } from "react-router-dom";
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Header  from './components/Header/Header';
import Home from './pages/Home/Home';
import Torneos from './pages/Torneos/Torneos';
import Perfil from './pages/Perfil/Perfil';
import MisTorneos from './pages/Mis torneos/Mis torneos';
import history from "./helpers/history";
import {withAuthenticator} from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Analytics, Auth} from 'aws-amplify';
import React, { useState, useEffect } from 'react';





Amplify.configure(awsconfig);

function App() {

  const [userName, setUserName] = useState('');
;
  useEffect(() => {
      Auth.currentAuthenticatedUser().then(user => {
        setUserName(user.userName);
      })
    }, [])

  return (
    <div className="App">
     <Router history={history}>
        <Header />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/torneos" exact component={Torneos} />
            <Route path="/perfil" exact component={Perfil} />
            <Route path="/mis-torneos" exact component={MisTorneos} />
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

