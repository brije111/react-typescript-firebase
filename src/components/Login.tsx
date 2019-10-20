import React, {useState} from 'react';
import { Segment, Dimmer, Button, Loader } from 'semantic-ui-react';
import { LoginDataResult } from './interface';
import { signInWithGoogle } from '../api';

const Login = () => {
    const initialState: LoginDataResult = {
        error: '',
        loading: false,
      }

      const [dataResult, setDataResult] = useState(initialState);
    return <Segment>
        <Dimmer className={dataResult.loading ? 'active inverted' : ''}>
            <Loader>Loading</Loader>
        </Dimmer>
        <Button primary
            onClick={() => signInWithGoogle(dataResult, setDataResult)}
            >Login with Google</Button>
    </Segment>
}

export default Login;