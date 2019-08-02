import React, { Component } from 'react';
//import safeEval from 'safe-eval';
import Display from './Display';
import KeyPads from './KeyPads';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: [],
            result: ['0'],
            isEqual: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.addDigit = this.addDigit.bind(this);
        this.addOperator = this.addOperator.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.addPercent = this.addPercent.bind(this);
        this.addSign = this.addSign.bind(this);
        this.deleteChar = this.deleteChar.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.calculate = this.calculate.bind(this);
        this.lastChar = this.lastChar.bind(this);
        this.lastNumber = this.lastNumber.bind(this);
    }

    lastChar = (arrOfChars) => arrOfChars.slice((-1))[0];

    lastNumber = (arrOfChars) => arrOfChars.join('').match(/\d+$|\d+\.\d+$/);

    addDigit(key) { //It works correct!!
        let { expression, result, isEqual } = this.state;
        if (isEqual) {
            expression = [];
            isEqual = !isEqual;
        }
        if (expression.length > 0 || (expression.length === 0 && key.id !== 'zero')) {
            expression.push(key.text);
            result = key.text;
        }
        this.setState({ expression, result, isEqual });
        console.log('this.state from addDigit', this.state);
    }

    addOperator(key) {//It works correct!!
        let { expression, result, isEqual } = this.state;
        if (isEqual) {
            expression = result;
            isEqual = !isEqual;
        }
        if (expression.length === 0) alert('Wrong expression');
        else {
            const lastChar = this.lastChar(expression);
            if (/[\+-\/\*]$/.test(lastChar) && lastChar.match(/[\+-\/\*]$/) !== '-') {
                this.deleteChar();
                expression = this.state.expression;
            }
            expression.push(key.text);
            result = key.text;
        }
        this.setState({ expression, result, isEqual });
    }

    addDecimal() {
        let { expression, result, isEqual } = this.state;
        if (isEqual || expression[0] === '0' || expression.length === 0) {
            expression = ['0', '.'];
            result = '.';
            isEqual = false;
        } else {
            const lastNumber = this.lastNumber(expression);
            if (!/\./.test(lastNumber)) {
                expression.push('.');
                result = '.';
            }
        }
        this.setState( {expression, result, isEqual });
    }

    addPercent() {
        let { expression, result, isEqual } = this.state;
        if (expression.length > 0) {
            if (/([-\+\/\*\.]$)|(^\d+$)/.test(expression.join('')) !== true) {
                expression.push('%');
                result = '%';
            } else alert('Wrong expression');
        }
        this.setState( {expression, result, isEqual });
    }

    addSign() {//--78 should convert to 78 - it doesn't work
        let { expression, result, isEqual } = this.state;
        if (expression.length !== 0) {
            const index = this.lastNumber(expression).index;
            if (isEqual) {
                result.splice(0, 0, '-');
                isEqual = !isEqual;
            } else if (expression[index - 1] === '-' & ) {// it doesn't finish (*-- == *)
                expression.splice(index, 0, '-');
            }
        }
        this.setState({ expression, result, isEqual });
    }

    deleteChar() {
        let { expression } = this.state;
        expression.pop();
        this.setState({ expression });
    }

    clearAll() { //It works correct!!
        this.setState({
            expression: [],
            result: '0',
            isEqual: false
        });
        console.log('this.state from clearAll', this.state);
    }

    calculate() { //It works correct!!
        let { expression } = this.state;
        let expressionToString = expression.join('');
        let mathOperators = ["\\/", "\\*", "-", "\\+"];
        const replacer = (regExp, operator) => {
            while(regExp.exec(expressionToString)){
                expressionToString = expressionToString.replace(regExp, (a, b, c) => {
                    switch (operator) {
                        case '\\/':
                            console.log('\\', Math.round(b / c * Math.pow(10, 10)) / Math.pow(10, 10));
                            return Math.round(b / c * Math.pow(10, 10)) / Math.pow(10, 10);
                        case '\\*':
                            console.log('*', Math.round(b * c * Math.pow(10, 10)) / Math.pow(10, 10));
                            return Math.round(b * c * Math.pow(10, 10)) / Math.pow(10, 10)
                        case '-':
                            console.log('-', Math.round((b - c) * Math.pow(10, 10)) / Math.pow(10, 10));
                            return Math.round((b - c) * Math.pow(10, 10)) / Math.pow(10, 10);
                        case '\\+':
                            console.log('+', Math.round((parseFloat(b) + parseFloat(c)) * Math.pow(10, 10))
                                / Math.pow(10, 10));
                            return Math.round((parseFloat(b) + parseFloat(c)) * Math.pow(10, 10))
                                / Math.pow(10, 10);
                        default:
                            break;
                    }
                });
            }
        }

        mathOperators.forEach(elem => {
            let regExp = new RegExp(`(([-\\+\\/\\*]-|^-)\\d+\\.?\\d*)${elem}(-?\\d+\\.?\\d*)`);
            console.log(elem, expressionToString);
            //next if is wrong!!! -117-45/9+63*5-400 == -59*5 - 400
            if (regExp.test(expressionToString)) {
                regExp = new RegExp(`(-\\d+\\.?\\d*)${elem}(-?\\d+\\.?\\d*)`);
                replacer(regExp, elem);
            }
            regExp = new RegExp(`(\\d+\\.?\\d*)${elem}(-?\\d+\\.?\\d*)`);
            if (regExp.test(expressionToString)) {
                replacer(regExp, elem);
            }
            console.log('expressionToString: ', expressionToString);

        });
        expression = expressionToString.split('');
        const result = expression;
        console.log(`expression: ${expression}, result: ${result}`);

        if (/^.+%/.test(expression)) {
          console.log('there is percent');
        }
        // const resultInNum = Math.round(eval(expression.join('')) * Math.pow(10, 10))
        //     / Math.pow(10, 10);
        // const result = resultInNum.toString().split('');
        const isEqual = true;
        this.setState({ expression, result, isEqual });
        console.log('this.state from calculate', this.state);
    }

    handleClick(key) {
        if (key.type === 'digit') {
            this.addDigit(key);
        } else if (key.type === 'operator') {
            this.addOperator(key);
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
                    this.addDecimal();
                    break;
                case 'percent':
                    this.addPercent();
                    break;
                case 'power':
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