import React from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import {useContext, useEffect, useState} from 'react'
import {StoreContext} from './index';
import './App.css';
import {observer} from 'mobx-react-lite';
import userService from './service/user-service';
import IUser from './models/IUser';

function App() {

    const {store} = useContext(StoreContext);

    const [users, setUsers] = useState([] as IUser[]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        } else {
            store.setLoading(false);
        }
    }, []);

    async function getUsers() {
        const response = await userService.getUsers();
        setUsers([...response.data]);
    }

    if(store.isLoading) return (
        <div>
            <div className={'container'}>
                <p>Loading...</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className={'container'}>
                {store.isAuth ? <div><p>You authorized {store.user?.email}</p>
                        <p>Your account {store.user?.isActivated ? 'is activated' : 'does not activated'}</p>
                    <input type={'button'} value={'Sign Out'} onClick={() => store.signOut()}/>
                    <input type={'button'} value={'Get Users'} onClick={() => getUsers()}/>
                    {users.map(user => <div key={user.email}>{user.email}</div>)}
                </div> :
                    <LoginForm />}
            </div>
        </div>
    );
}

export default observer(App);
