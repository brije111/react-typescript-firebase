import React, { useState } from 'react';
import { Segment, List } from 'semantic-ui-react';
import UserListItem from './UserListItem';



export interface UserListProps {
    data: Array<firebase.firestore.QueryDocumentSnapshot>;
    itemClickListener: React.Dispatch<React.SetStateAction<string>>;
}

const UserList: React.FC<UserListProps> = ({ data, itemClickListener }: UserListProps) => {




    return <List selection verticalAlign='middle'>
        {data.map(item => <UserListItem itemClickListener={itemClickListener} key={item.id} data={item} />)}
    </List>
}

export default UserList;