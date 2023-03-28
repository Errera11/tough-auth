import {useState, FC, useContext} from "react";
import './LoginForm.css';
import {StoreContext} from '../../index';

const LoginForm: FC = () => {

    const {store} = useContext(StoreContext);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className={'formContainer'}>
            <h3>A simple form</h3>
            <input type={'email'} placeholder={'email'} value={email}
                   onChange={e => setEmail(e.target.value)}/>
            <input type={'password'} placeholder={'password'} value={password}
                   onChange={e => setPassword(e.target.value)}/>
            <input type={'button'} value={'Sign In'} onClick={() => store.signIn(email, password)}/>
            <input type={'button'} value={'Sign Up'} onClick={() => store.signUp(email, password)}/>
        </div>
    );
};

export default LoginForm;