import app from './firebase';
import firebase from 'firebase';
import { LoginDataResult, HomeDataResult, CustomUser, ChatDataResult, Chat, UserListDataResult } from '../components/interface';
import history from '../history';

export interface TestData {
    name: string;
}

export const signInWithGoogle = (dataResult: LoginDataResult,
    setDataResult: React.Dispatch<React.SetStateAction<LoginDataResult>>): void => {

    dataResult.loading = true;
    setDataResult({ ...dataResult });
    const provider = new firebase.auth.GoogleAuthProvider();
    app.auth().signInWithPopup(provider).then((result) => {
        console.log('google sign in success');
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.providerId;
        }
        // The signed-in user info.
        const user = result.user;
        if (user)
            writeUser(user, dataResult, setDataResult);
        else {
            dataResult.loading = false;
            setDataResult({ ...dataResult });
        }

    }).catch(function (error) {
        console.log('google sign in fail');

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

export const writeChatData = (uid: string | undefined, chat: Chat): void => {
    app.firestore().collection('chat').doc(uid).collection('/chat').add(chat).then(() => {
        console.log('write chat data success');
    }).catch(error => {
        console.log(`write chat data error ${error}`);
    });
}

const writeUser = (user: firebase.User, dataResult: HomeDataResult,
    setDataResult: React.Dispatch<React.SetStateAction<HomeDataResult>>) => {
    const customUser: CustomUser = {
        uid: user.uid,
        name: user.displayName,
        imageUrl: user.photoURL,
        email: user.email
    }

    //check if user already exist
    app.firestore().collection('users').where('uid', '==', user.uid).get().then(value => {
        console.log('write user level 1 success');

        if (value.empty) {

            //there is no record of this user, let's write it
            app.firestore().collection('users').add(customUser).then(() => {
                console.log('write user level 2 success');

                dataResult.loading = false;
                //dataResult.user = customUser;
                setDataResult({ ...dataResult });
                history.push('/home');
                //getUsers(dataResult, setDataResult);
            }).catch(error => {
                console.log('write user level 2 fail');

                dataResult.loading = false;
                dataResult.error = error;
                setDataResult({ ...dataResult });
            })
        } else {//else, record already exist
            console.log('write user level 1 success');
            dataResult.loading = false;
            //dataResult.user = customUser;
            setDataResult({ ...dataResult });
            history.push('/home');
            //getUsers(dataResult, setDataResult);
        }
    }).catch(error => {
        dataResult.loading = false;
        dataResult.error = error;
        setDataResult({ ...dataResult });
    })
}

export const readData = (collectionName: string, uid: string,
    dataResult: HomeDataResult,
    setDataResult: React.Dispatch<React.SetStateAction<HomeDataResult>>): void => {

    dataResult.loading = true;
    setDataResult({ ...dataResult });
    app.firestore().collection(collectionName).doc(uid).get().then((data) => {
        dataResult.loading = false;
        //dataResult.chat = data.data;
        setDataResult({ ...dataResult });
    }).catch(error => {
        dataResult.loading = false;
        dataResult.error = error;
        setDataResult({ ...dataResult });
    });
}

export const getUsers = (dataResult: HomeDataResult,
    setDataResult: React.Dispatch<React.SetStateAction<HomeDataResult>>): void => {

    // dataResult.loading = true;
    // setDataResult({ ...dataResult });
    console.log('get users');

    app.firestore().collection('users').get().then((data) => {
        console.log('get users success');

        dataResult.loading = false;
        //dataResult.data = data.docs;
        setDataResult({ ...dataResult });
    }).catch(error => {
        console.log('get users fail');

        dataResult.loading = false;
        dataResult.error = error;
        setDataResult({ ...dataResult });
    });
}
export const listenForChatChange = (uid: string, dataResult: ChatDataResult,
    setDataResult: React.Dispatch<React.SetStateAction<ChatDataResult>>) => {

    dataResult.loading = true;
    setDataResult({ ...dataResult });
    const unsub = app.firestore().collection('chat')
        .doc(uid).collection('chat').onSnapshot(dataSnapshot => {
            dataResult.loading = false;
            dataResult.data = dataSnapshot.docs;
            setDataResult({ ...dataResult });
        }, err => {
            dataResult.loading = false;
            dataResult.error = err.message;
            setDataResult({ ...dataResult });
        });
    return unsub;
}

export const listenForUserListChange = (dataResult: UserListDataResult,
    setDataResult: React.Dispatch<React.SetStateAction<UserListDataResult>>) => {

    dataResult.loading = true;
    setDataResult({ ...dataResult });
    const unsub = app.firestore().collection('users').onSnapshot(dataSnapshot => {
        dataResult.loading = false;
        dataResult.data = dataSnapshot.docs;
        setDataResult({ ...dataResult });
    }, err => {
        dataResult.loading = false;
        dataResult.error = err.message;
        setDataResult({ ...dataResult });
    });
    return unsub;
}