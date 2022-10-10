import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/App.css';
import './styles/main.css';
import './styles/theme.css';
import App from './components/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

