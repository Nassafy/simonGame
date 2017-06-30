import React from 'react'

const StartButton = (props) => {
    return (
        <div>
            <button onClick={props.onClick}> Start </button>
        </div>
    )
}

export default StartButton