import React from 'react';
import firebase from 'firebase';

const App: React.FC = () => {

  //console.log(firebase.auth().currentUser);

  const firebaseConfig = {
    apiKey: "AIzaSyBu49Ho-rbo775_1edI_ZxnxDugJrjewQE",
    authDomain: "react-typescript-firebas-d8ae3.firebaseapp.com",
    databaseURL: "https://react-typescript-firebas-d8ae3.firebaseio.com",
    projectId: "react-typescript-firebas-d8ae3",
    storageBucket: "react-typescript-firebas-d8ae3.appspot.com",
    messagingSenderId: "689903552752",
    appId: "1:689903552752:web:af835758d4ab3471491a35",
    measurementId: "G-2C8TKL8FP7"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

  const onFulfilled = (response: firebase.auth.UserCredential) => {
     const user = response.user;
    // const userId = user?.getIdToken();
    console.log(user);
  }

  const onRejected = (error: string) => {
    console.log(`error: ${error}`);
  }

  firebaseApp.auth().signInAnonymously().then(onFulfilled).catch(onRejected);

  return (
    <div>{firebaseApp.auth().currentUser}</div>
  );
}

export default App;
