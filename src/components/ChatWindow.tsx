import React, { useState, useEffect } from 'react';
import { Segment, Form, List, Container } from 'semantic-ui-react';
import { listenForChatChange, writeChatData } from '../api';
import firebase from 'firebase';
import ChatListItem from './ChatListItem';
import { ChatDataResult, Chat } from './interface';
import './ChatWindow.css';

import styled from 'styled-components';

const FormGroupStyle = styled(Form.Group)`
direction:flex;

`;

interface ChatWindowProps {
    data: string;
    uid: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ data, uid }) => {
    const initialState: ChatDataResult = {
        loading: false,
        data: []
    }
    const [chatData, setChatData] = useState(initialState);
    const [input, setInput] = useState('');

    useEffect(() => {
        const unsub = listenForChatChange(uid, data, chatData, setChatData);
        return () => {
            unsub();
        };
    }, [data]); // Only re-subscribe if data changes

    const onSendButtonClicked = () => {
        const chat: Chat = {
            message: input,
            senderId: uid,
            receiverId: data,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        writeChatData(chat);
        setInput('');
    }

    //listenForChatChange(data, chatData, setChatData);

    return <div className='container'>
        <div className='list'>
            <List>
                {chatData.data.map((item) => <ChatListItem key={item.id} uid={uid} data={item} />)}
            </List>
        </div>
        <Form className='input'>
            <Form.Group>
                <Form.Input onChange={(e) => setInput(e.target.value)}
                    value={input} placeholder='Type Message Here...' width={14} />
                <Form.Button primary onClick={onSendButtonClicked} width={2} >Send</Form.Button>
            </Form.Group>
        </Form>
    </div>
}

export default ChatWindow;