import React from 'react';
import { Segment, List, Image } from 'semantic-ui-react';
import firebase from 'firebase';
import { UserListProps } from './UserList';

interface UserListItemProps {
    data: firebase.firestore.QueryDocumentSnapshot;
    itemClickListener:React.Dispatch<React.SetStateAction<string>>;
}

const UserListItem: React.FC<UserListItemProps> =
    ({ data, itemClickListener }) => {
        return <List.Item onClick={()=>itemClickListener(data.get('uid'))}>
            <Image avatar src={data.get('imageUrl')} />
            <List.Content>
                <List.Header>{data.get('name')}</List.Header>
            </List.Content>
        </List.Item>
    }

export default UserListItem;