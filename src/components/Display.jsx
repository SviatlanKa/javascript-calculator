import React, { Component } from 'react';
import './App.css';

class Display extends Component {
    render() {
        return(
            <div id="display">
                <div id="expression">{this.props.expression}</div>
                <div id="input">{this.props.result}</div>
            </div>
        )
    }
}

export default Display;