import React, { useState, useEffect } from 'react';
import { Segment, List } from 'semantic-ui-react';
import UserListItem from './UserListItem';
import { UserListDataResult } from './interface';
import { listenForUserListChange } from '../api';



export interface UserListProps {
    itemClickListener: React.Dispatch<React.SetStateAction<string>>;
    uid: string;
}



const UserList: React.FC<UserListProps> = ({ itemClickListener, uid }: UserListProps) => {

    const initialState: UserListDataResult = {
        data: [],
        error: '',
        loading: false
    }

    const [dataResult, setDataResult] = useState(initialState);

    useEffect(() => {
        const unsub = listenForUserListChange(dataResult, setDataResult);
        return () => {
            unsub();
        };
    }, [dataResult.data.length]); // Only re-subscribe if data changes

    console.log(uid);
    
    return <List selection verticalAlign='middle'>
        {dataResult.data.filter(item => item.get('uid') !== uid).map(item => <UserListItem itemClickListener={itemClickListener} key={item.id} data={item} />)}
    </List>
}

export default UserList;