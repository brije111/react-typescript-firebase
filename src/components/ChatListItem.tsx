import React from 'react';
import { List, Label, Segment, Container } from 'semantic-ui-react';
import styled from 'styled-components';

const ChatLabelStyle = styled(Label)`
text-align:center;

`;

interface Props {
    data: firebase.firestore.QueryDocumentSnapshot;
    uid: string
}

const ChatListItem: React.FC<Props> = ({ data, uid }) => {

    //const date = data.get('timestamp').toDate();
    const senderId = data.get('senderId');
    const formateDate = (date: Date) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //console.log(date.toLocaleDateString("en-US")); // 9/17/2016
        //console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
        return (date.toLocaleDateString("hi-IN", options)); // शनिवार, 17 सितंबर 2016
    }
    //console.log(data.get('timestamp').toDate());

    return <List.Item>
        <Container textAlign={senderId === uid ? 'right' : 'left'}>
            <Label basic color='red' pointing={senderId === uid ? 'right' : 'left'}>
                {data.get('message')}
                {/* {formateDate(date)} */}
            </Label>
        </Container>
    </List.Item>
}

export default ChatListItem;