import React, { Component } from 'react';

class Display extends Component {
    render() {
        return(
            <div id="display">
                <p>{this.props.expression}</p>
                <p>{this.props.result}</p>
            </div>
        )
    }
}

export default Display;