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
        let str = '';
        switch (key.type) {
            case 'digit':
               str = 'digit';
               break;
            case 'operator':
               str = 'operator';
               break;
            case 'special':
                str = 'special';
                break;
            case 'service':
                str = 'service';
                break;
            default:
                str = 'some code';
                break;
        }
        console.log('result: ', str);

        const pressedKey = { ...key };
        this.setState({ pressedKey });
        console.log('this.state', this.state.pressedKey);
    }

    render() {
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