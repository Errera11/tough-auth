import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import {useContext, useEffect} from 'react'
import {StoreContext} from './index';
import './App.css';
import {observer} from 'mobx-react-lite';

function App() {

    const {store} = useContext(StoreContext);

    useEffect(() => {
        if (localStorage.getItem('token')) store.checkAuth();
    }, []);

    if(store.isAuth) return (
        <div>
            <div className={'container'}>
                <p>You authorized</p>
                <input type={'button'} value={'Sign Out'} onClick={() => store.signOut()}/>
            </div>
        </div>
    );

    return (
        <div>
            <div className={'container'}>
                {store.isLoading ? <p>Loading...</p> : <LoginForm />}
            </div>
        </div>
    );
}

export default observer(App);
