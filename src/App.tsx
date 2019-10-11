import React, { useState } from 'react';
import firebase from 'firebase';
import app from './api/firebase';
import { signInAnonymously, writeData, readData, signInWithGoogle } from './api';
import { Container, Message, List, Segment, Dimmer, Loader, Button } from 'semantic-ui-react';

export interface DataResult {
  error: string;
  data: Array<firebase.firestore.QueryDocumentSnapshot>;
  loading: boolean;
  user: firebase.User | null;
}

const App: React.FC = () => {

  const user = app.auth().currentUser;

  const initialState = {
    error: '',
    data: new Array<firebase.firestore.QueryDocumentSnapshot>(),
    loading: false,
    user: user
  }

  //console.log(firebase.auth().currentUser);
  const [dataResult, setDataResult] = useState(initialState);

  //signInAnonymously(setError);
  //signInWithGoogle(dataResult, setDataResult);
  //writeData('test', { name: 'brijesh kumar' }, setError);
  readData('test', dataResult, setDataResult);

  const renderLogin = () => {
    return <Button primary
      onClick={() => signInWithGoogle(dataResult, setDataResult)}>Login with Google</Button>
  }

  const renderList = () => {
    return <Segment>
      <Message
        className={dataResult.error ? 'error' : 'success'}
        header={dataResult.error ? 'Ops' : 'Welcome'}
        content={dataResult.error} />
      <List>
        {dataResult.data ? dataResult.data.map(item => <List.Item key={item.id}>{JSON.stringify(item.data())}</List.Item>) : null}
      </List>
    </Segment>;
  }

  return (

    <Container>
      <Segment>
        <Dimmer className={dataResult.loading ? 'active inverted' : ''}>
          <Loader>Loading</Loader>
        </Dimmer>
        {dataResult.user ? renderList() : renderLogin()}

      </Segment>

    </Container>
  );
}

export default App;
