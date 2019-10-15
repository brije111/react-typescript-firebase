import app from './firebase';
import firebase from 'firebase';
import { DataResult } from '../App';

export interface TestData {
    name: string;
}

export const signInAnonymously = (dataResult: DataResult, setDataResult: React.Dispatch<React.SetStateAction<DataResult>>): void => {

    dataResult.loading = true;
    setDataResult({ ...dataResult });
    app.auth().signInAnonymously().then(() => {
        dataResult.loading = false;
        setDataResult({ ...dataResult });
    }).catch((error) => {
        dataResult.loading = false;
        dataResult.error = error;
        setDataResult({ ...dataResult });
    });
}

export const signInWithGoogle = (dataResult: DataResult,
    setDataResult: React.Dispatch<React.SetStateAction<DataResult>>): void => {

    dataResult.loading = true;
    setDataResult({ ...dataResult });
    const provider = new firebase.auth.GoogleAuthProvider();
    app.auth().signInWithPopup(provider).then((result) => {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.providerId;
        }
        // The signed-in user info.
        const user = result.user;
        dataResult.loading = false;
        dataResult.user = user;
        setDataResult({ ...dataResult });
    }).catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        dataResult.loading = false;
        dataResult.error = error;
        setDataResult({ ...dataResult });
    });
}

export const writeData = (collectionName: string, data: TestData, dataResult: DataResult,
    setDataResult: React.Dispatch<React.SetStateAction<DataResult>>): void => {

    dataResult.loading = true;
    setDataResult({ ...dataResult });
    app.firestore().collection(collectionName).add(data).then(() => {
        dataResult.loading = false;
        setDataResult({ ...dataResult });
    }).catch(error => {
        dataResult.loading = false;
        dataResult.error = error;
        setDataResult({ ...dataResult });
    });
}

export const readData = (collectionName: string,
    dataResult: DataResult,
    setDataResult: React.Dispatch<React.SetStateAction<DataResult>>): void => {

    //dataResult.loading = true;
    //setDataResult({ ...dataResult });
    app.firestore().collection(collectionName).get().then((data) => {
        dataResult.loading = false;
        dataResult.data = data.docs;
        setDataResult({ ...dataResult });
    }).catch(error => {
        dataResult.loading = false;
        dataResult.error = error;
        setDataResult({ ...dataResult });
    });
}

export const authStateChangeListener = (dataResult: DataResult,
    setDataResult: React.Dispatch<React.SetStateAction<DataResult>>): void => {
    console.log('outside auth stw change');
    dataResult.loading = true;
    setDataResult({ ...dataResult });
    app.auth().onAuthStateChanged((user) => {
        console.log('got user');
        dataResult.loading = false;
        dataResult.user = user;
        setDataResult({ ...dataResult });
    })
}