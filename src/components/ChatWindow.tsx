import React, { useState, useEffect } from 'react';
import { Segment, Form, List } from 'semantic-ui-react';
import { listenForChatChange, writeChatData } from '../api';
import firebase from 'firebase';
import ChatListItem from './ChatListItem';
import { ChatDataResult, Chat } from './interface';

interface ChatWindowProps {
    data: string;
    id: string | undefined;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ data, id }) => {
    const initialState: ChatDataResult = {
        loading: false
    }
    const [chatData, setChatData] = useState(initialState);
    const [input, setInput] = useState('');

    useEffect(() => {
        const unsub = listenForChatChange(data, chatData, setChatData);
        return () => {
            unsub();
        };
    }, [data]); // Only re-subscribe if data changes

    const onSendButtonClicked = () => {
        const chat: Chat = {
            message: input,
            uid: id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        writeChatData(id, chat);
    }

    //listenForChatChange(data, chatData, setChatData);

    return <Segment>
        <List>
            {chatData.data?.map((item)=><ChatListItem data={item} />)}
        </List>
        <Form>
            <Form.Group>
                <Form.Input onChange={(e) => setInput(e.target.value)}
                    value={input} placeholder='Type Message Here...' width={14} />
                <Form.Button onClick={onSendButtonClicked} width={2} />
            </Form.Group>
        </Form>
    </Segment>
}

export default ChatWindow;