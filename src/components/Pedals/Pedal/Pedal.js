import React, {useState} from 'react';
import ProgressBar from '../../ProgressBar';
import './Pedal.less';
import {useDeviceData} from "../../../lib/usb";

const AXIS_RESOLUTION = 4096;

export default function Pedal(props) {
    const [value, updateValue] = useState(0);

    useDeviceData((value) => {
        updateValue(value/(AXIS_RESOLUTION - 1) * 100);
    }, 'axis1');

    return (
        <div className="Pedal">
            <div className="Pedal__title">{props.title}</div>
            <ProgressBar className="Pedal__value" value={value}/>
        </div>
    );
}