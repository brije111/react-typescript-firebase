import React, { useState } from 'react';
import firebase from 'firebase';
import { signInAnonymously, writeData, readData } from './api';
import { Container, Message } from 'semantic-ui-react';

const App: React.FC = () => {

  //console.log(firebase.auth().currentUser);
  const [user, setUser] = useState<firebase.User>();
  const [error, setError] = useState<string>();
  const [data, setData] = useState<firebase.firestore.QueryDocumentSnapshot[]>();

  signInAnonymously(setError);
  writeData('test', { name: 'brijesh kumar' }, setError);
  readData('test', setData, setError);
  //console.log(app.auth().currentUser);

  //firebaseApp.auth().signInAnonymously().then(onFulfilled).catch(onRejected);

  return (
    <Container>
      <Message />
    </Container>
  );
}

export default App;
