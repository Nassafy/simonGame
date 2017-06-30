import React from 'react'

const SimonInfo = (props) => {
    return (
        <div>
            <h1>{props.info}</h1>
            Score: {props.score}
        </div>
    )
}

export default SimonInfo
