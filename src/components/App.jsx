import React, { Component } from 'react';
import Display from './Display';
import KeyPads from './KeyPads';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedKey: {}
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(key) {
        const pressedKey = { ...key };
        this.setState({ pressedKey });
        console.log('this.state', this.state.pressedKey);
    }

    render() {
        // const displayKey = this.state.pressedKey;
        // console.log('displayKey', displayKey.text);
        return (
            //
            <div>
                <Display displayKey={this.state.pressedKey.text} />
                <KeyPads
                    data={this.props.data}
                    onHandleClick={this.handleClick}
                />
            </div>
        )
    }
}

export default App;