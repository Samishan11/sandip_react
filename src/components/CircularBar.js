import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularBar = (props) => {
    return (
        <div className="container py-5">
            <CircularProgressbar value={props.value} text={`${props.value}%`} strokeWidth={6} styles={buildStyles({
                textColor: "#707070",
                pathColor: "#4470ff",
                trailColor: "#d1d1d1"
            })} />
        </div>
    )
}

export default CircularBar