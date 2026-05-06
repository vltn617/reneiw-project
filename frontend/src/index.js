import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind 설정이 들어있는 파일
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);