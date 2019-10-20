import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import history from './history';
import Login from './components/Login';
import Home from './components/Home';
import app from '../src/api/firebase';

const App: React.FC = () => {
  //const user = app.auth().currentUser;

  //const uid = user?user.uid:'';
    return <Container>
        <Router history={history}>
                <Switch>
                    <Route path='/' exact component={Login} />
                    <Route path='/home' exact component={Home} />
                </Switch>
        </Router>
    </Container>;
}
export default App;