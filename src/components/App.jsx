import React, { Component } from 'react';
import Display from './Display';
import KeyPads from './KeyPads';
import './App.css';

const numRE = '\\d+\\.?\\d*(e[-+]\\d+)?\\)?';
const mathSigsRE = '[\\u00f7\\u00d7+-]';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: [],
            result: '0',
            isEqual: false
        };
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

    addDigit(key) {
        let { expression, result, isEqual } = this.state;

        if (isEqual) {
            expression = [];
            isEqual = !isEqual;
        }
        if (key.id === 'zero' && /\u00f7$/.test(expression)) {
            alert('Division by zero!');
        } else {
            if ((expression.length === 1 & expression[0] === '0') || expression.length === 0) {
                expression[0] = key.text;
                result = key.text;
            } else {
                expression.push(key.text);
                if(/(\d+|\.)$/.test(result)) {
                    result += key.text;
                } else result = key.text;
            }
        }
        this.setState({ expression, result, isEqual });
    }

    addMathSign(key) {
        let { expression, result, isEqual } = this.state;
        let expToStr = expression.join('');
        if(key.text === '-') {
            expression.push(key.text);
            result = key.text;
        } else {
            if (expression.length === 0) {
                alert('Wrong expression');
            } else {
                while(new RegExp(`${mathSigsRE}$`).test(expToStr)) {
                    expression.pop();
                    expToStr = String(expression.join(''));
                }
                expression.push(key.text);
                result = key.text;
            }
        }
        isEqual = isEqual? !isEqual : isEqual;
        this.setState({ expression, result, isEqual });
    }

    addDecimal() {
        let { expression, result, isEqual } = this.state;

        if (isEqual) {
            const expToStr = expression.join('');
            if (!/\./.test(expToStr)){
                expression.push('.');
                result += '.';
            }
            isEqual = !isEqual;
        } else if (expression.length === 0 || new RegExp(`${mathSigsRE}`).test(result)) {
            expression.push('0');
            expression.push('.');
            result = '0.';
        } else if (!/\.|[^\d]$/.test(result)) {
                expression.push('.');
                result += '.';
        }
        this.setState( {expression, result, isEqual });
    }

    addSign() {
        let { expression, result, isEqual } = this.state;
        const expToStr = expression.join('');

        if (expression.length > 0 && !new RegExp(`\\)$|[\u221a]${numRE}$`).test(expToStr)
            && new RegExp(`${numRE}$`).test(expToStr)) {
            const idx = expToStr.match(new RegExp(`${numRE}$`)).index;
            if (isEqual) {
                result[0] !== '-' ? result.splice(0, 0, '-') : result.splice(0, 1);
                isEqual = false;
            } else if (expression[idx - 1] === '-' &&
                (idx - 1 === 0 || new RegExp(`${mathSigsRE}`).test(expression[idx - 2]))) {
                expression.splice(idx - 1, 1);
            } else expression.splice(idx, 0, '-');
        } else alert('Wrong expression');
        this.setState({ expression, result, isEqual });
    }

    addParenthesis(key) {
        let { expression, result, isEqual } = this.state;
        let expToStr = expression.join('');
        const checkNull = (str, regEx) => {
            return  str.match(regEx) ? str.match(regEx).length : 0;
        };

        if (key.id === 'left-parenthesis') {
            if (isEqual) {
                expression = [];
                isEqual = false;
            }
            if (new RegExp(`${mathSigsRE}$`).test(expToStr) || expression.length === 0) {
                expression.push('(');
                result = '(';
            }
        } else if (key.id === 'right-parenthesis') {
            if (expression.length === 0 || new RegExp(`${mathSigsRE}$`).test(expToStr) || (/\($/).test(expToStr)) {
                alert('Wrong expression');
            } else {
                expression.push(')');
                result = ')';
                expToStr = expression.join('');
                const leftNum = checkNull(expToStr, /\(/g);
                const rightNum = checkNull(expToStr,/\)/g);
                if (leftNum < rightNum) {
                    expression.splice(0, 0, '(');
                }
            }
        }
        this.setState({ expression, result, isEqual });
    }

    addSquareRoot() {
        let { expression, result, isEqual } = this.state;
        const expToStr = expression.join('');

        if (isEqual) {
            if (parseFloat(expToStr) > 0) {
                expression.splice(0, 0, '\u{221a}');
            } else alert('Wrong expression');
            isEqual = false;
        } else if (expression.length === 0 || new RegExp(`\\($|${mathSigsRE}$`).test(expToStr)) { //Check this!!!
            expression.push('\u{221a}');
            result = '\u{221a}';
        }
        this.setState({ expression, result, isEqual });
    }

    addPower() {
        let { expression, result, isEqual } = this.state;
        const expToStr = expression.join('');

        if (isEqual) {
            isEqual = false;
        }
        if (expression.length > 0 && new RegExp(`-?${numRE}$`).test(expToStr)) {
            expression.push('^');
            result = '^';
        } else alert('Wrong expression');
        this.setState({ expression, result, isEqual });
    }

    addPercent() {
        let { expression, result, isEqual } = this.state;

        if (expression.length > 0) {
            const expToStr = expression.join('');
            if (!new RegExp(`${mathSigsRE}$|(^-?${numRE})$`).test(expToStr)) {
                if (/\.$/.test(expToStr)) {
                    expToStr.pop();
                }
                expression.push('%');
                result = '%';
            } else alert('Wrong expression');
        } else alert('Wrong expression');
        this.setState( {expression, result, isEqual });
    }

    deleteChar() {
        let { expression, result } = this.state;

        expression.pop();
        if (expression.length === 0) {
            result = '0';
        } else {
            const expToStr = expression.join('');
            const regEx = new RegExp(`${numRE}$`);
            result = regEx.test(expToStr) ? expToStr.match(regEx) : expToStr[expToStr.length - 1];
        }
        this.setState({ expression, result });
    }

    clearAll() {
        this.setState({
            expression: [],
            result: '0',
            isEqual: false
        });
    }

    calculate() {
        let { expression, isEqual } = this.state;
        let expToStr = expression.join('');
        let isError = false;
        const mathSigns = ["\u{221a}", "\\^", "\u{00f7}", "\u{00d7}", "-", "\\+"];

        const replacer = (exp, regExp, mathSign) => {
            exp = exp.replace(regExp, (a, b, c, d) => {
                switch (mathSign) {
                    case '\u{221a}':
                        return Math.round(Math.pow(c, 1/2) * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\\^':
                        return Math.round(Math.pow(b, d) * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\u{00f7}':
                        return Math.round(b / d * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\u{00d7}':
                        return Math.round(b * d * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '-':
                        return Math.round((b - d) * Math.pow(10, 10)) / Math.pow(10, 10);
                    case '\\+':
                        return Math.round((parseFloat(b) + parseFloat(d)) * Math.pow(10, 10))
                            / Math.pow(10, 10);
                    default:
                        break;
                }
            });
            return exp;
        };

        const calcExp = (expForAnalyze) => {
            let regExp;
            let signRE;
            mathSigns.forEach(sign => {
                signRE = (sign === "\u{221a}") ? new RegExp(`(\\u221a)(${numRE})`) : new RegExp(`${numRE}${sign}-?${numRE}`);
                while (signRE.test(expForAnalyze)){
                    if (sign === '\u{221a}') {
                        regExp = signRE;
                        expForAnalyze = replacer(expForAnalyze, regExp, sign);
                    } else if (new RegExp(`^-?${numRE}$`).test(expForAnalyze)) {
                        break;
                    } else {
                        regExp = new RegExp(`(^-|${mathSigsRE}-)(${numRE})${sign}(-?${numRE})`);
                        if (regExp.test(expForAnalyze)) {
                            regExp = new RegExp(`(-${numRE})${sign}(-?${numRE})`);
                            expForAnalyze = replacer(expForAnalyze, regExp, sign);
                        }
                        regExp = new RegExp(`(${numRE})${sign}(-?${numRE})`);
                        if (regExp.test(expForAnalyze)) {
                            regExp = new RegExp(`(${numRE})${sign}(-?${numRE})`);
                            expForAnalyze = replacer(expForAnalyze, regExp, sign);
                        }
                    }
                }
            });
            return expForAnalyze;
        };

        const calcPercent = (exp) => {
            let regExp = /([\u00f7\u00d7])(\d+\.?\d*)(%)/;
            if (regExp.test(exp)) {
                exp = exp.replace(regExp, (a, b, c) => b + c / 100);
            }
            regExp = /[-+]-?\d+\.?\d*%/g;
            if (regExp.test(exp)) {
                let numsWithPercent = exp.match(regExp);
                let partsOfExp = exp.split(regExp);
                let resultOfCalc = '';
                for (let i = 0; i < numsWithPercent.length; i++) {
                    resultOfCalc += partsOfExp[i];
                    resultOfCalc = calcExp(resultOfCalc);
                    resultOfCalc += numsWithPercent[i].replace(/(\d+\.?\d*)(%)/, (a, b) => Math.round(resultOfCalc / 100 * b * Math.pow(10, 10)) / Math.pow(10, 10))
                }
                exp = calcExp(resultOfCalc);
                if (partsOfExp.length > numsWithPercent.length) {
                    exp += partsOfExp[partsOfExp.length - 1];
                }
                return exp;
            }
            return calcExp(exp);
        };

        const calcParenthesis = exp => {
            if (/\)/.test(exp)) {
                if (exp.match(/\(/g).length !== exp.match(/\)/g).length) {
                    alert('Unfinished expression');
                    isError = !isError;
                } else {
                    let partOfExp, resultOfCalc;
                    let beginSlice, endSlice;

                    while (/\)/.test(exp)) {
                        endSlice = exp.indexOf(')');
                        beginSlice = exp.lastIndexOf('(', endSlice) + 1;
                        partOfExp = exp.slice(beginSlice, endSlice);
                        resultOfCalc = (/%/.test(partOfExp)) ? calcPercent(partOfExp) : calcExp(partOfExp);
                        exp = exp.replace(`(${partOfExp})`, resultOfCalc);
                    }
                }
            } else {
                alert('Unfinished expression');
                isError = !isError;
            }

            return exp;
        };

        if (/\(/.test(expToStr)) {
            expToStr = calcParenthesis(expToStr);

        }
        if (!isError) {
            if (/%/.test(expToStr)) {
                expToStr = calcPercent(expToStr)
            }
            if (!new RegExp(`^-?${numRE}$`).test(expToStr)) {
                expToStr = calcExp(expToStr);
            }
            expression = expToStr.split('');
            const result = expToStr;
            isEqual = !isEqual;
            this.setState({ expression, result, isEqual });
        }
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
            <div id='calculator'>
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
