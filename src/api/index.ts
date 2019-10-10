import app from './firebase';
import firebase from 'firebase';

export interface TestData {
    name: string;
}

export const signInAnonymously = (setError: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    app.auth().signInAnonymously().catch((error) => {
        setError(error);
    });
}

export const writeData = (collectionName: string, data: TestData, setError: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    app.firestore().collection(collectionName).add(data).catch(error => {
        setError(error);
    });
}

export const readData = (collectionName: string, setData: React.Dispatch<React.SetStateAction<firebase.firestore.QueryDocumentSnapshot[] | undefined>>, setError: React.Dispatch<React.SetStateAction<string | undefined>>): void => {
    app.firestore().collection(collectionName).get().then((data) => {
        setData(data.docs)
    }).catch(error => {
        setError(error);
    });
}