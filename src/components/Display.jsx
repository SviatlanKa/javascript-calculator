import React from 'react';

const Display = ({expression, result}) => (
    <div className="display">
        <div className="expression">
            {expression}
        </div>
        <div className="result">
            {result}
        </div>
    </div>
)
export default Display;