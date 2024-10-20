import React, {useState} from 'react';
import Display from "./Display";
import Button from "./Button";

export default function Calculator() {
    const [result, setResult] = useState();

    return(
        <>
            <Display>

            </Display>
            <div className="buttons-container">
                <Button>

                </Button>
            </div>

        </>
    )
}