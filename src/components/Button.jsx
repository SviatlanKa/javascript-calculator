import React from 'react';
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBackspace} from "@fortawesome/free-solid-svg-icons/faBackspace";

const Button = ({id, text, type, onClick}) => {
    const handleClick = (e) => {
        onClick && onClick(e.target.id);
    }
    return(
        <button id={id} className={`button ${type}`} onClick={handleClick}>
            {id !== "backspace" ? text : <FontAwesomeIcon icon={faBackspace} />}
        </button>
    )
}

Button.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['digit', 'operator', 'service', 'special']).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default Button;