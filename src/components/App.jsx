import React, { Component } from 'react';
import Display from './Display';
import KeyPads from './KeyPads';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedKey: {},
            expression: [],
            result: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.addChar = this.addChar.bind(this);
        this.deleteChar = this.deleteChar.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    addChar(key) {
        const { expression } = this.state;
        let pressedKey = {...key};
        const result = key.text;
        expression.push(key.text);
        this.setState({ pressedKey, expression, result });
        console.log('this.state from addChar', this.state);
    }

    deleteChar() {
        const { expression } = this.state;
        expression.pop();
        const lastChar = expression.slice(-1)[0];
        console.log('lastChar', lastChar);
        let pressedKey = this.props.data.filter(char => char.text === lastChar);
        this.setState({ pressedKey, expression });
        console.log('this.state from deleteChar', this.state);
    }

    clearAll() {
        this.setState({
            pressedKey: {},
            expression: '',
            result: ''
        });
        console.log('this.state from clearAll', this.state);
    }

    calculate() {
        const { expression } = this.state;
        let result = eval(expression.join('')).toString();
        this.setState({ result });
        console.log('result', result);
    }

    handleClick(key) {
        const expressionLength = this.state.expression.length;
        console.log(key);
        if (key.type === 'digit') {
            if (expressionLength === 0) {
                if (key.id !== 'zero') this.addChar(key);
            } else this.addChar(key);
        } else if (key.type === 'operator') {
            if (expressionLength === 0) {
                alert('wrong expression');
                key = {};
            } else if (/[+-/*]/.test(this.state.expression.slice(-1)[0])) {
                this.deleteChar();
            }
            if (key !== {}) {
                console.log('key', key);
                this.addChar(key);
            }

        } else if (key.type === 'service') {
            switch (key.id) {
                case 'equals':
                    this.calculate();
                    break;
                case 'clear':
                    this.clearAll();
                    break;
                case 'backspace':
                    this.deleteChar();
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        return (
            //
            <div>
                <Display
                    expression={this.state.expression}
                    result={this.state.result}
                />
                <KeyPads
                    data={this.props.data}
                    onHandleClick={this.handleClick}
                />
            </div>
        )
    }
}

export default App;