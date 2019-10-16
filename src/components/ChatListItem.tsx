import React from 'react';
import { List } from 'semantic-ui-react';

interface Props {
    data:firebase.firestore.QueryDocumentSnapshot;
}

const ChatListItem:React.FC<Props> = ({data}) => {
    return <List.Item>
        <h3>{data.get(`message ${data.get('uid')}`)}</h3>
        <h4>{data.get('timestamp')}</h4>
    </List.Item>
}

export default ChatListItem;