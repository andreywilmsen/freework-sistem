import React from 'react';
import '../styles/PointerRecorderHour.css';

// Components
import Button from '../components/Button';

function PointerRecorderHour(props) {

    return (

        <div className="pointerRecorderCard">
            <h3>{props.date}</h3>
            <h1>{props.hour}</h1>
            <div className="recorderHourButton">
                <Button size="buttonExtraBig" buttonType="buttonSuccess" name="Registrar" />
            </div>
            <div className="showRecorder">
                <a onClick={props.click} >Visualizar grade</a>
            </div>
        </div>
    )
}

export default PointerRecorderHour;
