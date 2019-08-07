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
        this.addMathSign = this.addMathSign.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.addPercent = this.addPercent.bind(this);
        this.addSign = this.addSign.bind(this);
        this.addPower = this.addPower.bind(this);
        this.addSquareRoot = this.addSquareRoot.bind(this);
        this.deleteChar = this.deleteChar.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    addDigit(key) { //It works correct!!
        let { expression, result, isEqual } = this.state;
        if (isEqual) {
            expression = [];
            isEqual = false;
        }
        if (expression.length > 0 || (expression.length === 0 && key.id !== 'zero')) {
            expression.push(key.text);
            result = key.text;
        }
        this.setState({ expression, result, isEqual });
        console.log('this.state from addDigit', this.state);
    }

    addMathSign(key) {//It works correct!!
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');
        if (expression.length === 0) {
            alert('Wrong expression');
        } else {
            if (isEqual) {
                isEqual = false;
            } else if (/[\+-\/\*]$/.test(expToString)) {
                this.deleteChar();
                expression = this.state.expression;
            }
            expression.push(key.text);
            result = key.text;
        }
        this.setState({ expression, result, isEqual });
    }

    addDecimal() {//It works correct!!
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');
        if (isEqual) {
            if (!/\d+\.\d*$/.test(expToString)){
                expression.push('.');
                result = '.';
            }
            isEqual = false;
        } else if (expression.length === 0) {
            expression = ['0', '.'];
            result = '.';
        } else if (!/\.$|(\d+\.\d*$)/.test(expToString)) {
                expression.push('.');
                result = '.';
        }
        this.setState( {expression, result, isEqual });
    }

    addPercent() {//It works correct!!
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');
        if (expression.length > 0) {
            if (!/[-\+\/\*]$|(^-?\d+\.?\d*$)/.test(expToString)) {
                if (/\.$/.test(expToString)) {
                    expToString.pop();
                }
                expression.push('%');
                result = '%';
            } else alert('Wrong expression');
        } else alert('Wrong expression');
        this.setState( {expression, result, isEqual });
    }

    addSign() {//It works correct!!
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');

        if (expression.length > 0 && !/[\+-\/\*%]$/.test(expToString)) {
            const index = expToString.match(/\d+\.?\d*$/).index;
            if (isEqual) {
                result.splice(0, 0, '-');
                isEqual = false;
            } else if (expression[index - 1] === '-' &&
                (index - 1 === 0 || /[\+-\/\*]/.test(expression[index - 2]))) { // find --78 or *--78 and convert to 78 or *78
                expression.splice(index - 1, 1);
            } else expression.splice(index, 0, '-');
        }
        this.setState({ expression, result, isEqual });
    }

    addPower() {
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');
        if (isEqual) {
            isEqual = false;
        }
        if (expression.length > 0 && /-?\d+\.?\d*$/.test(expToString)) {
                expression.push('^');
                result = '^';
        } else alert('Wrong expression');

        this.setState({ expression, result, isEqual });
    }

    addSquareRoot() {
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');
        if (isEqual) {
            expression.splice(0, 0, '\u{221a}');
            isEqual = false;
        } else if (expression.length === 0 || /[\+-\/\*]$/.test(expToString)) {
            expression.push('\u{221a}');
            result = '\u{221a}';
        }

        this.setState({ expression, result, isEqual });
    }

    deleteChar() { //It works correct!!
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
        let expToString = expression.join('');
        let mathSigns = ["\u{221a}", "\\^", "\u{00f7}", "\u{00d7}", "-", "\\+"];

        const calculateExpression = (expForAnalyze) => {
            mathSigns.forEach(sign => {
                let regExp = /(\u221a)(\d+\.?\d*)/;
                if(regExp.test(expForAnalyze)) {
                    expForAnalyze = replacer(expForAnalyze, regExp, sign);
                }
                regExp = new RegExp(`(([-\\+\\u00f7\\u00d7]-|^-)\\d+\\.?\\d*)${sign}(-?\\d+\\.?\\d*)`);
                if (regExp.test(expForAnalyze)) {
                    regExp = new RegExp(`(-\\d+\\.?\\d*)${sign}(-?\\d+\\.?\\d*)`);
                    expForAnalyze = replacer(expForAnalyze, regExp, sign);
                }
                regExp = new RegExp(`(\\d+\\.?\\d*)${sign}(-?\\d+\\.?\\d*)`);
                if (regExp.test(expForAnalyze)) {
                    expForAnalyze = replacer(expForAnalyze, regExp, sign);
                }
            });
            return expForAnalyze;
        }

        const replacer = (exp, regExp, mathSign) => {
            while(regExp.exec(exp)){
                exp = exp.replace(regExp, (a, b, c) => {
                    switch (mathSign) {
                        case '\u{221a}':
                            console.log('\u{221a} ', Math.pow(c, 1/2));
                            return '\u{221a} ', Math.round(Math.pow(c, 1/2) * Math.pow(10, 10)) / Math.pow(10, 10);
                        case '\\^':
                            console.log('^', Math.pow(b, c));
                            return Math.pow(b, c);
                        case '\u{00f7}':
                            console.log('\\ ', Math.round(b / c * Math.pow(10, 10)) / Math.pow(10, 10));
                            return Math.round(b / c * Math.pow(10, 10)) / Math.pow(10, 10);
                        case '\u{00d7}':
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
                return exp;
        }

        // mathOperators.forEach(elem => {
        //     let regExp = new RegExp(`(([-\\+\\/\\*]-|^-)\\d+\\.?\\d*)${elem}(-?\\d+\\.?\\d*)`);
        //     console.log(elem, expToString);
        //     //next if is wrong!!! -117-45/9+63*5-400 == -59*5 - 400
        //     if (regExp.test(expToString)) {
        //         regExp = new RegExp(`(-\\d+\\.?\\d*)${elem}(-?\\d+\\.?\\d*)`);
        //         replacer(regExp, elem);
        //     }
        //     regExp = new RegExp(`(\\d+\\.?\\d*)${elem}(-?\\d+\\.?\\d*)`);
        //     if (regExp.test(expToString)) {
        //         replacer(regExp, elem);
        //     }
        //     console.log('expToString: ', expToString);
        //
        // });


        if (/%/.test(expToString)) {
          console.log('there is percent');
          let regExp = /([\/\*])(\d+\.?\d*)(%)/;
          if(regExp.test(expToString)) {
              expToString = expToString.replace(regExp, (a, b, c) => b + c / 100);
          }
          regExp = /[-\+]-?\d+\.?\d*%/g;
            if(regExp.test(expToString)) {
                let numbersWithPercent = expToString.match(regExp);
                console.log(`numbersWithPercents: ${numbersWithPercent}`);
                let partsOfExp = expToString.split(regExp);
                console.log(`partsOfExpression: ${partsOfExp}`);
                let resultOfCalc = '';
                let i = 0;
                for (i; i < numbersWithPercent.length; i++) {
                    resultOfCalc += partsOfExp[i];
                    resultOfCalc = calculateExpression(resultOfCalc);
                    resultOfCalc += numbersWithPercent[i].replace(/(\d+\.?\d*)(%)/, (a, b) =>
                        Math.round(resultOfCalc / 100 * b * Math.pow(10, 10)) / Math.pow(10, 10))
                }
                if (partsOfExp.length > numbersWithPercent.length) {
                    resultOfCalc += partsOfExp[i];
                }
                expToString = calculateExpression(resultOfCalc);
            }
        } else expToString = calculateExpression(expToString);

        expression = expToString.split('');
        const result = expression;
        console.log(`expression: ${expression}, result: ${result}`);
        const isEqual = true;
        this.setState({ expression, result, isEqual });
        console.log('this.state from calculate', this.state);
    }

    handleClick(key) {
        if (key.type === 'digit') {
            this.addDigit(key);
        } else if (key.type === 'sign') {
            this.addMathSign(key);
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
                    this.addPower();
                    break;
                case 'sqrt':
                    this.addSquareRoot();
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