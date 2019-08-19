import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faBackspace} from "@fortawesome/free-solid-svg-icons";

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
        this.props.data.forEach(pad => {
            if (pad.id === 'backspace') {
                pads.push(<button
                    id={pad.id}
                    className="pad"
                    key={`pad-${count}`}
                    onClick={this.handleClick}
                >
                    {/*<FontAwesomeIcon icon={faBackspace} className="icon" style={"color: red"}/>*/}
                    {pad.text}
                </button>)
            } else {
                pads.push(
                <button
                    id={pad.id}
                    className="pad"
                    key={`pad-${count}`}
                    onClick={this.handleClick}
                >
                    {pad.text}
                </button>
            );
            }
            count++;
        })
        return(
            <div id="keypads">
                {pads}
            </div>
        )
    }
}

export default KeyPads;