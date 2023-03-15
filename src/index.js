import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import { socket, SocketContext } from './socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <SocketContext.Provider value={socket}>
                    {/* We wrap the app in the socketContext. If we want to use redux then it needs to be inside the store wrap from redux. Every time
                  the root is rerendering (most commonly when a user enters the website or when the user is refreshing) a new connection is made to the server.*/}
                    <App />
                </SocketContext.Provider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
