import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import Display from "./Display";
import {CALCULATOR_BUTTONS as calculatorButtons}  from "../constants/calculatorButtons";
import ButtonGrid from "./ButtonGrid";

const Calculator = () => {
    const [previosResult, setPreviosResult] = useState(null);
    const [result, setResult] = useState(null);
    const [expression, setExpression] = useState('');

    useEffect(() => {
        calculate(expression);
    }, [expression])

    const calculate = (expression) => {
        setPreviosResult(result);
        //setResult();
    }

    const onHandleClick = (id) => {
        const clickedButton   = calculatorButtons.find(button => button.id === id);
        if (!clickedButton) return;
        if (clickedButton.id === "equal") {
            calculate(expression)
        }
        else {
            setExpression(expression + clickedButton)
        }
    }

    return(
        <>
            <Display result={result} expression={expression} />
            <ButtonGrid buttons={calculatorButtons} onClick={onHandleClick} />
        </>
    )
}

Calculator.propTypes = {
    calculatorButtons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['digit', 'operator', 'service', 'special']).isRequired,
        })
    )
}

export default Calculator;