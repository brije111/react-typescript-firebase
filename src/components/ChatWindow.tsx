import React, { useState } from 'react';
import { Segment, Grid, Input, Button, Form } from 'semantic-ui-react';
import { listenForChatChange } from '../api';
export interface ChatDataResult {
    error?: string;
    loading: boolean;
    data?: firebase.firestore.DocumentData | undefined;
}

interface ChatWindowProps {
    data: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ data }) => {
    const initialState = {
        loading: false
    }
    const [chatData, setChatData] = useState(initialState);
    const [input, setInput] = useState('');

    //listenForChatChange(data, chatData, setChatData);

    return <Segment>
        <Form>
            <Form.Group>
                <Form.Input value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Type Message Here...' width={14} />
                <Form.Button width={2}>Send</Form.Button>
            </Form.Group>
        </Form>
    </Segment>
}

export default ChatWindow;