import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CALC_PADS } from "./dataStorage";

ReactDOM.render(
    <App data={ CALC_PADS }/>, document.getElementById('root')
);