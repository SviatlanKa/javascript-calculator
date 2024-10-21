import React from 'react';
import PropTypes from 'prop-types';
import Button from "./Button";

const ButtonGrid = ({ buttons, onClick }) => {
    return (
        <div className="buttons-container">
        {buttons.map((button, index) => (
            <Button
                key={index}
                id={button.id}
                text={button.name}
                type={button.type}
                onClick={onClick}/>
        ))
        }

    </div>)
}

ButtonGrid.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['digit', 'operator', 'service', 'special']).isRequired,
            onClick: PropTypes.func.isRequired,
        })
    )
}

export default ButtonGrid;