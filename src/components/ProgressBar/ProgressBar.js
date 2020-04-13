import React from 'react';
import classnames from 'classnames';
import './ProgressBar.less';

export default function ProgressBar(props) {

    const width = props.orientation === 'vertical' ? '100' : props.value;
    const height = props.orientation === 'vertical' ? props.value : '100';

    return (
        <div className={classnames("ProgressBar", props.className)}>
            <div className="ProgressBar__bar" style={{width: `${width}%`, height: `${height}%`}}/>
        </div>
    );
}