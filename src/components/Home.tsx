import React, { useState } from 'react';
import firebase, { auth } from 'firebase';
import app from '../api/firebase';
import { readData, signInWithGoogle } from '../api';
import { Container, Message, List, Segment, Dimmer, Loader, Button, Grid } from 'semantic-ui-react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import { HomeDataResult } from './interface';
import history from '../history';

const Home: React.FC = () => {

    const initialState: HomeDataResult = {
        error: '',
        loading: false,
    }

    //console.log(firebase.auth().currentUser);
    const [dataResult, setDataResult] = useState(initialState);
    const [selectedUid, setSelectedUid] = useState('');

    const user = app.auth().currentUser;
    if (!user) {
        history.push('/');
    }
    const uid = user ? user.uid : '';

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
                    <UserList uid={uid} itemClickListener={setSelectedUid} />
                </Grid.Column>
                <Grid.Column width={12}>
                    {selectedUid ? <ChatWindow uid={uid} data={selectedUid} /> : null}
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
                {renderList()}
            </Segment>
        </Container>
    );
}

export default Home;
