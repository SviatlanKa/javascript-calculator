import React, { Component } from 'react';
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
        this.addSign = this.addSign.bind(this);
        this.addSquareRoot = this.addSquareRoot.bind(this);
        this.addPower = this.addPower.bind(this);
        this.addParenthesis = this.addParenthesis.bind(this);
        this.addPercent = this.addPercent.bind(this);
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
    }

    addMathSign(key) {//It works correct!!
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');

        if (expression.length === 0) {
            alert('Wrong expression');
        } else {
            if (isEqual) {
                isEqual = false;
            } else if (/[\u00f7\u00d7+-]$/.test(expToString)) {
                this.deleteChar();
                console.log(this.state.expression);
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

    addSign() {//It works correct!!
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');

        if (expression.length > 0 && !/[\u221a]\d+\.?\d*(e[-+]\d+)?$/.test(expToString) && /\d+\.?\d*(e[-+]\d+)?$/.test(expToString)) {
            const index = expToString.match(/\d+\.?\d*$/).index;
            if (isEqual) {
                result.splice(0, 0, '-');
                isEqual = false;
            } else if (expression[index - 1] === '-' &&
                (index - 1 === 0 || /[\u00f7\u00d7+-]/.test(expression[index - 2]))) {
                expression.splice(index - 1, 1);
            } else expression.splice(index, 0, '-');
        } else alert('Wrong expression');
        this.setState({ expression, result, isEqual });
    }

    addParenthesis(key) {
        let { expression, result, isEqual } = this.state;
        let expToString = expression.join('');

        if (key.id === 'left-parenthesis') {
            if (isEqual) {
                expression = [];
                isEqual = false;
            }
            expression.push('(');
            result = '(';
        } else if (key.id === 'right-parenthesis') {
            if (expression.length === 0 || /[\u00f7\u00d7+-]$/.test(expToString)) {
                alert('Wrong expression');
            } else {
                expression.push(')');
                result = ')';
                expToString = expression.join('');
                const leftNum = expToString.match(/\(/g);
                const rightNum = expToString.match(/\)/g);
                if (leftNum.length === null || leftNum.length < rightNum.length) {
                    expression.splice(0, 0, '(');
                }
            }
        }
        this.setState({ expression, result, isEqual });
    }

    addSquareRoot() {
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');

        if (isEqual) {
            if (parseFloat(expToString) > 0) {
                expression.splice(0, 0, '\u{221a}');
            } else alert('Wrong expression');
            isEqual = false;
        } else if (expression.length === 0 || /[\u00f7\u00d7+-]$/.test(expToString)) { //Check this!!!
            expression.push('\u{221a}');
            result = '\u{221a}';
        }
        this.setState({ expression, result, isEqual });
    }

    addPower() {
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');

        if (isEqual) {
            isEqual = false;
        }
        if (expression.length > 0 && /-?\d+\.?\d*(e[-+]\d+)?$/.test(expToString)) {
            expression.push('^');
            result = '^';
        } else alert('Wrong expression');
        this.setState({ expression, result, isEqual });
    }

    addPercent() {//It works correct!!
        let { expression, result, isEqual } = this.state;
        const expToString = expression.join('');

        if (expression.length > 0) {
            if (!/[-+\u00f7\u00d7]$|(^-?\d+\.?\d*(e[-+]\d+)?$)/.test(expToString)) {
                if (/\.$/.test(expToString)) {
                    expToString.pop();
                }
                expression.push('%');
                result = '%';
            } else alert('Wrong expression');
        } else alert('Wrong expression');
        this.setState( {expression, result, isEqual });
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
    }

    calculate() { //It works correct!!
        let { expression } = this.state;
        let expToString = expression.join('');
        const numRE = '\\d+\\.?\\d*(e[-+]\\d+)?';
        let mathSigns = ["\u{221a}", "\\^", "\u{00f7}", "\u{00d7}", "-", "\\+"];

        const replacer = (exp, regExp, mathSign) => {
            exp = exp.replace(regExp, (a, b, c, d, e) => {
                switch (mathSign) {
                    case '\u{221a}':
                        console.log(a, b, c, d, e);
                        console.log('\u{221a} ', Math.pow(c, 1/2));
                        return Math.round(Math.pow(c, 1/2) * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\\^':
                        console.log(a, b, c, d, e);
                        console.log('^', Math.pow(b, d));
                        return Math.round(Math.pow(b, d) * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\u{00f7}':
                        console.log(a, b, c, d, e);
                        console.log('\\ ', Math.round(b / d * Math.pow(10, 10)) / Math.pow(10, 10));
                        return Math.round(b / d * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\u{00d7}':
                        console.log(a, b, c, d, e);
                        console.log('*', Math.round(b * d * Math.pow(10, 10)) / Math.pow(10, 10));
                        return Math.round(b * d * Math.pow(10, 10)) / Math.pow(10, 10)
                    case '-':
                        console.log(a, b, c, d, e);
                        console.log('-', Math.round((b - d) * Math.pow(10, 10)) / Math.pow(10, 10));
                        return Math.round((b - d) * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\\+':
                        console.log(a, b, c, d, e);
                        console.log('+', Math.round((parseFloat(b) + parseFloat(d)) * Math.pow(10, 10))
                            / Math.pow(10, 10));
                        return Math.round((parseFloat(b) + parseFloat(d)) * Math.pow(10, 10))
                            / Math.pow(10, 10);
                    default:
                        break;
                }
            });
            return exp;
        }

        const calculateExpression = (expForAnalyze) => {
            let regExp;
            let signRE;
            mathSigns.forEach(sign => {
                console.log(`expression for analyze: ${expForAnalyze}`);
                signRE = (sign === "\u{221a}") ? new RegExp(`(\\u221a)(${numRE})`) : new RegExp(`${numRE}${sign}-?${numRE}`);
                while (signRE.test(expForAnalyze)){
                    if (sign === '\u{221a}') {
                        regExp = signRE;
                        expForAnalyze = replacer(expForAnalyze, regExp, sign);
                        console.log(`expression for analyze: ${expForAnalyze}`);
                    } else if (new RegExp(`^-?${numRE}$`).test(expForAnalyze)) {
                        console.log('Break!');
                        break;
                    } else {
                        regExp = new RegExp(`(^-|[\\u00f7\\u00d7+-]-)(${numRE})${sign}(-?${numRE})`);
                        console.log(expForAnalyze.match(regExp));
                        if (regExp.test(expForAnalyze)) {
                            regExp = new RegExp(`(-${numRE})${sign}(-?${numRE})`);
                            console.log(regExp, expForAnalyze);
                            expForAnalyze = replacer(expForAnalyze, regExp, sign);
                        }
                        regExp = new RegExp(`(${numRE})${sign}(-?${numRE})`);
                        if (regExp.test(expForAnalyze)) {
                            regExp = new RegExp(`(${numRE})${sign}(-?${numRE})`);
                            console.log(regExp, expForAnalyze);
                            expForAnalyze = replacer(expForAnalyze, regExp, sign);
                        }
                    }
                    console.log(`expForAnalyze: ${expForAnalyze}`);
                }
            });
            return expForAnalyze;
        }

        const calculatePercent = (exp) => {
            let regExp = /([\u00f7\u00d7])(\d+\.?\d*)(%)/;
            if (regExp.test(exp)) {
                exp = exp.replace(regExp, (a, b, c) => b + c / 100);
            }
            regExp = /[-+]-?\d+\.?\d*%/g;
            if (regExp.test(exp)) {
                let numbersWithPercent = exp.match(regExp);
                console.log(`numbersWithPercents: ${numbersWithPercent}`);
                let partsOfExp = exp.split(regExp);
                console.log(`partsOfExpression: ${partsOfExp}`);
                let resultOfCalc = '';
                let i = 0;
                for (i; i < numbersWithPercent.length; i++) {
                    resultOfCalc += partsOfExp[i];
                    resultOfCalc = calculateExpression(resultOfCalc);
                    resultOfCalc += numbersWithPercent[i].replace(/(\d+\.?\d*)(%)/, (a, b) =>
                        Math.round(resultOfCalc / 100 * b * Math.pow(10, 10)) / Math.pow(10, 10))
                }
                exp = calculateExpression(resultOfCalc);
                console.log(`resultOfCalc from %: ${resultOfCalc}, exp: ${exp}`);
                if (partsOfExp.length > numbersWithPercent.length) {
                    exp += partsOfExp[partsOfExp.length - 1];
                }
                return exp;
            }
            return calculateExpression(exp);
        }

        const calculateParenthesis = exp => {
            if (/\)/.test(exp)) {
                let partOfExp, resultOfCalc;
                let beginSlice, endSlice;

                while (/\)/.test(exp)) {
                    endSlice = exp.indexOf(')');
                    //console.log(`endSlice: ${endSlice}`);
                    beginSlice = exp.lastIndexOf('(', endSlice) + 1;
                    //console.log(`beginSlice: ${beginSlice}`);
                    partOfExp = exp.slice(beginSlice, endSlice);
                    //console.log(`partOfExp: ${partOfExp}`);
                    resultOfCalc = (/%/.test(partOfExp)) ? calculatePercent(partOfExp) : calculateExpression(partOfExp);
                    console.log(`resultOfCalc from %: ${resultOfCalc}`);
                    exp = exp.replace(`(${partOfExp})`, resultOfCalc);
                    console.log(`exp after (): ${exp}`);
                }
                return exp;
            } else alert('Unfinished expression');

        }



        expToString = '(135+9^2+15%)\u{00f7}(17-3\u{00d7}(4^3-\u{221a}15))+30%-921\u{00f7}4';
        console.log(expToString);

        if (/\(/.test(expToString)) {
            expToString = calculateParenthesis(expToString);
        }
        if (/%/.test(expToString)) {
            console.log(`expToString from %: ${expToString}`);
            expToString = calculatePercent(expToString)
        }
        if (!/^-?\d+\.?\d*(e[-+]\d+)?$/.test(expToString)) expToString = calculateExpression(expToString);

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
                    this.addParenthesis(key);
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