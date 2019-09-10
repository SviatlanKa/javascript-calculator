import React, { Component } from 'react';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBackspace} from "@fortawesome/free-solid-svg-icons";
import './App.css';

class KeyPads extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        const pressedKey = this.props.data.filter(pad => pad.id === event.target.id)[0];
        this.props.onHandleClick(pressedKey);
    }

    render() {
        const pads = [];
        let count = 1;
        let padIcon;
        this.props.data.forEach(pad => {
            padIcon = (pad.id === 'backspace')? <FontAwesomeIcon icon={faBackspace} className="icon" color="red"/> : pad.text;
            pads.push(
            <button
                id={pad.id}
                className="pad"
                key={`pad-${count}`}
                onClick={this.handleClick}
            >
                {padIcon}
            </button>
            );
            count++;
        });
        return(
            <div id="keypads">
                {pads}
            </div>
        )
    }
}

export default KeyPads;