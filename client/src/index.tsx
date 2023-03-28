import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = new Store();

interface IStore {
    store: Store
}
export const StoreContext = React.createContext<IStore>({store});

root.render(
    <StoreContext.Provider value={{store}} >
        <App />
    </StoreContext.Provider>
);


reportWebVitals();
