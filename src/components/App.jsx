import React, { Component } from 'react';
//import safeEval from 'safe-eval';
import Display from './Display';
import KeyPads from './KeyPads';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressedKey: {},
            expression: [],
            result: ['0'],
            isEqual: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.addOperator = this.addOperator.bind(this);
        this.deleteChar = this.deleteChar.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.calculate = this.calculate.bind(this);
        this.addSign = this.addSign.bind(this);
        this.lastChar = this.lastChar.bind(this);
        this.lastNumber = this.lastNumber.bind(this);
    }

    lastChar = (arrOfChars) => arrOfChars.slice((-1))[0];

    lastNumber = (arrOfChars) => arrOfChars.join('').match(/\d+$/).split('');

    addDigit(key) { //It works correct!!
        let { expression } = this.state;
        if (this.state.isEqual) {
            expression = [];
            this.setState({ isEqual: false });
        }
        let pressedKey = {...key};
        expression.push(key.text);
        const result = this.lastNumber(expression);
        console.log(result);
        this.setState({ pressedKey, expression, result });
        console.log('this.state from addDigit', this.state);
    }

    addOperator(key) { //It works correct!!
        let expression = [];
        let result = this.state.result;
        if (this.state.isEqual) {
            if (result.length > 1) expression = this.state.result.split('');
            else expression[0] = result;
            this.setState({ isEqual: false });
        } else expression = this.state.expression;
        let pressedKey = {...key};
        console.log('expression', expression);
        expression.push(key.text);
        result = key.text;
        this.setState({ pressedKey, expression, result });
        console.log('this.state from addOperator', this.state);
    }

    addSign() {
        let { expression, result, isEqual } = this.state;
        const number = this.lastNumber(expression)[0];
        const index = this.lastNumber(expression).index;
        if (isEqual) {
            result = result.split('');
            result.splice(0, 0, '-');
            result = result.join('');
        } else expression.splice(index, number, `(-${number})`);
        console.log(expression);
        this.setState({ expression, result });
    }

    deleteChar() { //It works correct!!
        const { expression } = this.state;
        expression.pop();
        let pressedKey = this.props.data.filter(char => char.text === this.lastChar(expression));
        this.setState({ pressedKey, expression, result: expression });
        console.log('this.state from deleteChar', this.state);
    }

    clearAll() { //It works correct!!
        this.setState({
            pressedKey: {},
            expression: [],
            result: '0',
            isEqual: false
        });
        console.log('this.state from clearAll', this.state);
    }

    calculate() { //It works correct!!
        const { expression } = this.state;

        const result = eval(expression.join('')).toString();
        const isEqual = true;
        this.setState({ expression, result, isEqual });
        console.log('this.state from calculate', this.state);
    }

    handleClick(key) {
        const expressionLength = this.state.expression.length;
        console.log('key ', key);
        if (key.type === 'digit') {
            if (expressionLength === 0) {
                if (key.id !== 'zero') this.addDigit(key);
            } else this.addDigit(key);
        } else
        if (key.type === 'operator') {
            if (expressionLength === 0) {
                alert('wrong expression');
                key = null;
            } else if (/[+-/*]$/.test(this.lastChar(this.state.expression))) {
                this.deleteChar();
            }
            if (key !== null) {
                this.addOperator(key);
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
        } else if (key.type === 'special') {
            switch (key.id) {
                case 'number-sign':
                    this.addSign();
                    break;
                case 'decimal':
                    break;
                case 'percent':
                    break;
                case 'radial':
                    break;
                case 'left-parenthesis':
                case 'right-parenthesis':
                    break;
                default:
                    break;
            }
        }
    }

    render() {
        return (
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