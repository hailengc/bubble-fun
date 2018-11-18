import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterMap from "./router/RouterMap";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RouterMap />, document.getElementById('root'));
registerServiceWorker();
