import React, { Component } from 'react';

class Display extends Component {
    render() {
        console.log(this.props.displayKey);
        return(
            <div id="display">{this.props.displayKey}</div>
        )
    }
}

export default Display;