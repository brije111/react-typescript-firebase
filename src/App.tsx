import React, { useState } from 'react';
import firebase from 'firebase';
import app from './api/firebase';
import { signInAnonymously, writeData, readData, signInWithGoogle } from './api';
import { Container, Message, List, Segment, Dimmer, Loader, Button, Grid } from 'semantic-ui-react';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';

export interface CustomUser {
  uid: string;
  name: string | null;
  imageUrl: string | null;
  email: string | null;
}

export interface DataResult {
  error: string;
  data?: Array<firebase.firestore.QueryDocumentSnapshot>;
  loading: boolean;
  user?: CustomUser;
  chat?: firebase.firestore.DocumentData | undefined;
}

const App: React.FC = () => {

  const initialState: DataResult = {
    error: '',
    loading: false,
  }

  //console.log(firebase.auth().currentUser);
  const [dataResult, setDataResult] = useState(initialState);
  const [selectedUid, setSelectedUid] = useState('');

  const renderLogin = () => {
    return <Button primary
      onClick={() => signInWithGoogle(dataResult, setDataResult)}>Login with Google</Button>
  }

  const renderList = () => {
    return <Grid divided padded>
      <Grid.Row>
        <Grid.Column width={16}>
          <Message
            className={dataResult.error ? 'error' : 'success'}
            header={dataResult.error ? `Ops: ${dataResult.error}` : 'Welcome'}
            content={dataResult.error} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          {dataResult.data ? <UserList itemClickListener={setSelectedUid} data={dataResult.data} /> : null}
        </Grid.Column>
        <Grid.Column width={12}>
          {selectedUid ? <ChatWindow data={selectedUid} /> : null}
        </Grid.Column>
      </Grid.Row>
    </Grid>;
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
