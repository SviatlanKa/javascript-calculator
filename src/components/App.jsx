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
        this.allClear = this.allClear.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    addChar(key) {
        const { expression } = this.state;
        let pressedKey = {...key};
        const result = key.text;
        expression.push(key.value);
        this.setState({ pressedKey, expression, result });
        console.log('expression', this.state.expression);
    }

    deleteChar() {
        const { expression } = this.state;
        expression.pop();
        const lastChar = expression.slice(-1)[0];
        let pressedKey = this.props.data.filter(char => char.text === lastChar);
        this.setState({ pressedKey, expression });
    }

    allClear() {
        this.setState({
            pressedKey: {},
            expression: '',
            result: ''
        })
    }

    calculate() {
        const { expression } = this.state;
        let result = eval(expression.join('')).toString();
        this.setState({ result });
    }


    handleClick(key) {
        console.log(key);
        if (key.type === 'digit') {
            if (this.state.expression.length === 0) {
                if (key.id !== 'zero') this.addChar(key)
            } else this.addChar(key);
        } else if (key.type === 'operator') {
            if (/[+-/*]/.test(this.state.expression.slice(-1)[0])) {
                this.deleteChar();
            }
            this.addChar(key);
        } else if (key.type === 'service') {
            switch (key.id) {
                case 'equals':
                    this.calculate();
                    break;
                case 'clear':
                    this.allClear();
                    break;
                case 'backspace':
                    this.deleteChar();
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