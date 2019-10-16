import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import history from './history';
import Login from './components/Login';
import Home from './components/Home';

const App: React.FC = () => {

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