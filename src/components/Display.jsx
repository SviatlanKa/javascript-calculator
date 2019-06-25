import React, { Component } from 'react';

class Display extends Component {
    render() {
        console.log(this.props.displayKey);
        return(
            <div id="display">{this.props.expression}</div>
        )
    }
}

export default Display;