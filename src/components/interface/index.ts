export interface CustomUser {
    uid: string;
    name: string | null;
    imageUrl: string | null;
    email: string | null;
}

export interface LoginDataResult {
    error: string;
    loading: boolean;
    user?: CustomUser;
}

export interface HomeDataResult {
    error: string;
    loading: boolean;
}
export interface ChatDataResult {
    error?: string;
    loading: boolean;
    data?: firebase.firestore.QueryDocumentSnapshot[] | undefined;
}

export interface Chat {
    message: string;
    uid: string | undefined;
    timestamp: firebase.firestore.FieldValue;
}

export interface UserListDataResult extends HomeDataResult {
    data: Array<firebase.firestore.QueryDocumentSnapshot>;
}